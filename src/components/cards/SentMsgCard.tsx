import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppColors } from '../../styles/colors';
import { s, vs } from 'react-native-size-matters';

interface SentMsgCardProps {
  message: string;
}

const SentMsgCard = ({ message }: SentMsgCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{message}</Text>
    </View>
  );
};

export default SentMsgCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.black,
    width: '80%',
    alignSelf: 'flex-end',
    borderRadius: 16,
    padding: s(12),
    marginTop: vs(10),
    marginRight: vs(5),
  },
  msg: {
    color: AppColors.white,
    fontSize: 16,
  },
});
