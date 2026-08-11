import React, { useState } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  launchImageLibrary,
  Asset,
  launchCamera,
} from 'react-native-image-picker';

const ImagePickerExample = () => {
  const [image, setImage] = useState<Asset | null>(null);
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS handles it automatically
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
      setImage(asset ?? null);
    });
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
      setImage(asset ?? null);
    });
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      <Button title="Pick Image from Gallery" onPress={openGallery} />
      <Button title="Open Camera" onPress={openCamera} />
    </View>
  );
};

export default ImagePickerExample;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: 200, height: 200, borderRadius: 10 },
});
