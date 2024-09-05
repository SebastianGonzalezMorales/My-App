// React Imports
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      style={[styles.button, props.buttonStyle]}
    >
      <MaterialCommunityIcons
        name={props.name}
        size={props.size}
        color={props.color}
        style={props.style}
      />
      <Text style={[styles.title, props.textStyle]}>{props.title}</Text>
      <Text style={[styles.textOne, props.textStyle]}>{props.textOne}</Text>
      <Text style={[styles.textTwo, props.textStyle]}>{props.textTwo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
  },
  title: {
    flex: 1,
    fontFamily: 'DoppioOne',
    fontSize: 16,
    marginLeft: 20,
  },
  textOne: {
    fontFamily: 'DoppioOne',
    fontSize: 14,
    marginRight: 10,
  },
  textTwo: {
    fontFamily: 'DoppioOne',
    fontSize: 14,
    marginRight: 20,
  },
});
