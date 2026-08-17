import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppColors } from '../../styles/colors';
import { s, vs } from 'react-native-size-matters';
interface ResponseMsgCardProps {
  message: string;
  animate?: boolean;
  onHeightChange?: () => void; // ✅ naya prop
}

const ResponseMsgCard = ({
  message,
  animate = false,
  onHeightChange,
}: ResponseMsgCardProps) => {
  const [displayedText, setDisplayedText] = useState(animate ? '' : message);

  useEffect(() => {
    if (!animate) return;

    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      index++;
      setDisplayedText(message.slice(0, index));
      onHeightChange?.();
      if (index === message.length) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [message, animate]);

  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{displayedText}</Text>
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
