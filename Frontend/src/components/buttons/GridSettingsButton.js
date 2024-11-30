// React Imports
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

// Customisation
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function GridSettingsButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, { backgroundColor: props.backgroundColor || '#d8eef7' }]}
    >
      <Text
        style={[styles.text, { color: props.textColor || '#238bdf' }]}
      >
        {props.text}
      </Text>
      <MaterialCommunityIcons
        style={styles.icon}
        name="chevron-right"
        size={24} // Tamaño del icono reducido para que se vea más equilibrado
        color={props.iconColor || '#238bdf'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#d8eef7',
    borderRadius: 10,
    flexDirection: 'row',
    height: 90, // Ajuste para hacer el botón más compacto
    justifyContent: 'space-between',
    paddingHorizontal: 15, // Espacio interno ajustado para un mejor equilibrio
    margin: 5, // Margen reducido para disminuir el espacio en blanco
    flex: 1, // Permite que el botón se adapte bien en la cuadrícula
  },
  text: {
    color: '#238bdf',
    flex: 1,
    fontFamily: 'DoppioOne',
    fontSize: 16,
    marginLeft: 5, // Ajuste para mejorar la disposición del texto en botones cuadrados
  },
  icon: {
    marginRight: 5,
  },
});
