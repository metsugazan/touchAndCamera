import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, PermissionsAndroid, Image, FlatList, ImageBackground } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";

import { images } from '../images';

export default function GalleryScreen() {


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

    const [photos, setPhotos] = useState([]);


    const _handleButtonPress = async () => {
        await CameraRoll.getPhotos({
            first: 10,
            assetType: 'Photos',
            groupTypes: 'All',
        })
            .then(result => {
                setPhotos(result.edges);

            })
            .catch((err) => {
                console.log('fail loading photos', err);
            });
    };


    useEffect(() => {
        requestCameraPermission();
        requestStoragePermission();
        _handleButtonPress();
    }, []);


    return (
        <ImageBackground
        style={styles.imageBackground}
        source={images.background}>
            <ScrollView>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-between' }}>
                    {photos.map((p, i) => {
                        return (
                            <Image
                                key={i}
                                style={{
                                    borderRadius: 10,
                                    marginTop: '2%',  
                                    marginHorizontal: '1.5%',                           
                                    height: 200,
                                    width: '47%'
                                }}
                                source={{ uri: p.node.image.uri }}
                            />
                        );
                    })}
                </View>
            </ScrollView>
            </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
      },
});