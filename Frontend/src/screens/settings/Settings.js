// react imports
import {
  Linking, NativeModules, Platform, SafeAreaView, ScrollView, Text, View,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../context/AuthContext';

// Import the API URL from environment variables
import { API_URL } from '@env';

// components

import SmallFormButton from '../../components/buttons/SmallFormButton';
import SettingsButton from '../../components/buttons/SettingsButton';
import AuthButton from '../../components/buttons/AuthButton';

// customisation
import GlobalStyle from '../../assets/styles/GlobalStyle';

function Settings({ navigation }) {
  const { logout } = useContext(AuthContext);

  // states
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [carrera, setCarrera] = useState('');

  /*
   * *******************
   * **** Functions ****
   * *******************
   */

  // hook to fetch user's data
  useEffect(() => {
    const fetchName = async () => {
      /*   userRef.onSnapshot((snapshot) => {
         const { fullName, email } = snapshot.data();
         setName(fullName);
         setEmail(email);
       });*/
    };
    fetchName();
  }, []);

  // sign out function
  const handleSignOut = async () => {
    try {
      await logout();
      console.log("Cierre de sesión exitoso");
      navigation.replace('Login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }

  };


  // go to settings
  const { RNAndroidOpenSettings } = NativeModules;
  const openAppPrefs = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings://notification/HealthApplication');
    } else {
      RNAndroidOpenSettings.generalSettings();
    }
  };

  /*
   * ****************
   * **** Screen ****
   * ****************
   */

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.post(`${API_URL}/users/userdata`,
            {
              // Token en el cuero de la solicitud
              token: `${token}`
            },
            {
              // Token de autoización en el header
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const userName = response.data.data.name;
          const userRut = response.data.data.rut;
          const userEmail = response.data.data.email;
          const userBirthdate = response.data.data.birthdate.split('T')[0];
          const userCarrera = response.data.data.carrera;

          // Actualiza el estado con el nombre
          setName(userName);
          setRut(userRut);
          setEmail(userEmail);
          setBirthdate(userBirthdate);
          setCarrera(userCarrera);

          // Para verificar en la consola
          console.log('User Name:', userName);
          console.log('User Rut:', userRut);
          console.log('User Email:', userEmail);
          console.log('User Birthdate:', userBirthdate);
          console.log('User Carrera:', userCarrera);

        } else {
          console.log('No se encontró el token. Por favor, inicia sesión.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

    };
    fetchUserData();
  }, []);


  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
      {/*
         * *********************
         * ***** Section 1 *****
         * *********************
         */}


      <View style={{ height: 225, alignItems: 'center' }}>
        <Text style={[GlobalStyle.welcomeText, { marginRight: 30 }]}>Mi Perfil</Text>
        <Text style={[GlobalStyle.subtitle]}></Text>
        <Icon name="user-circle" size={100} color="#000" />
      </View>

      {/*
         * *********************
         * ***** Section 2 *****
         * *********************
         */}
      <View style={GlobalStyle.rowTwo}>
        <View style={GlobalStyle.statsContainer}>
          <Text style={GlobalStyle.statsTitle}><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Nombre:</Text>  {name}</Text>
          <Text style={GlobalStyle.statsTitle}><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Rut:</Text>  {rut}</Text>
          <Text style={GlobalStyle.statsTitle}><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Email:</Text> {email}</Text>
          <Text style={GlobalStyle.statsTitle}><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Carrera:</Text> {carrera} </Text>
          <Text style={GlobalStyle.statsTitle}><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Fecha de nacimiento:</Text>  {birthdate}</Text>

        </View>

        <View style={{ marginTop: 20, paddingBottom: 50 }}>
          {/*  <SettingsButton
                text="WeBt"
                onPress={() => navigation.navigate('Counselling')}
              /> */}

          {/* <SettingsButton
                text="Counselling information" 
                onPress={() => navigation.navigate('Counselling')} 
              />*/}

          {/* <SettingsButton text="Notifications" onPress={() => navigation.navigate('Counselling')} /> */}
          {/*  <SettingsButton
                text="Privacy policy"
                 onPress={() => navigation.navigate('Notification')}
              /> */}

          <AuthButton
            onPress={handleSignOut}
            text="Cerrar sesión"
            iconName="log-out-outline"
            iconColor="#d85a77"
            buttonStyle={{ backgroundColor: '#f7d8e3' }}  // Color personalizado para cerrar sesión
            textStyle={{ color: '#d85a77' }}  // Personaliza el color del texto
          />

        </View>
      </View>

    </SafeAreaView>
  );
}

export default Settings;
