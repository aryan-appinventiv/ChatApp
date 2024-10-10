import React from 'react';
import {
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Images from '../../assets';
import styles from './styles';
interface CustomModalProps {
  visible: boolean;
  start: () => void;
  newChat: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({visible, start, newChat}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={start}>
        <View style={styles.modalCont}>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.modalinside} onPress={newChat}>
              <Image source={Images.oneModal as ImageSourcePropType} />
              <Text style={styles.insideText}>New Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalinside,
                {borderTopWidth: 1, borderBottomWidth: 1},
              ]}>
              <Image source={Images.twoModal as ImageSourcePropType} />
              <Text style={styles.insideText}>New Group Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalinside}>
              <Image source={Images.threeModal as ImageSourcePropType} />
              <Text style={styles.insideText}>New Announcement</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;

