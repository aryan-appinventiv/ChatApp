import {Text, TouchableOpacity, View, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import Images from '../../assets';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../components/CustomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import styles from './styles';
import strings from '../../utils/strings';

interface ChatUser {
  id: string;
  name: string;
  profileImg?: string;
}

const Home = ({navigation}: {navigation: any}) => {
  const [showModal, setShowModal] = useState(false);
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchChatUsers = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const chatKeys = allKeys.filter(key => key.startsWith('@chat_messages_'));

      const users: ChatUser[] = chatKeys.map(key => {
        const name = key.replace('@chat_messages_', '');
        const profileImg = key.replace('@chat_messages_', '');
        return {
          id: key,
          name,
          profileImg,
        };
      });

      setChatUsers(users);
    } catch (error) {
      console.error(strings.Error_fetching_chat_users, error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchChatUsers();
    }, []),
  );

  const navigateToChat = (userName: string, profileImg: any) => {
    navigation.navigate('User', {name: userName, profileImg: profileImg[0]}); // Adjust 'profile' as needed
  };

  const renderItem = ({item}: {item: ChatUser}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigateToChat(item.name, item.profileImg)}>
      <View style={styles.pfCont}>
        <Text style={styles.pf}>
          {item.profileImg ? item.profileImg[0] : 'U'}
        </Text>
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

  const filteredChatUsers = chatUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.cont}>
        <View style={styles.firstCont}>
          <View>
            <Text style={styles.text1}>Messages</Text>
            <Text style={styles.text2}>
              {filteredChatUsers.length} contacts
            </Text>
          </View>
          <TouchableOpacity onPress={start}>
            <Image source={Images.add} style={styles.add} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondCont}>
        <View style={styles.inputCont}>
          <Image source={Images.search} />
          <CustomInput
            placeholder={strings.Search_messages}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredChatUsers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            searchQuery ? (
              <View style={styles.nochatCont}>
                <Image source={Images.nochat} style={styles.nochat} />
                <Text style={styles.noResultsText}>
                  No matching users found.
                </Text>
                <CustomButton head={strings.Start_Chat} onPress={start} />
              </View>
            ) : (
              <View style={styles.nochatCont}>
                <Image source={Images.nochat} style={styles.nochat} />
                <CustomButton head={strings.Start_Chat} onPress={start} />
              </View>
            )
          }
        />
      </View>

      <CustomModal visible={showModal} start={start} newChat={newChat} />
    </View>
  );
};

export default Home;
