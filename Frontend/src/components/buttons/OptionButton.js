// React Imports
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function OptionButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, props.buttonStyle]}
    >
      <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7db7ba',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
    paddingLeft: 20,
    width: '100%',
  },
  text: {
    fontFamily: 'DoppioOne',
    fontSize: 16,
    color: '#f2f2f2',
  },
});
