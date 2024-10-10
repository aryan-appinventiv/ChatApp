import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import styles from './styles';
interface CustomInputProps {
  placeholder: string;
  value?: any;
  onChangeText?: any;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.textinput}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default CustomInput;


