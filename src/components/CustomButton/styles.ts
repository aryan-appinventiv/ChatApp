import { StyleSheet } from "react-native";
import colors from "../../utils/color";
const styles = StyleSheet.create({
  primary: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
  primaryCont: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
  },
});
export default styles;