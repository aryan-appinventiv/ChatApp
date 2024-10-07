import {Text, StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Menu() {

  return (
    <SafeAreaView style={styles.container}>
      <Text>Menu</Text>
    </SafeAreaView>

  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})








// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Modal,
//   FlatList,
//   Alert,
// } from 'react-native';
// import React, { useState, useCallback, useEffect } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Images from '../../assets';
// import { GiftedChat, InputToolbar, Send, Bubble } from 'react-native-gifted-chat';
// import { useRoute } from '@react-navigation/native';
// import CustomModal2 from '../../components/CustomModal2';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Function to get a unique storage key for each user
// const getStorageKey = (userId) => `@chat_messages_${userId}`;

// const User = ({ navigation }) => {
//   const [messages, setMessages] = useState([]);
//   const [visibleModal, setVisibleModal] = useState(false);
//   const [reactionModalVisible, setReactionModalVisible] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null); // Store the selected message for reactions/delete

//   // Get user details from route params
//   const route = useRoute();
//   const { name, profile } = route.params;

//   const start = () => {
//     setVisibleModal(!visibleModal);
//   };

//   // Load messages for the specific user from AsyncStorage
//   useEffect(() => {
//     const loadMessages = async () => {
//       try {
//         const storageKey = getStorageKey(name); // Use the user name as the storage key
//         const storedMessages = await AsyncStorage.getItem(storageKey);
//         if (storedMessages !== null) {
//           setMessages(JSON.parse(storedMessages));
//         } else {
//           // If no messages are stored, initialize with a welcome message
//           setMessages([
//             {
//               _id: 1,
//               text: 'Welcome to the chat!',
//               createdAt: new Date(),
//               user: {
//                 _id: 2,
//                 name: 'React Native',
//                 avatar: 'https://placeimg.com/140/140/any',
//               },
//               reactions: [], // Initialize reactions as an empty array
//             },
//           ]);
//         }
//       } catch (error) {
//         console.error('Failed to load messages from AsyncStorage', error);
//       }
//     };

//     loadMessages();
//   }, [name]); // Run this effect whenever the user changes

//   // Store messages for the specific user in AsyncStorage
//   const storeMessages = async (newMessages) => {
//     try {
//       const storageKey = getStorageKey(name); // Use the user name as the storage key
//       await AsyncStorage.setItem(storageKey, JSON.stringify(newMessages));
//     } catch (error) {
//       console.error('Failed to store messages in AsyncStorage', error);
//     }
//   };

//   // Append new messages and store them in AsyncStorage
//   const onSend = useCallback((newMessages = []) => {
//     const updatedMessages = GiftedChat.append(messages, newMessages);
//     setMessages(updatedMessages);
//     storeMessages(updatedMessages); // Store updated messages to AsyncStorage
//   }, [messages]);

//   const back = () => {
//     navigation.navigate('Search');
//   };

//   const renderActions = useCallback(() => {
//     return (
//       <TouchableOpacity>
//         <Image source={Images.add} style={styles.add} />
//       </TouchableOpacity>
//     );
//   });

//   const renderSend = (props) => (
//     <Send {...props} containerStyle={styles.sendCont}>
//       <Image source={Images.paperPlane} style={styles.send} />
//     </Send>
//   );

//   // Function to delete all messages for the current user
//   const deleteMessages = async () => {
//     try {
//       const storageKey = getStorageKey(name); // Use the user name as the storage key
//       await AsyncStorage.removeItem(storageKey); // Remove the user's messages from AsyncStorage
//       setMessages([]); // Clear the messages in the UI
//       setVisibleModal(false);
//     } catch (error) {
//       console.error('Failed to delete messages', error);
//       Alert.alert('Failed to delete messages');
//     }
//   };

//   // Show modal when long press on message
//   const onMessageLongPress = (context, message) => {
//     setSelectedMessage(message);
//     setReactionModalVisible(true); // Show reaction modal
//   };

//   // Set of emoticons for reactions
//   const emojis = ['😀', '😢', '❤️', '👍', '🔥'];

//   // Function to add a reaction to a message
//   const addReaction = (reaction) => {
//     const updatedMessages = messages.map(msg => {
//       if (msg._id === selectedMessage._id) {
//         return { 
//           ...msg, 
//           reactions: msg.reactions ? [...msg.reactions, reaction] : [reaction] 
//         };
//       }
//       return msg;
//     });
//     setMessages(updatedMessages);
//     storeMessages(updatedMessages);
//     setReactionModalVisible(false);
//   };

//   // Function to delete a selected message
//   const deleteSelectedMessage = () => {
//     const updatedMessages = messages.filter(msg => msg._id !== selectedMessage._id);
//     setMessages(updatedMessages);
//     storeMessages(updatedMessages);
//     setReactionModalVisible(false);
//   };

//   // Custom Bubble to show reactions
//   const renderBubble = (props) => (
//     <View>
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: { backgroundColor: '#2A7BBB' },
//           left: { backgroundColor: '#F0F0F0' },
//         }}
//       />
//       {props.currentMessage.reactions && props.currentMessage.reactions.length > 0 && (
//         <View style={styles.reactionContainer}>
//           {props.currentMessage.reactions.map((reaction, index) => (
//             <Text key={index} style={styles.reaction}>
//               {reaction}
//             </Text>
//           ))}
//         </View>
//       )}
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.cont}>
//         <View style={styles.textCont}>
//           <TouchableOpacity onPress={back}>
//             <Image source={Images.backArrow} />
//           </TouchableOpacity>

//           <View style={styles.imageStyle}>
//             <Text style={styles.textimg}>{profile}</Text>
//           </View>
//           <View>
//             <Text style={styles.text1}>{name}</Text>
//             <Text style={styles.text2}>Clocked in</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.dotsCont} onPress={start}>
//           <Image source={Images.dots} style={styles.dots} />
//         </TouchableOpacity>
//       </View>

//       {/* Main Chat View */}
//       <View style={styles.secondView}>
//         <GiftedChat
//           messages={messages}
//           onSend={messages => onSend(messages)}
//           user={{
//             _id: 1,
//           }}
//           textInputStyle={styles.textInputStyle}
//           renderInputToolbar={props => {
//             return (
//               <InputToolbar containerStyle={styles.containerStyle} {...props} />
//             );
//           }}
//           renderActions={renderActions}
//           placeholder="Your typed message"
//           renderSend={renderSend}
//           onLongPress={onMessageLongPress}
//           renderBubble={renderBubble}
//         />
//         <CustomModal2
//           visible={visibleModal}
//           start={start}
//           deleteMessages={deleteMessages}
//         />
//       </View>

//       {/* Reaction and Delete Modal */}
//       <Modal
//         visible={reactionModalVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setReactionModalVisible(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPressOut={() => setReactionModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.reactionModal}>
//               {/* Display Emojis */}
//               <FlatList
//                 horizontal
//                 data={emojis}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={styles.emojiButton}
//                     onPress={() => addReaction(item)}
//                   >
//                     <Text style={styles.emoji}>{item}</Text>
//                   </TouchableOpacity>
//                 )}
//                 keyExtractor={(item) => item}
//                 showsHorizontalScrollIndicator={false}
//               />
//               {/* Delete Message Button */}
//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={deleteSelectedMessage}
//               >
//                 <Text style={styles.deleteButtonText}>Delete Message</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default User;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   cont: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     justifyContent: 'space-between',
//     paddingBottom: 20,
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   dots: {
//     width: 20,
//     height: 20,
//   },
//   dotsCont: {
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 8,
//     padding: 13,
//     marginHorizontal: 10,
//   },
//   textimg: {
//     fontWeight: '500',
//     color: 'white',
//   },
//   imageStyle: {
//     width: 45,
//     height: 45,
//     borderRadius: 50,
//     marginHorizontal: 10,
//     backgroundColor: '#2A7BBB',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textCont: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   text2: {
//     color: 'gray',
//     fontSize: 12,
//   },
//   text1: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   secondView: {
//     backgroundColor: '#E7EDF3',
//     flex: 1,
//   },
//   add: {
//     width: 30,
//     height: 30,
//     marginLeft: 10,
//     marginVertical: 5,
//     backgroundColor: 'gray',
//     borderRadius: 50,
//   },
//   textInputStyle: {
//     borderRadius: 8,
//     backgroundColor: 'white',
//     marginHorizontal: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     paddingHorizontal: 10,
//   },
//   containerStyle: {
//     paddingVertical: 5,
//     backgroundColor: 'offwhite',
//   },
//   send: {
//     width: 30,
//     height: 30,
//   },
//   sendCont: {
//     marginRight: 10,
//     marginBottom: 5,
//   },
//   // Styles for the reaction modal
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContainer: {
//     justifyContent: 'flex-end',
//   },
//   reactionModal: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     alignItems: 'center',
//   },
//   emojiButton: {
//     padding: 10,
//   },
//   emoji: {
//     fontSize: 30,
//   },
//   deleteButton: {
//     marginTop: 20,
//     backgroundColor: 'red',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   deleteButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   reactionContainer: {
//     flexDirection: 'row',
//     marginTop: 5,
//     marginLeft: 10,
//   },
//   reaction: {
//     fontSize: 14,
//     marginRight: 5,
//   },
// });



// More Correct code



// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Modal,
//   FlatList,
//   Alert,
// } from 'react-native';
// import React, { useState, useCallback, useEffect } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Images from '../../assets';
// import { GiftedChat, InputToolbar, Send, Bubble } from 'react-native-gifted-chat';
// import { useRoute } from '@react-navigation/native';
// import CustomModal2 from '../../components/CustomModal2';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Function to get a unique storage key for each user
// const getStorageKey = (userId) => `@chat_messages_${userId}`;

// const User = ({ navigation }) => {
//   const [messages, setMessages] = useState([]);
//   const [visibleModal, setVisibleModal] = useState(false);
//   const [reactionModalVisible, setReactionModalVisible] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null); // Store the selected message for reactions/delete

//   // Get user details from route params
//   const route = useRoute();
//   const { name, profile } = route.params;

//   const start = () => {
//     setVisibleModal(!visibleModal);
//   };

//   // Load messages for the specific user from AsyncStorage
//   useEffect(() => {
//     const loadMessages = async () => {
//       try {
//         const storageKey = getStorageKey(name); // Use the user name as the storage key
//         const storedMessages = await AsyncStorage.getItem(storageKey);
//         if (storedMessages !== null) {
//           setMessages(JSON.parse(storedMessages));
//         } else {
//           // If no messages are stored, initialize with a welcome message
//           setMessages([
//             {
//               _id: 1,
//               text: 'Welcome to the chat!',
//               createdAt: new Date(),
//               user: {
//                 _id: 2,
//                 name: 'React Native',
//                 avatar: 'https://placeimg.com/140/140/any',
//               },
//               reaction: null, // Initialize reaction as null
//             },
//           ]);
//         }
//       } catch (error) {
//         console.error('Failed to load messages from AsyncStorage', error);
//       }
//     };

//     loadMessages();
//   }, [name]); // Run this effect whenever the user changes

//   // Store messages for the specific user in AsyncStorage
//   const storeMessages = async (newMessages) => {
//     try {
//       const storageKey = getStorageKey(name); // Use the user name as the storage key
//       await AsyncStorage.setItem(storageKey, JSON.stringify(newMessages));
//     } catch (error) {
//       console.error('Failed to store messages in AsyncStorage', error);
//     }
//   };

//   // Append new messages and store them in AsyncStorage
//   const onSend = useCallback((newMessages = []) => {
//     const updatedMessages = GiftedChat.append(messages, newMessages);
//     setMessages(updatedMessages);
//     storeMessages(updatedMessages); // Store updated messages to AsyncStorage
//   }, [messages]);

//   const back = () => {
//     navigation.navigate('Search');
//   };

//   const renderActions = useCallback(() => {
//     return (
//       <TouchableOpacity>
//         <Image source={Images.add} style={styles.add} />
//       </TouchableOpacity>
//     );
//   });

//   const renderSend = (props) => (
//     <Send {...props} containerStyle={styles.sendCont}>
//       <Image source={Images.paperPlane} style={styles.send} />
//     </Send>
//   );

//   // Function to delete all messages for the current user
//   const deleteMessages = async () => {
//     try {
//       const storageKey = getStorageKey(name); // Use the user name as the storage key
//       await AsyncStorage.removeItem(storageKey); // Remove the user's messages from AsyncStorage
//       setMessages([]); // Clear the messages in the UI
//       setVisibleModal(false);
//       Alert.alert('All messages deleted successfully');
//     } catch (error) {
//       console.error('Failed to delete messages', error);
//       Alert.alert('Failed to delete messages');
//     }
//   };

//   // Show modal when long press on message
//   const onMessageLongPress = (context, message) => {
//     setSelectedMessage(message);
//     setReactionModalVisible(true); // Show reaction modal
//   };

//   // Set of emoticons for reactions
//   const emojis = ['😀', '😢', '❤️', '👍', '🔥'];

//   // Function to add or remove a reaction to a message
//   const addReaction = (reaction) => {
//     const updatedMessages = messages.map((msg) => {
//       if (msg._id === selectedMessage._id) {
//         // Toggle reaction: if same as existing, remove it; else, set new reaction
//         const newReaction = msg.reaction === reaction ? null : reaction;
//         return { ...msg, reaction: newReaction };
//       }
//       return msg;
//     });
//     setMessages(updatedMessages);
//     storeMessages(updatedMessages);
//     setReactionModalVisible(false);
//   };

//   // Function to delete a selected message
//   const deleteSelectedMessage = () => {
//       Alert.alert(
//         'Delete Message', // Title
//         'Are you sure you want to delete this message?', // Message
//         [
//           {
//             text: 'Cancel', // Button label for cancel
//             style: 'cancel', // iOS specific style for cancel button
//             onPress: () => {
//               setReactionModalVisible(false); // Close the modal without deleting the message
//             },
//           },
//           {
//             text: 'OK', // Button label for confirming deletion
//             onPress: () => {
//               // Proceed with deletion if user confirms
//               const updatedMessages = messages.filter((msg) => msg._id !== selectedMessage._id);
//               setMessages(updatedMessages);
//               storeMessages(updatedMessages);
//               setReactionModalVisible(false);
//               Alert.alert('Message deleted successfully');
//             },
//           },
//         ],
//         { cancelable: true } // Allows dismissing the alert by tapping outside on Android
//       );
//     };

//   const renderBubble = (props) => (
//     <View style={styles.bubbleWrapper}>
//       <View style={styles.messageContainer}>
//         <Bubble
//           {...props}
//           wrapperStyle={{
//             right: { backgroundColor: '#2A7BBB' },
//             left: { backgroundColor: '#F0F0F0' },
//           }}
//         />
//         {/* Show reaction only if it exists */}
//         {props.currentMessage.reaction && (
//           <Text style={styles.reaction}>{props.currentMessage.reaction}</Text>
//         )}
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.cont}>
//         <View style={styles.textCont}>
//           <TouchableOpacity onPress={back}>
//             <Image source={Images.backArrow} />
//           </TouchableOpacity>

//           <View style={styles.imageStyle}>
//             <Text style={styles.textimg}>{profile}</Text>
//           </View>
//           <View>
//             <Text style={styles.text1}>{name}</Text>
//             <Text style={styles.text2}>Clocked in</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.dotsCont} onPress={start}>
//           <Image source={Images.dots} style={styles.dots} />
//         </TouchableOpacity>
//       </View>

//       {/* Main Chat View */}
//       <View style={styles.secondView}>
//         <GiftedChat
//           messages={messages}
//           onSend={(messages) => onSend(messages)}
//           user={{
//             _id: 1,
//           }}
//           textInputStyle={styles.textInputStyle}
//           renderInputToolbar={(props) => {
//             return <InputToolbar containerStyle={styles.containerStyle} {...props} />;
//           }}
//           renderActions={renderActions}
//           placeholder="Your typed message"
//           renderSend={renderSend}
//           onLongPress={onMessageLongPress}
//           renderBubble={renderBubble}
//         />
//         <CustomModal2
//           visible={visibleModal}
//           start={start}
//           deleteMessages={deleteMessages}
//         />
//       </View>

//       {/* Reaction and Delete Modal */}
//       <Modal
//         visible={reactionModalVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setReactionModalVisible(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPressOut={() => setReactionModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.reactionModal}>
//               {/* Display Emojis */}
//               <FlatList
//                 horizontal
//                 data={emojis}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={styles.emojiButton}
//                     onPress={() => addReaction(item)}
//                   >
//                     <Text style={styles.emoji}>{item}</Text>
//                   </TouchableOpacity>
//                 )}
//                 keyExtractor={(item) => item}
//                 showsHorizontalScrollIndicator={false}
//               />
//               {/* Delete Message Button */}
//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={deleteSelectedMessage}
//               >
//                 <Text style={styles.deleteButtonText}>Delete Message</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </Modal>
      
//     </SafeAreaView>
//   );
// };

// export default User;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   cont: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     justifyContent: 'space-between',
//     paddingBottom: 20,
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   dots: {
//     width: 20,
//     height: 20,
//   },
//   dotsCont: {
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 8,
//     padding: 13,
//     marginHorizontal: 10,
//   },
//   textimg: {
//     fontWeight: '500',
//     color: 'white',
//   },
//   imageStyle: {
//     width: 45,
//     height: 45,
//     borderRadius: 50,
//     marginHorizontal: 10,
//     backgroundColor: '#2A7BBB',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textCont: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   text2: {
//     color: 'gray',
//     fontSize: 12,
//   },
//   text1: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   secondView: {
//     backgroundColor: '#E7EDF3',
//     flex: 1,
//   },
//   add: {
//     width: 30,
//     height: 30,
//     marginLeft: 10,
//     marginVertical: 5,
//     backgroundColor: 'gray',
//     borderRadius: 50,
//   },
//   textInputStyle: {
//     borderRadius: 8,
//     backgroundColor: 'white',
//     marginHorizontal: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     paddingHorizontal: 10,
//   },
//   containerStyle: {
//     paddingVertical: 5,
//     backgroundColor: 'offwhite',
//   },
//   send: {
//     width: 30,
//     height: 30,
//   },
//   sendCont: {
//     marginRight: 10,
//     marginBottom: 5,
//   },
//   // Styles for the reaction modal
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContainer: {
//     justifyContent: 'flex-end',
//   },
//   reactionModal: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     alignItems: 'center',
//   },
//   emojiButton: {
//     padding: 10,
//   },
//   emoji: {
//     fontSize: 30,
//   },
//   deleteButton: {
//     marginTop: 20,
//     backgroundColor: 'red',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   deleteButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   reactionContainer: {
//     flexDirection: 'row',
//     marginTop: 5,
//     marginLeft: 10,
//   },

//   bubbleWrapper: {
//     flexDirection: 'row', // Place the message and the reaction side by side
//     alignItems: 'center', // Align them vertically in the center
//   },
//   messageContainer: {
//     flexDirection: 'row', // Ensure the message and reaction are on the same row
//     alignItems: 'center', // Align them properly
//   },
//   reaction: {
//     fontSize: 20, // Adjust size of the reaction emoji
//     marginLeft: 5, // Space between the message bubble and the emoji
//   },
// });