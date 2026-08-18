import {
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, { useRef, useState } from 'react';
import AppHeader from '../../components/header/Header';
import AppSafeView from '../../components/safe_view/AppSafeView';
import { AppColors } from '../../styles/colors';
import SentMsgCard from '../../components/cards/SentMsgCard';
import ResponseMsgCard from '../../components/cards/ResponseMsgCard';
import { s } from 'react-native-size-matters';
import { RESPONSE, SENT } from '../../constants/chat';
import ChatInput from '../../components/text_input/ChatInput';
import { IS_IOS } from '../../constants/platforms';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmptyChatScreen from '../../components/chat/EmptyChatScreen';
import { chatWithHistory } from '../../api/http_helper';

interface MessageProps {
  id: number;
  msg: string;
  type: string;
  isNew?: boolean;
}

interface GroqMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const ChatScreen = () => {
  const [MessageList, setMessageList] = useState<MessageProps[]>([]);
  const [chatHistory, setChatHistory] = useState<GroqMessage[]>([
    {
      role: 'system',
      content: 'You are a helpful AI assistant. Answer clearly and concisely.',
    },
  ]);
  const [MsgInput, setMsgInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const keyboardOffset = IS_IOS ? insets.top : StatusBar.currentHeight ?? 0;
  const flatListRef = useRef<FlatList>(null);

  const onResponseReceived = (response: string) => {
    setMessageList(prev => [
      ...prev,
      {
        id: prev.length + 1,
        msg: response,
        type: RESPONSE,
        isNew: true,
      },
    ]);
  };

  const onSentMsgPress = async () => {
    if (!MsgInput.trim() || isLoading) return;

    const userMsg = MsgInput;
    setMsgInput('');

    // UI mein user message add karo
    setMessageList(prev => [
      ...prev,
      {
        id: prev.length + 1,
        msg: userMsg,
        type: SENT,
      },
    ]);

    // History mein user message add karo
    const updatedHistory: GroqMessage[] = [
      ...chatHistory,
      { role: 'user', content: userMsg },
    ];
    setChatHistory(updatedHistory);

    setIsLoading(true);

    try {
      const aiResponse = await chatWithHistory(updatedHistory);

      // History mein AI response add karo
      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: aiResponse },
      ]);

      onResponseReceived(aiResponse);
    } catch (error: any) {
      const errMsg =
        error.response?.status === 429
          ? 'Rate limit ho gaya, thodi der baad try karo...'
          : 'Kuch gadbad hui, dobara try karo.';
      onResponseReceived(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppSafeView statusBarColor={AppColors.black}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={keyboardOffset}
      >
        <AppHeader />

        {MessageList.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={MessageList}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) =>
              item.type === SENT ? (
                <SentMsgCard message={item.msg} />
              ) : (
                <ResponseMsgCard
                  message={item.msg}
                  animate={item.isNew ?? false}
                  onHeightChange={() => {
                    flatListRef.current?.scrollToEnd({ animated: false });
                  }}
                />
              )
            }
            contentContainerStyle={{
              paddingHorizontal: s(5),
              paddingVertical: s(20),
            }}
            onContentSizeChange={() => {
              if (MessageList.length > 0) {
                flatListRef.current?.scrollToEnd({ animated: true });
              }
            }}
            onLayout={() => {
              if (MessageList.length > 0) {
                flatListRef.current?.scrollToEnd({ animated: false });
              }
            }}
          />
        ) : (
          <EmptyChatScreen />
        )}

        <ChatInput
          requestMsg={MsgInput}
          setResponseMsg={setMsgInput}
          onSentMsgPress={onSentMsgPress}
          disabled={isLoading}
        />
      </KeyboardAvoidingView>
    </AppSafeView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
