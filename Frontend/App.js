import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//Navigators
import Main from './Navigators/Main'

export default function App() {
  return (
    <NavigationContainer>
        <Main/>
    </NavigationContainer>
  );
}

