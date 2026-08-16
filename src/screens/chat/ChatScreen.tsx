import {
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AppHeader from '../../components/header/Header';
import AppSafeView from '../../components/safe_view/AppSafeView';
import { AppColors } from '../../styles/colors';
import SentMsgCard from '../../components/cards/SentMsgCard';
import ResponseMsgCard from '../../components/cards/ResponseMsgCard';
import { s } from 'react-native-size-matters';
import { RESPONSE, SENT } from '../../constants/chat';
import ChatInput from '../../components/text_input/ChatInput';
import { IS_ANDROID, IS_IOS } from '../../constants/platforms';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmptyChatScreen from '../../components/chat/EmptyChatScreen';

interface MessageProps {
  id: number;
  msg: string;
  type: string;
}

const ChatScreen = () => {
  console.log('====================================');
  console.log('Debugger Testing Example');
  console.log('====================================');
  const messageList: MessageProps[] = [
    /* {
      id: 1,
      msg: 'Hello! Can you help me debug this React Native FlatList not rendering?',
      type: SENT,
    },
    {
      id: 2,
      msg: 'Sure! The most common causes are missing `keyExtractor`, incorrect `data` prop, or the list container having no height. Can you share your code?',
      type: RESPONSE,
    }, */
    /* {
      id: 3,
      msg: 'Here it is:\n<FlatList data={items} renderItem={({item}) => <Text>{item.name}</Text>} />',
      type: SENT,
    },
    {
      id: 4,
      msg: "Got it! You're missing the `keyExtractor` prop. Add `keyExtractor={(item) => item.id.toString()}` and make sure your parent View has `flex: 1`.",
      type: RESPONSE,
    },
    {
      id: 5,
      msg: 'That fixed it, thanks! One more thing — how do I add pull-to-refresh?',
      type: SENT,
    },
    {
      id: 6,
      msg: 'Easy! Use the `refreshControl` prop:\n`<FlatList refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />} />`',
      type: RESPONSE,
    },
    {
      id: 7,
      msg: 'Perfect. What about infinite scroll / pagination?',
      type: SENT,
    },
    {
      id: 8,
      msg: 'Use `onEndReached` and `onEndReachedThreshold` props. Set threshold to `0.5` so it triggers when user is halfway to the bottom, then fetch the next page in the callback.',
      type: RESPONSE,
    }, */
  ];
  const [MessageList, setMessageList] = useState<MessageProps[]>(messageList);

  const insets = useSafeAreaInsets();
  const keyboardOffset = IS_IOS ? insets.top : StatusBar.currentHeight ?? 0;

  const [MsgInput, setMsgInput] = useState<string>('');

  const onSentMsgPress = () => {
    try {
      console.log('user message', MsgInput);
      setMessageList(prevMessageList => {
        console.log(prevMessageList);
        return [
          ...prevMessageList,
          {
            id: prevMessageList.length + 1,
            msg: MsgInput,
            type: SENT,
          },
        ];
      });

      setTimeout(() => {
        onResponseReceivedPress('Dont Cry');
      }, 2000);
    } catch (error) {
      setMsgInput('');
      console.error(error);
    } finally {
      setMsgInput('');
    }
  };

  const onResponseReceivedPress = (response: string) => {
    setMessageList(prevMessageList => {
      console.log(prevMessageList);
      return [
        ...prevMessageList,
        {
          id: messageList.length + 1,
          msg: response,
          type: RESPONSE,
        },
      ];
    });
  };

  const flatListRef = useRef<FlatList>(null);
  return (
    <AppSafeView statusBarColor={AppColors.black}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={keyboardOffset}
      >
        <AppHeader />
        {/*  */}
        {MessageList.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={MessageList}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <>
                  {item.type === SENT ? (
                    <SentMsgCard message={item.msg} />
                  ) : (
                    <ResponseMsgCard message={item.msg} />
                  )}
                </>
              );
            }}
            contentContainerStyle={{
              paddingHorizontal: s(5),
              paddingVertical: s(20),
            }}
            onContentSizeChange={() => {
              if (MessageList.length > 0) {
                flatListRef.current?.scrollToEnd({ animated: true }); // ✅ naya message aate hi scroll
              }
            }}
            onLayout={() => {
              if (MessageList.length > 0) {
                flatListRef.current?.scrollToEnd({ animated: false }); // ✅ pehli baar open ho toh bhi bottom pe
              }
            }}
          />
        ) : (
          <EmptyChatScreen />
        )}

        {/*  */}
        <ChatInput
          requestMsg={MsgInput}
          setResponseMsg={setMsgInput}
          onSentMsgPress={onSentMsgPress}
        />
      </KeyboardAvoidingView>
    </AppSafeView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
