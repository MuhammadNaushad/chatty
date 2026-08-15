import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppColors } from '../../styles/colors';
import { s, vs } from 'react-native-size-matters';

interface SentMsgCardProps {
  message: string;
}

const ResponseMsgCard = ({ message }: SentMsgCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{message}</Text>
    </View>
  );
};

export default ResponseMsgCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.darkGray,
    width: '80%',
    alignSelf: 'flex-start',
    borderRadius: 16,
    padding: s(12),
    marginTop: vs(15),
    marginLeft: vs(5),
  },
  msg: {
    color: AppColors.black,
    fontSize: 16,
  },
});
