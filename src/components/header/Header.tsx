import { StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import AppIcon from '../../assets/icons/AppIcon';
import { s } from 'react-native-size-matters';
import { AppColors } from '../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppHeader = () => {
  return (
    <>
      <View style={styles.container}>
        <AppIcon stroke={'#ffffff'} height={30} width={30} strokeWidth={1} />
      </View>
    </>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    height: s(40),
    width: '100%',
    backgroundColor: AppColors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
