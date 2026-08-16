import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppIcon from '../../assets/icons/AppIcon';
import { vs } from 'react-native-size-matters';

const EmptyChatScreen = () => {
  return (
    <View style={styles.container}>
      <AppIcon width={100} height={100} />
      <Text style={styles.title}>Hello Dear</Text>
      <Text style={styles.subtitle}>How can i help you today?</Text>
    </View>
  );
};

export default EmptyChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: vs(10),
    marginBottom: vs(5),
  },
  subtitle: {
    fontSize: 16,
  },
});
