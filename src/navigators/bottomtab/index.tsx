import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import HomeScreen from '../../screens/homeScreen';
import FavouritesScreen from '../../screens/favouritesScreen';
import AccountScreen from '../../screens/accountScreen';
import MenuScreen from '../../screens/menuScreen';

import Images from '../../assets';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? Images.homeicon : Images.home3;
              break;
            case 'Account':
              iconName = focused ? Images.accountSelected : Images.account;
              break;
            case 'Favourites':
              iconName = focused ? Images.star : Images.favourites;
              break;
            case 'Menu':
              iconName = focused ? Images.menuSelected : Images.menu;
              break;
            default:
              iconName = Images.homeicon;
              break;
          }
          return <Image source={iconName} style={{width: 20, height: 20}} />;
        },
      })}>
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        options={{headerShown: false}}
      />
      <Tab.Screen
        component={AccountScreen}
        name="Account"
        options={{headerShown: false}}
      />
      <Tab.Screen
        component={FavouritesScreen}
        name="Favourites"
        options={{headerShown: false}}
      />
      <Tab.Screen
        component={MenuScreen}
        name="Menu"
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
