import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Linking,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Images from '../../assets';
import colors from '../../utils/color';
import {useRoute, RouteProp} from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import ConfirmationModal from '../../components/ConfirmationModal';


type RouteParams = {
  params: {
    data: {
        displayName: string;
        recordID: number | string;
    };
  };
};

const ContactInside = ({navigation}: {navigation: any}) => {

  const route = useRoute<RouteProp<RouteParams>>();
  //console.log('------------->', route.params.data.emailAddresses);
  // const {name, number} = route.params.data;

  const [confirmationModal, setConfirmationModal] = useState(false);
  
  const getPermission= ()=>{
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,{
        title: 'Contacts',
        message: 'This app would like to view your contacts',
        buttonPositive: 'Please accept bare mortal',
    }).then(res=>{
        if(res==='granted'){
           Contacts.deleteContact({recordID: route.params.data.recordID}).then(
             recordId => {
               setConfirmationModal(false);
               navigation.goBack();
             },
           );
        }
    })
  };

  const check=()=>{
    setConfirmationModal(true);
  }
  const cancel = () =>{
    setConfirmationModal(false);
  }



  const goto = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstCont}>
        <TouchableOpacity style={styles.arrow} onPress={goto}>
          <Image source={Images.backArrow} />
        </TouchableOpacity>
        <Text style={styles.head}>Contact Details</Text>
      </View>
      <View style={styles.main}>
        <Image source={Images.user} style={styles.imgCont} />
        <Text style={styles.name}>{route.params.data.displayName}</Text>
        {route.params.data.emailAddresses ? (
          <Text style={styles.email}>
            {route.params.data.emailAddresses[0]?.email}
          </Text>
        ) : (
          <Text>email not present</Text>
        )}

        <View style={styles.innerCont}>
          <Text style={styles.number}>
            {route.params.data.phoneNumbers[0].number}
          </Text>
          <View style={styles.details}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  `tel:${route.params.data.phoneNumbers[0].number}`,
                );
              }}>
              <Image source={Images.call} style={styles.call} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  `sms:${route.params.data.phoneNumbers[0].number}`,
                );
              }}>
              <Image source={Images.message} style={styles.call} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  `mailto:${route.params.data.phoneNumbers[0].number}`,
                );
              }}>
              <Image source={Images.email} style={styles.call} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.input,
            {backgroundColor: colors.redDark, borderWidth: 0, marginTop: 50},
          ]}
          onPress={() => {
            // getPermission();
            check();
          }}>
          <Text style={styles.delete}>Delete Contact</Text>
        </TouchableOpacity>
      </View>
      <ConfirmationModal
         visible={confirmationModal}
         cancel={cancel}
         deleted={getPermission}
         heading="Delete Contact"
         text= "Are you sure want to delete this contact"
      />
    </SafeAreaView>
  );
};

export default ContactInside;

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
    width: 90,
    height: 90,
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
  delete: {
    textAlign: 'center',
    color: colors.white,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  number: {
    fontSize: 15,
  },
  call: {
    height: 20,
    width: 20,
  },
  innerCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 50,
  },
  main: {
    backgroundColor:colors.white,
    borderRadius:8,
    marginHorizontal:20,
    marginTop:50,
    paddingBottom:50,
  },
  email:{
    textAlign:'center',
  },
  details:{
    flexDirection:'row',
    columnGap:15,
  }
});
