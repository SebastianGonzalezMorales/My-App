// React Imports
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      style={[styles.button, props.buttonStyle]}
    >
      <View style={styles.content}>
        {/* Agrega el ícono solo si se proporciona */}
        {props.icon && (
          <MaterialCommunityIcons
            name={props.icon}
            size={props.size || 24} // Tamaño por defecto si no se proporciona
            color={props.color || '#d85a77'} // Color por defecto si no se proporciona
            style={styles.icon} // Clase de estilo para el ícono
          />
        )}
        <Text style={[styles.title, props.textStyle]}>{props.title}</Text>
        <Text style={[styles.textOne, props.textStyle]}>{props.textOne}</Text>
        <Text style={[styles.textTwo, props.textStyle]}>{props.textTwo}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    height: 60,
    marginTop: 10,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center', // Alinea verticalmente el ícono y el texto
    justifyContent: 'center',
    flex: 1, // Permite que el contenido ocupe todo el espacio del botón
  },
  title: {
    fontFamily: 'DoppioOne',
    fontSize: 16,
    marginLeft: 20,
    textAlign: 'center',
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
  icon: {
    marginRight: -10, // Espaciado entre el ícono y el texto
  },
});
