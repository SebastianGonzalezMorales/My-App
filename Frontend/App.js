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
import RedesSociales from './src/screens/InformacionUv/RedesSociales';

import TestDeDepresion from './src/screens/SaludMental/Test/TestDeDepresion';

import Settings from './src/screens/settings/Settings';

import { onAuthStateChanged } from './src/screens/utils/auth';

// Customisation
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuUv from './src/screens/InformacionUv/MenuUv';
import InformacionUv from './src/screens/InformacionUv/InformacionUv';
import Informacion from './src/screens/SaludMental/AprendeSobreSaludMental/Informacion';
import AprendeSobreSaludMental from './src/screens/SaludMental/AprendeSobreSaludMental/AprendeSobreSaludMental';
import Consejos from './src/screens/SaludMental/AprendeSobreSaludMental/Consejos';
import ConsejosDeEstudiantes from './src/screens/SaludMental/AprendeSobreSaludMental/ConsejosDeEstudiantes';
import RedesDeApoyo from './src/screens/SaludMental/AprendeSobreSaludMental/RedesDeApoyo';
import SaludMental from './src/screens/SaludMental/SaludMental';
import Tests from './src/screens/SaludMental/Test/Tests';
import TestDepresion from './src/screens/SaludMental/Test/TestDepresion';
import TestDeAnsiedad from './src/screens/SaludMental/Test/TestDeAnsiedad';
import MoodTrack from './src/screens/mood/MoodTrack';
import TestDepresionHistorial from './src/screens/SaludMental/Test/TestDepresionHistorial';
import MoodHistory from './src/screens/mood/MoodHistory';
import TestAnsiedadEstadisticas from './src/screens/SaludMental/Test/TestAnsiedadEstadisticas';
import TestDepresionEstadisticas from './src/screens/SaludMental/Test/TestDepresionEstadisticas';
import Burnout from './src/screens/SaludMental/AprendeSobreSaludMental/Informacion/Burnout';
import Ansiedad from './src/screens/SaludMental/AprendeSobreSaludMental/Informacion/Ansiedad';
import Depresion from './src/screens/SaludMental/AprendeSobreSaludMental/Informacion/Depresion';
import InfoSaludMental from './src/screens/SaludMental/AprendeSobreSaludMental/Informacion/InfoSaludMental';
import Crisis from './src/screens/SaludMental/AprendeSobreSaludMental/Informacion/Crisis';
import Evaluacion from './src/screens/SaludMental/AprendeSobreSaludMental/Informacion/Evaluacion';

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
          } else if (route.name === 'MenuUv') {
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
        name={'MenuUv'}
        component={MenuUv}
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
            <Stack.Screen name="TestDepresion" component={TestDepresion} />
            <Stack.Screen name="TestDeAnsiedad" component={TestDeAnsiedad} />

            <Stack.Screen name="TestDeDepresion" component={TestDeDepresion} />
            <Stack.Screen name="TestDepresionHistorial" component={TestDepresionHistorial} />
            <Stack.Screen name="TestAnsiedadEstadisticas" component={TestAnsiedadEstadisticas} />
            <Stack.Screen name="TestDepresionEstadisticas" component={TestDepresionEstadisticas} />

            <Stack.Screen name="MoodTrack" component={MoodTrack} />
            <Stack.Screen name="MoodStats" component={MoodStats} />
            <Stack.Screen name="MoodHistory" component={MoodHistory} />

            <Stack.Screen name="MenuUv" component={MenuUv} />
            <Stack.Screen name="Informacion" component={Informacion} />

            <Stack.Screen name="Burnout" component={Burnout} />
            <Stack.Screen name="Ansiedad" component={Ansiedad} />
            <Stack.Screen name="Depresion" component={Depresion} />
            <Stack.Screen name="Crisis" component={Crisis} />
            <Stack.Screen name="InfoSaludMental" component={InfoSaludMental} />
            <Stack.Screen name="Evaluacion" component={Evaluacion} />


            <Stack.Screen name="AprendeSobreSaludMental" component={AprendeSobreSaludMental} />
            <Stack.Screen name="Consejos" component={Consejos} />
            <Stack.Screen name="ConsejosDeEstudiantes" component={ConsejosDeEstudiantes} />
            <Stack.Screen name="RedesDeApoyo" component={RedesDeApoyo} />
            
            <Stack.Screen name="RedesSociales" component={RedesSociales} />
            <Stack.Screen name="InformacionUv" component={InformacionUv} />

            
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