import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '../../components/header/Header';
import AppSafeView from '../../components/safe_view/AppSafeView';
import { AppColors } from '../../styles/colors';
import SentMsgCard from '../../components/cards/SentMsgCard';
import ResponseMsgCard from '../../components/cards/ResponseMsgCard';
import { s } from 'react-native-size-matters';
import { RESPONSE, SENT } from '../../constants/chat';

interface MessageProps {
  id: number;
  msg: string;
  type: string;
}

const ChatScreen = () => {
  const messageList: MessageProps[] = [
    {
      id: 1,
      msg: 'Hello! Can you help me debug this React Native FlatList not rendering?',
      type: SENT,
    },
    {
      id: 2,
      msg: 'Sure! The most common causes are missing `keyExtractor`, incorrect `data` prop, or the list container having no height. Can you share your code?',
      type: RESPONSE,
    },
    {
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
    },
  ];
  const [MessageList, setMessageList] = useState<MessageProps[]>(messageList);

  return (
    <AppSafeView statusBarColor={AppColors.black}>
      <AppHeader />
      {/*  */}
      <FlatList
        data={messageList}
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
      />
    </AppSafeView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
