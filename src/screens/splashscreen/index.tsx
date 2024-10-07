import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import Images from '../../assets';
import styles from './styles';



const SplashScreen = ({ navigation }: {navigation:any}) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('BottomTabNavigator');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={Images.splashImage} style={styles.landing} />
      <Text style={styles.text}>SplashScreen</Text>
    </View>
  );
};



export default SplashScreen;
