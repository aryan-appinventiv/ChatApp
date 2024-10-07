
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    FlatList,
  } from 'react-native';
  import React, { useState} from 'react';
  import Images from '../../assets';
  import CustomInput from '../../components/CustomInput';
  import CustomButton from '../../components/CustomButton';
  import CustomModal from '../../components/CustomModal';
  import colors from '../../utils/color';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useFocusEffect } from '@react-navigation/native';
  
  interface ChatUser {
    id: string;
    name: string;
    profileImg?: string;
  }
  
  const Home = ({ navigation }: { navigation: any }) => {
    const [showModal, setShowModal] = useState(false);
    const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
    const [searchQuery, setSearchQuery] = useState(''); // **Added Search Query State**
   
  
   
  
    // Function to fetch chat users from AsyncStorage
    const fetchChatUsers = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        // Filter keys that start with '@chat_messages_'
        const chatKeys = allKeys.filter((key) => key.startsWith('@chat_messages_'));
  
        // Extract user names from keys
        const users: ChatUser[] = chatKeys.map((key) => {
          const name = key.replace('@chat_messages_', '');
          const profileImg = key.replace('@chat_messages_', '');
          return {
            id: key, // Using the key as the unique ID
            name,
            profileImg,
          };
        });
  
        setChatUsers(users);
      } catch (error) {
        console.error('Error fetching chat users:', error);
      }
    };
  
    useFocusEffect(
      React.useCallback(() => {
        fetchChatUsers();
      }, [])
    );
  
    // Function to navigate to the User (Chat) screen
    const navigateToChat = (userName: string, profileImg:any) => {
      navigation.navigate('User', { name: userName, profileImg: profileImg[0] }); // Adjust 'profile' as needed
    };
  
    // Render each item in the FlatList
    const renderItem = ({ item }: { item: ChatUser }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigateToChat(item.name, item.profileImg)}
      >
        <View style={styles.pfCont}>
          <Text style={styles.pf}>{item.profileImg ? item.profileImg[0] : 'U'}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  
    const start = () => {
      setShowModal(!showModal);
    };
  
    const newChat = () => {
      navigation.navigate('Search');
      setShowModal(false);
    };
  
    // Compute the filtered chat users based on the search query
    const filteredChatUsers = chatUsers.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.cont}>
          <View style={styles.firstCont}>
            <View>
              <Text style={styles.text1}>Messages</Text>
              <Text style={styles.text2}>45 Contacts</Text>
            </View>
            <TouchableOpacity onPress={start}>
              <Image source={Images.add} style={styles.add} />
            </TouchableOpacity>
          </View>
        </View>
  
        {/* Main Chat View */}
        <View style={styles.secondCont}>
          {/* Search Input */}
          <View style={styles.inputCont}>
            <Image source={Images.search} />
            <CustomInput
              placeholder="Search messages..."
              value={searchQuery} // **Passed Search Query State**
              onChangeText={setSearchQuery} // **Handled Search Input**
            />
          </View>
  
          {/* Chat Users List */}
          <FlatList
            data={filteredChatUsers} // **Used Filtered Chat Users**
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              searchQuery ? ( // **Conditionally Render Based on Search Query**
                <View style={styles.nochatCont}>
                  <Image source={Images.nochat} style={styles.nochat} />
                  <Text style={styles.noResultsText}>No matching users found.</Text>
                  <CustomButton head="Start Chat" onPress={start} />
                </View>
              ) : (
                <View style={styles.nochatCont}>
                  <Image source={Images.nochat} style={styles.nochat} />
                  <CustomButton head="Start Chat" onPress={start} />
                </View>
              )
            }
          />
        </View>
  
        {/* Custom Modal for Adding New Chat */}
        <CustomModal
          visible={showModal}
          start={start}
          newChat={newChat}
        />
  

       
      </View>
    );
  };
  
  export default Home;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cont: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      justifyContent: 'space-between',
      paddingBottom: 20,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: colors.primary,
      paddingTop:'15%'
    },
    firstCont: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      width: '100%',
    },
    add: {
      height: 30,
      width: 30,
    },
    text1: {
      color: colors.white,
      fontWeight: '600',
      fontSize: 18,
    },
    text2: {
      color: colors.white,
      fontSize: 13,
    },
    secondCont: {
      backgroundColor: colors.secondary,
      flex: 1,
    },
    inputCont: {
      backgroundColor: colors.white,
      marginVertical: 19,
      marginHorizontal: 16,
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    customInput: { // **Added Custom Input Style**
      flex: 1,
      marginLeft: 10,
    },
    nochat: {
      width: 166,
      height: 130,
    },
    nochatCont: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '30%',
    },
    noResultsText: { // **Added No Results Text Style**
      fontSize: 16,
      color: colors.gray,
      marginVertical: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.lightgray,
    },
    pfCont: {
      height: 40,
      width: 40,
      backgroundColor: colors.primary,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    pf: {
      color: colors.white,
      fontWeight: '500',
      fontSize: 16,
    },
    textContainer: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      color: colors.gray,
      fontWeight: '500',
    },
  });
  