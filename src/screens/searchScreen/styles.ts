import { StyleSheet } from "react-native";
import colors from "../../utils/color";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondary,
    },
    flatlist: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: colors.white,
      borderBottomWidth:1,
      paddingVertical:15,
      borderColor: colors.lightgray,
    },
    imageStyle: {
      width: 45,
      height: 45,
      borderRadius: 50,
      marginRight: 10,
      backgroundColor:colors.primary,
      justifyContent:'center',
      alignItems:'center',
    },
    inputCont: {
      flex: 1,
      backgroundColor: colors.white,
      marginVertical: 19,
      marginLeft: 16,
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    cont: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    text:{
      fontWeight:'500',
      color:colors.gray,
    },
    textimg:{
      fontWeight:'500',
      color:colors.white,
    },
    listCont:{
      flex:1,
      backgroundColor:colors.white,
      borderRadius:8,
      marginHorizontal: 16,
      padding:8,
    },
    notfoundCont:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
    notfound:{
      height:200,
      width:200,
    }
  });
  export default styles;