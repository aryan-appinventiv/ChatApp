import React from 'react';
import {
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import styles from './styles';

  interface CustomButtonProps {
  head: string;
  onPress: (event: GestureResponderEvent) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({head, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.primaryCont}
      activeOpacity={0.6}>
      <Text style={styles.primary}>{head}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
