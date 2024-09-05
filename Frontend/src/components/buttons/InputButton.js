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
        placeholderTextColor="#abced5"
        selectionColor="#5da5a9"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7db7ba',
    borderRadius: 10,
    flexDirection: 'row',
    height: 60,
    marginTop: 10,
  },
  input: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 14,
    marginLeft: 20,
    width: '80%',
  },
});
