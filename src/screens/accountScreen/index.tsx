import {Text, PermissionsAndroid, FlatList, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Contacts from 'react-native-contacts';
import styles from './styles';
import Images from '../../assets';
import { useIsFocused } from '@react-navigation/native';


export default function Account({navigation}:{navigation:any}) {
  const [contacts, setContacts] = useState([]);
  const isFocused = useIsFocused()
  useEffect(() => {
    ReadContacts();
  }, [isFocused]);
  const ReadContacts = async() => {
    try{
      const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
    if(permission==="granted"){
      const contact = await Contacts.getAll();
      setContacts(contact);
      //console.log(JSON.stringify(contact));
    }else{
      setContacts([]);
    }
    } catch(error){
       console.log(error);
    }
  };
  const goto=()=>{
  navigation.navigate("ContactDetail");
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.contactHead}>Contacts</Text>
      <FlatList
        data={contacts}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.contact} activeOpacity={0.5} onPress={()=>{
              navigation.navigate('ContactInside', {
                data: item,
              });
            }}>
              <View style={styles.imageStyle}>
                <Text style={styles.textimg}>{item.displayName[0]}</Text>
              </View>
              <View>
                <Text style={styles.textName}>{item.displayName}</Text>
                <Text style={styles.text}>{item.phoneNumbers[0].number}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity activeOpacity={0.5} onPress={goto}>
        <Image source={Images.add} style={styles.add} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
