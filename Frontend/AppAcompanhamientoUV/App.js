import React, {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Onboarding from './components/Onboarding';
import HomeScreen from './components/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Loading = () => {
  return (
  <View>
    <ActivityIndicator size="large" />
  </View>
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
