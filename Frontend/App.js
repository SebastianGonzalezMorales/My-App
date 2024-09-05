// React Imports

import React, {useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

//Screens
import Onboarding from './src/screens/onboarding/Onboarding';
import HomeScreen from './src/components/buttons/HomeScreen';


// Customisation
import { useFonts } from 'expo-font';
//import * as SplashScreen from 'expo-splash-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator(); // create tab navigator method
const Stack = createNativeStackNavigator(); // create stack navigator method

const Loading = () => {
  return (
  <View>
    <ActivityIndicator size="large" />
  </View>
  );
}

// Tab navigator
function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: { paddingTop: 10 },

        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === 'Mood') {
            iconName = focused ? 'home-variant' : 'home-variant-outline';
            size = 23;
            color = focused ? '#5da5a9' : '#999';
          } else if (route.name === 'Medication') {
            iconName = focused ? 'calendar' : 'calendar-outline';
            size = 22;
            color = focused ? '#5da5a9' : '#999';
          } else if (route.name === 'Questionnaire') {
            iconName = focused ? 'file-document' : 'file-document-outline';
            size = 22;
            color = focused ? '#5da5a9' : '#999';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
            size = 22;
            color = focused ? '#5da5a9' : '#999';
          } else {
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name={'Mood'}
        component={Mood}
      />
      <Tab.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name={'Medication'}
        component={Medication}
      />
      <Tab.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name={'Questionnaire'}
        component={Questionnaire}
      />
      <Tab.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name={'Settings'}
        component={Settings}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const checkOnboarding = async () => {
  try {
    const value = await AsyncStorage.getItem('@viewedOnboarding');

    if (value !== null){
      setViewedOnboarding(true)
    }

  } catch (err) {

    console.log('Error @checkOnboarding:', err)
  } finally {
    setLoading(false)

  }
  }

  useEffect(() => {
    checkOnboarding();
  }, [])

  const handleOnboardingCompletion = () => {
    setViewedOnboarding(true);
  }

  return (
    <View style={styles.container}>
      {loading ? <Loading /> : viewedOnboarding ? <HomeScreen /> : <Onboarding onComplete={handleOnboardingCompletion} />}
      <StatusBar style="auto" />
    </View>
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
