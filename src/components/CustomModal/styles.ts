import { StyleSheet } from "react-native";
import colors from "../../utils/color";
const styles = StyleSheet.create({
  modalCont: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.blurBackground,
  },
  modal: {
    height: '30%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
  },
  modalinside: {
    flexDirection: 'row',
    paddingVertical: 24,
    marginHorizontal: 24,
    borderColor: colors.gray,
  },
  insideText: {
    marginHorizontal: 10,
    color: colors.gray,
  },
});
export default styles;