import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Images from '../../assets';
import {
  GiftedChat,
  InputToolbar,
  Send,
  Bubble,
  IMessage,
} from 'react-native-gifted-chat';
import {useRoute, RouteProp} from '@react-navigation/native';
import CustomModal2 from '../../components/CustomModal2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmationModal from '../../components/ConfirmationModal';
import styles from './styles';
import strings from '../../utils/strings';
import colors from '../../utils/color';

type RouteParams = {
  params: {
    name: string;
    profile: string;
  };
};

const getStorageKey = (userId: string) => `@chat_messages_${userId}`;

const User = ({navigation}: {navigation: any}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [reactionModalVisible, setReactionModalVisible] =
    useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const route = useRoute<RouteProp<RouteParams>>();
  const {name, profile} = route.params;

  const start = () => {
    setVisibleModal(!visibleModal);
  };

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
            text: strings.Welcome_to_the_chat,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ]);
      }
    } catch (error) {
      console.error(strings.Failed_to_load_messages_from_AsyncStorage, error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [name]);

  const storeMessages = async (newMessages: IMessage[]) => {
    try {
      const storageKey = getStorageKey(name);
      await AsyncStorage.setItem(storageKey, JSON.stringify(newMessages));
    } catch (error) {
      console.error(strings.Failed_to_store_messages_in_AsyncStorage, error);
    }
  };

  const onSend = useCallback(
    (newMessages: IMessage[] = []) => {
      const updatedMessages = GiftedChat.append(messages, newMessages);
      setMessages(updatedMessages);
      storeMessages(updatedMessages);
    },
    [messages],
  );

  const back = () => {
    navigation.goBack();
  };

  const renderActions = useCallback(() => {
    return (
      <TouchableOpacity>
        <Image source={Images.add} style={styles.add} />
      </TouchableOpacity>
    );
  }, []);

  const renderSend = (props: any) => (
    <Send {...props} containerStyle={styles.sendCont}>
      <Image source={Images.paperPlane} style={styles.send} />
    </Send>
  );

  const deleteMessages = async () => {
    setVisibleModal(false);
    setShowConfirm(true);
  };

  const onMessageLongPress = (context: any, message: IMessage) => {
    setSelectedMessage(message);
    setReactionModalVisible(true);
  };

  const emojis = ['😀', '😢', '❤️', '👍', '🔥'];

  const addReaction = (reaction: string) => {
    const updatedMessages = messages.map(msg => {
      if (msg._id === selectedMessage?._id) {
        const newReaction = msg.reaction === reaction ? null : reaction;
        return {...msg, reaction: newReaction};
      }
      return msg;
    });
    setMessages(updatedMessages);
    storeMessages(updatedMessages);
    setReactionModalVisible(false);
  };

  const toggle = () => {
    setReactionModalVisible(false);
    setShowConfirm(true);
  };

  const cancel = () => {
    setShowConfirm(false);
  };

  const deleted = async () => {
    try {
      if (selectedMessage) {
        const updatedMessages = messages.filter(
          msg => msg._id !== selectedMessage._id,
        );
        setMessages(updatedMessages);
        storeMessages(updatedMessages);
        setReactionModalVisible(false);
        setShowConfirm(false);
        Alert.alert(strings.Message_deleted_successfully);
      } else {
        const storageKey = getStorageKey(name);
        await AsyncStorage.removeItem(storageKey);
        setMessages([]);
        setVisibleModal(false);
        setShowConfirm(false);
        Alert.alert(strings.All_messages_deleted_successfully);
      }
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };

  const renderBubble = (props: any) => (
    <View style={styles.bubbleWrapper}>
      <View style={styles.messageContainer}>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {backgroundColor: colors.right},
            left: {backgroundColor: colors.left},
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
          onSend={messages => onSend(messages)}
          alignTop={true}
          user={{
            _id: 1,
          }}
          textInputStyle={styles.textInputStyle}
          renderInputToolbar={props => (
            <InputToolbar containerStyle={styles.containerStyle} {...props} />
          )}
          renderActions={renderActions}
          placeholder={strings.Your_typed_message}
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
        onRequestClose={() => setReactionModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setReactionModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.reactionModal}>
              <FlatList
                horizontal
                data={emojis}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.emojiButton}
                    onPress={() => addReaction(item)}>
                    <Text style={styles.emoji}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
              />
              <TouchableOpacity style={styles.deleteButton} onPress={toggle}>
                <Text style={styles.deleteButtonText}>Delete Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <ConfirmationModal
        visible={showConfirm}
        cancel={cancel}
        deleted={deleted}
      />
    </SafeAreaView>
  );
};

export default User;
