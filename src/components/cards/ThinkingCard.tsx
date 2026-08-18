import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { s } from 'react-native-size-matters';
import { AppColors } from '../../styles/colors';

const ThinkingCard = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const animateDot = (dot: Animated.Value, delay: number) => {
    return Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dot, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    );
  };

  useEffect(() => {
    Animated.parallel([
      animateDot(dot1, 0),
      animateDot(dot2, 200),
      animateDot(dot3, 400),
    ]).start();
  }, []);

  const dotStyle = (dot: Animated.Value) => ({
    opacity: dot,
    transform: [
      {
        translateY: dot.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -5],
        }),
      },
    ],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.thinkingText}>Thinking</Text>
      <View style={styles.dotsContainer}>
        <Animated.Text style={[styles.dot, dotStyle(dot1)]}>●</Animated.Text>
        <Animated.Text style={[styles.dot, dotStyle(dot2)]}>●</Animated.Text>
        <Animated.Text style={[styles.dot, dotStyle(dot3)]}>●</Animated.Text>
      </View>
    </View>
  );
};

export default ThinkingCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(15),
    paddingVertical: s(10),
    gap: s(6),
  },
  thinkingText: {
    color: AppColors.black,
    fontSize: s(13),
    fontStyle: 'italic',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: s(3),
  },
  dot: {
    color: AppColors.black,
    fontSize: s(8),
  },
});
