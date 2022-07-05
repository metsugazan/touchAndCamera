import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GalleryScreen from '../screens/GalleryScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const oneName = "Profil";
const twoName = "Gallerie";

const StackNavigation = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" options={{headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="Profile" options={{headerShown: false }} component={TabNavigation} />
       </Stack.Navigator>
        </NavigationContainer>
    )
}

const TabNavigation = () => {
    return (

            <Tab.Navigator initialRouteName="Profile" screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: '#222222', paddingBottom: 5 },
                tabBarLabelStyle: {
                  fontSize: 10,
                  fontWeight: 'bold',
                },
                tabBarActiveTintColor: '#9F8236',
                tabBarInactiveTintColor: '#adabab',
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  let rn = route.name;
        
                  if (rn === oneName) {
                    iconName = Platform.OS === 'ios' ? `face-man-profile${focused ? '' : 'face-man-profile'}` : 'face-man-profile';
                  } else if (rn === twoName) {
                    iconName = Platform.OS === 'ios' ? `face-woman-profile${focused ? '' : 'face-woman-profile'}` : 'face-woman-profile';
                  } 
        
                  return <Icon name={iconName} size={size} color={focused ? '#9F8236' : '#adabab'} style={{ marginTop: 5 }} />
        
        
                }
    })}>
                <Tab.Screen name="Profil" options={{ headerTitleAlign: 'center', headerStyle: { backgroundColor: '#801B61' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white'}} component={ProfileScreen} />

                <Tab.Screen name="Gallerie" options={{ headerTitleAlign: 'center', headerStyle: { backgroundColor: '#801B61' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white'}} component={GalleryScreen} />

            </Tab.Navigator>
    )
}

export default StackNavigation