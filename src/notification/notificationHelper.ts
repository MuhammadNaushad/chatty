import { Alert, PermissionsAndroid } from 'react-native';

import { getMessaging, onMessage } from '@react-native-firebase/messaging';
import { useEffect } from 'react';

const requestUserPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('Notification Permission granted');
  } else {
    console.log('Notification Permission denied');
  }
};

const getToken = async () => {
  try {
    const token = await getMessaging().getToken();
    console.log('Firebase Token:', token);
  } catch (error) {
    console.error('Error fetching Firebase token:', error);
  }
};

export const useNotification = () => {
  useEffect(() => {
    requestUserPermission(), getToken();
  }, []);

  useEffect(() => {
    const messaging = getMessaging();
    const unsubscribe = onMessage(messaging, async remoteMessage => {
      const messageBody = remoteMessage.notification?.body ?? '';
      const messageTitle = remoteMessage.notification?.title ?? '';
      Alert.alert(messageTitle, JSON.stringify(messageBody));
    });
    return unsubscribe;
  }, []);
};
