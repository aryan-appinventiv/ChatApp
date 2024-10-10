import { StyleSheet } from "react-native";
import colors from "../../utils/color";
const styles = StyleSheet.create({
  ModalCont: {
    flex: 1,
    backgroundColor: colors.blurBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  delImg: {
    height: 30,
    width: 30,
  },
  delCont: {
    justifyContent: 'center',
  },
  delText: {
    fontWeight: '600',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  deltext2: {
    color: colors.gray,
    alignSelf: 'center',
    marginTop: 10,
  },
  delImgCont: {
    height: 50,
    width: 50,
    backgroundColor: colors.lightred,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginVertical: 30,
  },
  NoButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  YesButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  YesButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  NoButtonText: {
    fontWeight: '600',
    fontSize: 15,
  },
});
export default styles;