// React Imports
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';

// Customisation
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function GridSettingsButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, { backgroundColor: props.backgroundColor || '#d8eef7' }]}
    >
      <View style={styles.content}>
        {/* Imagen debajo del texto, si se proporciona */}
        {props.imageSource && (
          <Image source={props.imageSource} style={styles.image} resizeMode="contain" />
        )}
        <Text
          style={[styles.text, { color: props.textColor || '#238bdf' }]}
        >
          {props.text}
        </Text>
      </View>
      <MaterialCommunityIcons
        style={styles.icon}
        name="chevron-right"
        size={24}
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
    height: 150,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    margin: 5,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    flex: 1,
    marginTop: -20,
  },
  text: {
    color: '#238bdf',
    fontFamily: 'DoppioOne',
    fontSize: 15,
    marginTop: -10, // Espacio entre la imagen y el texto
    textAlign: 'center',
    paddingHorizontal: -50, // Ampliar el área del texto horizontalmente
  },
  image: {
    width: 130, // Ajusta el tamaño según sea necesario
    height: 130,
    marginBottom: -10, // Espacio entre la imagen y el texto
  },
  icon: {
    marginRight: 1,
  },
});
