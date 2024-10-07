import {StyleSheet, Text, View, TouchableOpacity, Image, Modal, FlatList, Alert} from 'react-native';
  import React, { useState, useCallback, useEffect } from 'react';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import Images from '../../assets';
  import { GiftedChat, InputToolbar, Send, Bubble } from 'react-native-gifted-chat';
  import { useRoute } from '@react-navigation/native';
  import CustomModal2 from '../../components/CustomModal2';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import ConfirmationModal from '../../components/ConfirmationModal';
  import colors from '../../utils/color';
  const getStorageKey = (userId) => `@chat_messages_${userId}`;
  
  const User = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [reactionModalVisible, setReactionModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null); 
    const [showConfirm, setShowConfirm] = useState(false);
  
    
    const route = useRoute();
    const { name, profile } = route.params;
  
    const start = () => {
      setVisibleModal(!visibleModal);
    };
  
    
    useEffect(() => {
      const loadMessages = async () => {
        try {
          const storageKey = getStorageKey(name);
          const storedMessages = await AsyncStorage.getItem(storageKey);
          if (storedMessages !== null) {
            setMessages(JSON.parse(storedMessages));
          } else {
            
            setMessages([
              {
                _id: 1,
                text: 'Welcome to the chat!',
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
                reaction: null, 
              },
            ]);
          }
        } catch (error) {
          console.error('Failed to load messages from AsyncStorage', error);
        }
      };
  
      loadMessages();
    }, [name]); 
  
    
    const storeMessages = async (newMessages) => {
      try {
        const storageKey = getStorageKey(name); 
        await AsyncStorage.setItem(storageKey, JSON.stringify(newMessages));
      } catch (error) {
        console.error('Failed to store messages in AsyncStorage', error);
      }
    };
  
    const onSend = useCallback((newMessages = []) => {
      const updatedMessages = GiftedChat.append(messages, newMessages);
      setMessages(updatedMessages);
      storeMessages(updatedMessages); 
    }, [messages]);
  
    const back = () => {
      navigation.goBack();
    };
  
    const renderActions = useCallback(() => {
      return (
        <TouchableOpacity>
          <Image source={Images.add} style={styles.add} />
        </TouchableOpacity>
      );
    });
  
    const renderSend = (props) => (
      <Send {...props} containerStyle={styles.sendCont}>
        <Image source={Images.paperPlane} style={styles.send} />
      </Send>
    );
  
    const deleteMessages = async () => {
      setVisibleModal(false);
      setShowConfirm(true);
      
    };
  
    const onMessageLongPress = (context, message) => {
      setSelectedMessage(message);
      setReactionModalVisible(true); 
    };
  
    const emojis = ['😀', '😢', '❤️', '👍', '🔥'];
  
    const addReaction = (reaction) => {
      const updatedMessages = messages.map((msg) => {
        if (msg._id === selectedMessage._id) {
          const newReaction = msg.reaction === reaction ? null : reaction;
          return { ...msg, reaction: newReaction };
        }
        return msg;
      });
      setMessages(updatedMessages);
      storeMessages(updatedMessages);
      setReactionModalVisible(false);
    };

    const toggle= ()=>{
      console.log(showConfirm);
      setReactionModalVisible(false);
      setShowConfirm(true);
    }
    const cancel=()=>{
      setShowConfirm(false);
    }
    const deleted=()=>{
      try{
        const updatedMessages = messages.filter((msg) => msg._id !== selectedMessage._id);
        setMessages(updatedMessages);
        storeMessages(updatedMessages);
        setReactionModalVisible(false);
        setShowConfirm(false);
        Alert.alert('Message deleted successfully');
      }
      catch{
        const storageKey = getStorageKey(name); 
        AsyncStorage.removeItem(storageKey); 
        setMessages([]); 
        setVisibleModal(false);
        setShowConfirm(false);
        Alert.alert('All messages deleted successfully');
      }
    }
  
    const renderBubble = (props) => (
      <View style={styles.bubbleWrapper}>
        <View style={styles.messageContainer}>
          <Bubble
            {...props}
            wrapperStyle={{
              right: { backgroundColor: '#2A7BBB' },
              left: { backgroundColor: '#F0F0F0' },
            }}
          />
         
          {props.currentMessage.reaction && (
            <Text style={styles.reaction}>{props.currentMessage.reaction}</Text>
          )}
        </View>
      </View>
    );
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cont}>
          <View style={styles.textCont}>
            <TouchableOpacity onPress={back}>
              <Image source={Images.backArrow} />
            </TouchableOpacity>
  
            <View style={styles.imageStyle}>
              <Text style={styles.textimg}>{profile}</Text>
            </View>
            <View>
              <Text style={styles.text1}>{name}</Text>
              <Text style={styles.text2}>Clocked in</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.dotsCont} onPress={start}>
            <Image source={Images.dots} style={styles.dots} />
          </TouchableOpacity>
        </View>
  
        <View style={styles.secondView}>
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: 1,
            }}
            textInputStyle={styles.textInputStyle}
            renderInputToolbar={(props) => {
              return <InputToolbar containerStyle={styles.containerStyle} {...props} />;
            }}
            renderActions={renderActions}
            placeholder="Your typed message"
            renderSend={renderSend}
            onLongPress={onMessageLongPress}
            renderBubble={renderBubble}
          />
          <CustomModal2
            visible={visibleModal}
            start={start}
            deleteMessages={deleteMessages}
          />
        </View>
  
        <Modal
          visible={reactionModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setReactionModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setReactionModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.reactionModal}>
                <FlatList
                  horizontal
                  data={emojis}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.emojiButton}
                      onPress={() => addReaction(item)}
                    >
                      <Text style={styles.emoji}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item}
                  showsHorizontalScrollIndicator={false}
                />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress = {toggle}
                >
                  <Text style={styles.deleteButtonText}>Delete Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <ConfirmationModal 
          visible={showConfirm}
          cancel={cancel}
          deleted= {deleted}
        />
      </SafeAreaView>
    );
  };
  
  export default User;
  
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
    },
    dots: {
      width: 20,
      height: 20,
    },
    dotsCont: {
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      padding: 13,
      marginHorizontal: 10,
    },
    textimg: {
      fontWeight: '500',
      color: colors.white,
    },
    imageStyle: {
      width: 45,
      height: 45,
      borderRadius: 50,
      marginHorizontal: 10,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textCont: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text2: {
      color: colors.gray,
      fontSize: 12,
    },
    text1: {
      fontSize: 18,
      fontWeight: '600',
    },
    secondView: {
      backgroundColor: colors.secondary,
      flex: 1,
    },
    add: {
      width: 30,
      height: 30,
      marginLeft: 10,
      marginVertical: 5,
      backgroundColor: colors.gray,
      borderRadius: 50,
    },
    textInputStyle: {
      borderRadius: 8,
      backgroundColor: colors.white,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: colors.gray,
      paddingHorizontal: 10,
    },
    containerStyle: {
      paddingVertical: 5,
      backgroundColor: colors.secondary,
    },
    send: {
      width: 30,
      height: 30,
    },
    sendCont: {
      marginRight: 10,
      marginBottom: 5,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: colors.blurBackground,
    },
    modalContainer: {
      justifyContent: 'flex-end',
    },
    reactionModal: {
      backgroundColor: colors.white,
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
    },
    emojiButton: {
      padding: 10,
    },
    emoji: {
      fontSize: 30,
    },
    deleteButton: {
      marginTop: 20,
      backgroundColor: colors.red,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 8,
    },
    deleteButtonText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
    reactionContainer: {
      flexDirection: 'row',
      marginTop: 5,
      marginLeft: 10,
    },
  
    bubbleWrapper: {
      flexDirection: 'row', 
      alignItems: 'center', 
    },
    messageContainer: {
      flexDirection: 'row', 
      alignItems: 'center', 
    },
    reaction: {
      fontSize: 20, 
      marginLeft: 5, 
    },
  });
  