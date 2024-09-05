// React Imports
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Customisation
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BackButton(props) {
  return (
    <TouchableOpacity style={styles.backButton} onPress={props.onPress}>
      <MaterialCommunityIcons name="chevron-left" size={40} color="#f2f2f2" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingLeft: 30,
  },
});
