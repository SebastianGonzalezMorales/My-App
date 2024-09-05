// React Imports
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function SmallAuthButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#5da5a9',
    fontFamily: 'Actor',
    fontSize: 12,
  },
});
