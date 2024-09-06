// React Imports
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function AuthButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#000C7B',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    marginTop: 30,
    width: '100%',
  },
  text: {
    color: '#fff',
    fontFamily: 'DoppioOne',
    fontSize: 20,
  },
});
