import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import Images from '../assets';
import colors from '../utils/color';
interface CustomModalProps {
  visible: boolean;
  start: () => void;
  deleteMessages: ()=> void;
  
}

const CustomModal2: React.FC<CustomModalProps> = ({ visible, start, deleteMessages}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={start}>
        <View style={styles.modalCont}>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.modalinside}>
              <Image source={Images.eye as ImageSourcePropType} />
              <Text style={styles.insideText}>View details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalinside, { borderTopWidth: 1}]}>
              <Image source={Images.twoModal as ImageSourcePropType} />
              <Text style={styles.insideText}>Unpin chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalinside,{ borderTopWidth: 1}]}>
              <Image source={Images.search as ImageSourcePropType} />
              <Text style={styles.insideText}>Search chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalinside,{ borderTopWidth: 1}]} onPress={deleteMessages}>
              <Image source={Images.delete as ImageSourcePropType} style={styles.delete}/>
              <Text style={[styles.insideText,{color:colors.red, fontWeight:'500'}]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal2;

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
    paddingHorizontal:10,
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
  delete:{
    height:20,
    width:20,
  },
});
