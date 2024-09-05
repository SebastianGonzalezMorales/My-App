import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CircularButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#5da5a9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#f2f2f2',
    fontSize: 30,
  },
});

export default CircularButton;
