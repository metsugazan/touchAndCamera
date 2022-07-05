import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';

import { images } from '../images';

import ReactNativeBiometrics from 'react-native-biometrics'

export default function LoginScreen({ navigation }) {

  const rnBiometrics = new ReactNativeBiometrics()

  const Touch = () => {

    rnBiometrics.simplePrompt({promptMessage: 'Confirmer votre emprunt'})
    .then((resultObject) => {
      const { success } = resultObject
  
      if (success) {
        console.log('successful biometrics provided')
        navigation.navigate('Profile')
      } else {
        console.log('user cancelled biometric prompt')
      }
    })
    .catch(() => {
      console.log('biometrics failed')
    })
  }

  useEffect(() => {
    Touch()
}, []);


  return (
    <ImageBackground
      style={styles.imageBackground}
      source={images.background}>
      <TouchableOpacity style={styles.btn} onPress={() => Touch()}>
        <Image
          style={{ top: 68 }}
          source={images.sun}
        />
        <Text style={styles.txtSun}>CONNEXION</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  btn: {
    alignItems: 'center',
    marginTop: '10%',
    marginLeft: '10%',
    height: 130,
    width: 130,
    overflow: 'hidden',
    borderRadius: 260,
    backgroundColor: '#FF4200',
    justifyContent: 'center',
  },
  txtSun: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute'
  }
});