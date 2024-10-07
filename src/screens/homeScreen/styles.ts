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
      backgroundColor: colors.primary,
      paddingTop: '15%',
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
    customInput: {
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
    noResultsText: {
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
  export default styles;