import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/splashscreen';
import BottomTabNavigator from './bottomtab';
import Search from '../screens/searchScreen';
import User from '../screens/userScreen';




const RootNavigator = () => {
    const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          animation: 'slide_from_bottom',
        }}>

        <Stack.Screen
          component={SplashScreen}
          name="SplashScreen"
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={Search}
          name="Search"
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={User}
          name="User"
          options={{headerShown: false}}
        />
       
     
     
        <Stack.Screen
          component={BottomTabNavigator}
          name="BottomTabNavigator"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;