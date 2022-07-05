import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from 'react-native';

import { images } from '../images';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Avatar({ uri, onPress }) {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={images.background}>
      <View style={styles.avatar}>
        <Image
          style={styles.avatarImage}
          source={uri ? { uri } : images.avatar}
        />
        <TouchableOpacity style={styles.addButton} onPress={onPress}>
          <Icon style={styles.addButtonIcon} name="camera-plus" size={30} />
        </TouchableOpacity>
        <Text style={styles.usernameText}>Bienvenue !</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  avatar: {
    alignItems: 'center',
    marginTop: '40%',
  },
  avatarImage: {
    height: 260,
    width: 260,
    overflow: 'hidden',
    borderColor: '#4D4D4D',
    borderWidth: 4,
    borderRadius: 260,
  },
  addButton: {
    height: 54,
    width: 54,
    backgroundColor: '#4D4D4D',
    borderRadius: 50,
    position: 'absolute',
    right: 104,
    bottom: 40,
    alignItems:'center',
    justifyContent:'center',
  },
  addButtonIcon: {
    alignItems:'center',
    justifyContent:'center',
    left: -1,
    top: -1,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: 12,
  },
});