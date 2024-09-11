// react imports
import {
    Linking,
    NativeModules,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    View,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  // firebase
 
  
  // components
  import CustomButton from '../../components/buttons/CustomButton';
  import SmallFormButton from '../../components/buttons/SmallFormButton';
  import SettingsButton from '../../components/buttons/SettingsButton';
  
  // customisation
  import GlobalStyle from '../../assets/styles/GlobalStyle';
  
  function Settings({ navigation }) {
    // references
  /*  const userRef = firebase
       .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid); */
  
    // states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    /*
     * *******************
     * **** Functions ****
     * *******************
     */
  
    // hook to fetch user's data
    useEffect(() => {
 /*      const fetchName = async () => {
        userRef.onSnapshot((snapshot) => {
          const { fullName, email } = snapshot.data();
          setName(fullName);
          setEmail(email);
        });
      }; 
      fetchName();*/
    }, []);
  
    // sign out function
    const handleSignOut = async () => {
      try {
        // Aquí puedes enviar una solicitud de logout a tu backend si es necesario
    /*     await fetch('http://tu-backend.com/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
 */
        // Eliminar el token del almacenamiento local
        await AsyncStorage.removeItem('token');
        
        // Redirigir al usuario a la pantalla de login
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
  
    return (
      <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
        {/*
         * *********************
         * ***** Section 1 *****
         * *********************
         */}
        <View style={{ height: 225, alignItems: 'center' }}>
          <Text style={[GlobalStyle.welcomeText]}>Mi Perfil</Text>
          <Text style={[GlobalStyle.subtitle]}> </Text>
          <Icon name="user-circle" size={100} color="#000" />
        </View>
  
        {/*
         * *********************
         * ***** Section 2 *****
         * *********************
         */}
        <View style={GlobalStyle.rowTwo}>
          <View style={GlobalStyle.statsContainer}>
            <Text style={GlobalStyle.statsTitle}>Nombre: </Text>  
            <Text style={GlobalStyle.statsTitle}>Rut: </Text>    
            <Text style={GlobalStyle.statsTitle}>Carrera: </Text>
            <Text style={GlobalStyle.statsTitle}>Fecha de nacimiento: </Text>    
            
          </View>
          <ScrollView>
            <View style={{ marginTop: 80 }}>
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
              <CustomButton
                buttonStyle={{
                  backgroundColor: '#f7d8e3',
                }}
                textStyle={{
                  color: '#d85a77',
                }}
                onPress={() => handleSignOut()}
                title="Cerrar sesión"
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
  
  export default Settings;
  