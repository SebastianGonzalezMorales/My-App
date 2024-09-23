// React Imports
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // O el tipo de ícono que prefieras

export default function AuthButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <View style={styles.buttonContent}>
        <Icon name={props.iconName} size={30} color="#fff" style={styles.icon} />
        <Text style={styles.text}>{props.text}</Text>
      </View>
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: 'DoppioOne',
    fontSize: 20,
    marginLeft: 20, // Espacio entre el ícono y el texto
  },
  icon: {
    marginRight: -10, // Espaciado entre el ícono y el texto
  },
});
