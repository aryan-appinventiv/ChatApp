import { StyleSheet } from "react-native";
import colors from "../../utils/color";
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
      paddingVertical:10,
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
      paddingBottom: 10,
      backgroundColor: colors.secondary,
      paddingTop:15,
    },
    send: {
      width: 30,
      height: 30,
    },
    sendCont: {
      marginRight: 10,
      marginBottom: 5,
      height:30,
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
  export default styles;
  