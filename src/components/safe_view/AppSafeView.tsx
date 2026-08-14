import { StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReactNode } from 'react';
import { AppColors } from '../../styles/colors';
import { IS_ANDROID } from '../../constants/platforms';

interface AppSafeViewProps {
  children: ReactNode;
  style?: ViewStyle;
  statusBarColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
  bottomColor?: string; // bottom inset ka color
}

const AppSafeView = ({
  children,
  style,
  statusBarColor = AppColors.white,
  statusBarStyle = 'light-content',
  bottomColor = IS_ANDROID ? AppColors.black : AppColors.white,
}: AppSafeViewProps) => {
  return (
    <View style={styles.root}>
      {/* 1. Status bar color control */}
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={statusBarStyle}
        translucent={false}
      />

      {/* 2. Top safe area (status bar region) */}
      <SafeAreaView
        style={[styles.topSafeArea, { backgroundColor: statusBarColor }]}
        edges={['top']}
      />

      {/* 3. Content area */}
      <SafeAreaView
        style={[styles.contentArea, { backgroundColor: bottomColor }]}
        edges={['left', 'right', 'bottom']}
      >
        <View style={[styles.container, style]}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

export default AppSafeView;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topSafeArea: {
    // SafeAreaView automatically status bar height leta hai
  },
  contentArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
