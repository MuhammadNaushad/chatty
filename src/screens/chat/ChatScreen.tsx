import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppHeader from '../../components/header/Header';
import AppSafeView from '../../components/safe_view/AppSafeView';
import { AppColors } from '../../styles/colors';
import SentMsgCard from '../../components/cards/SentMsgCard';

const ChatScreen = () => {
  return (
    <AppSafeView statusBarColor={AppColors.black}>
      <AppHeader />
      <SentMsgCard message="Hello Ai. Please find some amazing React Native resources for me" />
    </AppSafeView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
