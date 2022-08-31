import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//Navigators
import Main from './Navigators/Main';

import TodoList from './Components/Todolist';

//Screens
import ProductContainer from "./Screens/Products/ProductContainer";

export default function App() {
  return (
    <NavigationContainer>
      <Main/>
    </NavigationContainer>      
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/* export default function App() {
  return (
    <NavigationContainer>
        <TodoList />
        <Main/>
    </NavigationContainer>
  );
} */
