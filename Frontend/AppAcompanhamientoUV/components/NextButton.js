import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const NextButton = ({ scrollTo }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={scrollTo} style={styles.button}>
        <AntDesign name="arrowright" size={32} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#000C7B',
    borderRadius: 100,
    padding: 20,
  },
});
