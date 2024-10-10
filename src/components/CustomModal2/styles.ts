import { StyleSheet } from "react-native";
import colors from "../../utils/color";
const styles = StyleSheet.create({
  modalCont: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.blurBackground,
  },
  modal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  delete: {
    height: 20,
    width: 20,
  },
});
export default styles;