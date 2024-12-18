// React Imports
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function InputButton(props) {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor="#E0E0E0"
        selectionColor="#5da5a9"
        style={styles.input}
        multiline={true}          // Permite que el texto placeholder se ajuste
        textAlignVertical="top"         // Alinea el texto al inicio del input
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7db7ba',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 5,  // Espacio horizontal
    paddingVertical: 5,    // Espacio vertical
  },
  input: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 14,
    lineHeight: 20,
    padding: 10,
    minHeight: 90,        // Altura mínima
    maxHeight: 200,       // Altura máxima
    textAlignVertical: 'top',
  },
});
