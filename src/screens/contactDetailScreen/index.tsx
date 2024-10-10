import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Images from '../../assets';
import colors from '../../utils/color';
import Contacts from 'react-native-contacts';
import Toast from 'react-native-simple-toast';

const ContactDetail = ({navigation}: {navigation: any}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const goto = () => {
    navigation.goBack();
  };

  const verify = () => {
    let value = true;
    if (!name.trim()) {
      value = false;
    }
    if (!number.trim()) {
      value = false;
    }
    console.log(value);
    if (value === true) {
      getPermission();
    } else {
      Toast.showWithGravity('Please enter details!', Toast.SHORT, Toast.TOP);
    }
  };

  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res === 'granted') {
        var newPerson = {
          emailAddresses: [
            {
              label: 'work',
              email: email,
            },
          ],
          phoneNumbers: [
            {
              label: 'mobile',
              number: number,
            },
          ],
          familyName: name,
        };

        Contacts.addContact(newPerson);
        navigation.goBack();
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstCont}>
        <TouchableOpacity style={styles.arrow} onPress={goto}>
          <Image source={Images.backArrow} />
        </TouchableOpacity>
        <Text style={styles.head}>New Contact</Text>
      </View>
      <Image source={Images.user} style={styles.imgCont} />
      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Enter Mobile"
        style={styles.input}
        maxLength={10}
        keyboardType="decimal-pad"
        value={number}
        onChangeText={text => setNumber(text)}
      />
      <TouchableOpacity
        style={[
          styles.input,
          {backgroundColor: colors.primary, borderWidth: 0, marginTop: 50},
        ]}
        onPress={() => {
          // getPermission();
          verify();
        }}>
        <Text style={styles.add}>Add to Contact</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  arrow: {
    width: 50,
    marginHorizontal: 20,
  },
  firstCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  head: {
    fontWeight: '600',
    fontSize: 22,
    flex: 1,
    textAlign: 'center',
    marginRight: 90,
  },
  imgCont: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 10 : 15,
    backgroundColor: colors.white,
  },
  add: {
    textAlign: 'center',
    color: colors.white,
  },
});
