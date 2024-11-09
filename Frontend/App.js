// React Imports

import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from './src/context/AuthContext';



import { StatusBar } from 'expo-status-bar';

//Screens
import Onboarding from './src/screens/onboarding/Onboarding';
import Policy from './src/screens/onboarding/Policy';
import HomeScreen from './src/components/buttons/HomeScreen';

import Login from './src/screens/authentication/Login';
import Register from './src/screens/authentication/Register';
import ForgotPassword from './src/screens/authentication/ForgotPassword';
import ChangePassword from './src/screens/authentication/ChangePassword';
import Mood from './src/screens/mood/Mood';
import MoodStats from './src/screens/mood/MoodStats';

import Questionnaire from './src/screens/SaludMental/Questionnaire';

import Settings from './src/screens/settings/Settings';

import { onAuthStateChanged } from './src/screens/utils/auth';

// Customisation
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import M2 from './src/screens/M2/M2';
import SaludMental from './src/screens/SaludMental/SaludMental';
import Tests from './src/screens/SaludMental/Tests';
import Test from './src/screens/SaludMental/Test';
import MoodTrack from './src/screens/mood/MoodTrack';
import QuestionnaireStats from './src/screens/SaludMental/QuestionnaireStats';
import MoodHistory from './src/screens/mood/MoodHistory';
import QuestionnaireHistory from './src/screens/SaludMental/QuestionnaireHistory';

const Tab = createBottomTabNavigator(); // create tab navigator method
const Stack = createNativeStackNavigator(); // create stack navigator method


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
            size = 30;
            color = focused ? '#000C7B' : '#999';
          } else if (route.name === 'SaludMental') {
            iconName = focused ? 'brain' : 'brain';
            size = 30;
            color = focused ? '#000C7B' : '#999';
          } else if (route.name === 'M2') {
            iconName = focused ? 'file-document' : 'file-document-outline';
            size = 30;
            color = focused ? '#000C7B' : '#999';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'account' : 'account';
            size = 30;
            color = focused ? '#000C7B' : '#999';
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
        name={'SaludMental'}
        component={SaludMental}
      />

        <Tab.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name={'M2'}
        component={M2}
      />
      

      
{/* 
      <Tab.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name={'Questionnaire'}
        component={Questionnaire}
      /> */}
      <Tab.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name={'Settings'}
        component={Settings}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);
  //const [loading, setLoading] = useState(true);
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
    //setLoading(false)

  }
  }

  useEffect(() => {
    checkOnboarding();
  }, [])

 /*  const handleOnboardingCompletion = () => {
    setViewedOnboarding(true);
  } */

     const [initialising, setInitialising] = useState(true);
    const [user, setUser] = useState();

  // pre-loading fonts
  const [fontsLoaded] = useFonts({
    DoppioOne: require('./src/assets/fonts/DoppioOne-Regular.ttf'),
    Actor: require('./src/assets/fonts/Actor-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    onAuthStateChanged(setUser, setInitialising);
  }, []);


  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  if (initialising) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Indicador de carga
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userToken ? (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Policy" component={Policy} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Tests" component={Tests} />
            <Stack.Screen name="Test" component={Test} />

            <Stack.Screen name="Questionnaire" component={Questionnaire} />
            <Stack.Screen name="QuestionnaireStats" component={QuestionnaireStats} />
            <Stack.Screen name="QuestionnaireHistory" component={QuestionnaireHistory} />

            <Stack.Screen name="MoodTrack" component={MoodTrack} />
            <Stack.Screen name="MoodStats" component={MoodStats} />
            <Stack.Screen name="MoodHistory" component={MoodHistory} />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}