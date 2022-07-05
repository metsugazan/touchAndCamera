import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid, Platform, Button
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";
import * as ImagePicker from 'react-native-image-picker';

import AppNavigation from './src/navigation/AppNavigation';


const cameraLaunch = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  ImagePicker.launchCamera(options, (res) => {
    console.log('Response = ', res);
    if (res.didCancel) {
      console.log('User cancelled image picker');
    } else if (res.error) {
      console.log('ImagePicker Error: ', res.error);
    } else if (res.customButton) {
      console.log('User tapped custom button: ', res.customButton);
      alert(res.customButton);
    } else {
      const source = { uri: res.uri };
      console.log('response', JSON.stringify(res));
      this.setState({
        filePath: res,
        fileData: res.data,
       fileUri: res.uri
      });
    }
  });
}

const App = () => {

  const getPhotos = async () => {
    const photos = await CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
      groupTypes: 'All',
    });
  }
  const savePicture = async () => {
    if (Platform.OS === "android" && !(await requestStoragePermission())) {
      return;
    }

    CameraRoll.save(tag, { type, album })
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNext: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Storage Permission',
          message:
            'Cool Photo App needs access to your storage ' +
            'so you can save your photos.',
          buttonNext: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }


  useEffect(() => {
    requestCameraPermission();
    requestStoragePermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}> 
      <AppNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "#2E2E2E"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
