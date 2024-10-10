import { StyleSheet } from "react-native";
import colors from "../../utils/color";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '500',
    color: colors.gray,
  },
  textName: {
    fontWeight: '500',
    color: 'black',
  },
  textimg: {
    fontWeight: '500',
    color: colors.white,
  },
  contact: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 1,
    backgroundColor:colors.secondary,
    paddingVertical:15,
    paddingHorizontal:10
  },
  contactHead:{
    fontSize: 23,
    paddingVertical:20,
    paddingHorizontal:10,
    fontWeight:'600',
    textAlign:'center',
  },
  add:{
    height:40,
    width:40,
    color:'red',
    backgroundColor:colors.primary,
    borderRadius:50,
    position:'absolute',
    bottom:20,
    right:20,
  }
});

export default styles;