import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Images from '../../assets';
import colors from '../../utils/color';



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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 30,
    position: 'absolute',
    fontWeight: 'bold',
  },
  landing: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
