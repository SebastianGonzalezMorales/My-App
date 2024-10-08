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
        <View style={[styles.content, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          {/* Texto de la severidad (en negrita) */}
          <Text style={[styles.title, { flex: 1, textAlign: 'left', fontWeight: 'bold' }, props.textStyle]}>
            {props.title} {/* Esto sería "Normal", "Leve", etc. */}
          </Text>
  
          {/* Texto de la fecha (normal) */}
          <Text style={[styles.textOne, { flex: 1, textAlign: 'center', fontWeight: 'normal' }, props.textStyle]}>
            {props.textOne} {/* Esto sería la fecha */}
          </Text>
  
          {/* Texto del resultado (normal) */}
          <Text style={[styles.textTwo, { flex: 1, textAlign: 'right', fontWeight: 'normal' }, props.textStyle]}>
            {props.textTwo} {/* Esto sería el resultado, por ejemplo, "0/27" */}
          </Text>
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
