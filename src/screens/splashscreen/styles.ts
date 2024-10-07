import { StyleSheet } from "react-native";
import colors from "../../utils/color";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.white,
      fontSize: 30,
      position: 'absolute',
      fontWeight: 'bold',
    },
    landing: {
      width: '100%',
      height: '100%',
    },
  });
  export default styles;