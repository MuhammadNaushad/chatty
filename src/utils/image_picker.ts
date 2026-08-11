import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS handles it automatically
};

const openCamera = async () => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    console.log('Camera permission denied');
    return;
  }

  launchCamera({ mediaType: 'photo', quality: 0.8 }, response => {
    console.log('Response:', JSON.stringify(response)); // debug ke liye
    if (response.didCancel) return;
    if (response.errorCode) {
      console.log('Error:', response.errorCode, response.errorMessage);
      return;
    }
    const asset = response.assets?.[0];
    // setImage(asset ?? null);
  });
};

const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    // Android 13+ ke liye
    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // Android 12 aur below
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  }
  return true; // iOS automatically handle karta hai
};

const openGallery = async () => {
  const hasPermission = await requestGalleryPermission();
  if (!hasPermission) {
    console.log('Gallery permission denied');
    return;
  }

  launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
    console.log('Response:', JSON.stringify(response)); // debug ke liye
    if (response.didCancel) return;
    if (response.errorCode) {
      console.log('Error:', response.errorCode, response.errorMessage);
      return;
    }
    const asset = response.assets?.[0];
    // setImage(asset ?? null);
  });
};
