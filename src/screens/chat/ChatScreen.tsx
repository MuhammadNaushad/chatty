import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppHeader from '../../components/header/Header';
import AppSafeView from '../../components/safe_view/AppSafeView';
import { AppColors } from '../../styles/colors';

const ChatScreen = () => {
  return (
    <AppSafeView statusBarColor={AppColors.black}>
      <AppHeader />
    </AppSafeView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
