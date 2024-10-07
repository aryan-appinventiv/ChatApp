import React from 'react';
import { Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import colors from '../utils/color';
interface CustomButtonProps {
  head: string;
  onPress: (event: GestureResponderEvent) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ head, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.primaryCont]} activeOpacity={0.6}>
      <Text style={styles.primary}>{head}</Text>
    </TouchableOpacity>
  );
};

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

export default CustomButton;
