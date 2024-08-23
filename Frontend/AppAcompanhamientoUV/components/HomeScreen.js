import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default App = () => {

    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding');
        } catch (err){
            console.log('err @clearOnboarding: ', err)
        }
    }
  return (
    <View style={styles.container}>
        <Text> Home Screen </Text>
        <Text>  </Text>
        <TouchableOpacity onPress={clearOnboarding}>
            <Text> clearOnboarding</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
