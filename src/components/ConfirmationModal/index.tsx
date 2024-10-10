import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Images from '../../assets';
import styles from './styles';

interface ConfirmationModalProps {
  visible: boolean;
  cancel: () => void;
  deleted: () => void;
  heading: string;
  text:string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  cancel,
  deleted,
  heading,
  text,
}) => {
  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={cancel}>
        <View style={styles.ModalCont}>
          <View style={styles.modal}>
            <View style={styles.delImgCont}>
              <Image source={Images.delete} style={styles.delImg} />
            </View>
            <Text style={styles.delText}>{heading}</Text>
            <Text style={styles.deltext2}>
              {text}
            </Text>
            <View style={styles.buttonCont}>
              <TouchableOpacity style={styles.NoButton} onPress={cancel}>
                <Text style={styles.NoButtonText}>No, Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.YesButton} onPress={deleted}>
                <Text style={styles.YesButtonText}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmationModal;

