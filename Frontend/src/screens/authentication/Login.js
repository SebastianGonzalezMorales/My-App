// react imports
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

// components
import AuthButton from '../../components/buttons/AuthButton';
import SmallAuthButton from '../../components/buttons/SmallAuthButton';


// customisation
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthStyle from '../../assets/styles/AuthStyle';

const Login = ({ navigation }) => {
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

    /*
   * *******************
   * **** Functions ****
   * *******************
   */

  // clear onboarding from asyncstorage
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (error) {
      console.log('Error @clearOnboarding', error);
    }
  };

  // Login function
  const handleLogin = async (email, password) => {
    try {
    //  await firebase.auth().signInWithEmailAndPassword(email, password);
      const response = await axios.post('http://192.168.1.3:3000/api/v1/users/login', { email, password });
       // Guarda el token en AsyncStorage
       await AsyncStorage.setItem('token', response.data.token);

       // Puedes usar también otros datos como el nombre o el email si lo necesitas
       console.log(response.data.name);  // Nombre del usuario logueado
       console.log(response.data.user);  // Email del usuario logueado

      navigation.replace('Home');
    } catch (error) {
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      console.log('Error @handleLogin:', error);
    }
  };

  
  /*
   * ****************
   * **** Screen ****
   * ****************
   */

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={AuthStyle.container}>
        {/*
         * *********************
         * ***** Section 1 *****
         * *********************
         */}
        <View style={AuthStyle.rowOne}>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="10%" cy="30%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="2%" cy="70%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="30%" cy="50%" r="30" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="25%" cy="95%" r="30" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="52%" cy="70%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="64%" cy="20%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="70%" cy="100%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="75%" cy="60%" r="30" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="95%" cy="35%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="100%" cy="85%" r="30" />
          </Svg>
          <SafeAreaView style={AuthStyle.logo}>
            <TouchableOpacity
              onPress={clearOnboarding}
              style={{ marginTop: 20 }}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={require('./../../../assets/salud-mental.png')}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        {/*
         * *********************
         * ***** Section 2 *****
         * *********************
         */}

        {/* inputs */}
        <View style={AuthStyle.rowTwo}>
          <Text style={AuthStyle.title}>Iniciar sesión</Text>
          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              style={AuthStyle.icon}
            />
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)} // every time the text changes, we can set the email to that text (callback function)
              placeholder="Email address"
              placeholderTextColor="#92959f"
              selectionColor="#5da5a9"
              style={AuthStyle.input}
            />
          </View>
          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="lock-open-outline"
              size={24}
              style={AuthStyle.icon}
            />
                <TextInput
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderTextColor="#92959f"
              secureTextEntry={!showPassword} // Cambia entre mostrar/ocultar la contraseña
              selectionColor="#5da5a9"
              style={AuthStyle.input}
            />
            {/* Botón para mostrar/ocultar contraseña */}
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={AuthStyle.showPasswordButton}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye-off-outline" : "eye-outline"} // Cambia el ícono
                size={24}
                color="#92959f"
              />
            </TouchableOpacity>
          </View>

          {/* buttons */}
          <AuthButton
            text="Ingresar"
            onPress={() => handleLogin(email, password)}
          />

          <View style={AuthStyle.changeScreenContainer}>
            <Text style={AuthStyle.changeScreenText}>
            ¿Aún tienes una cuenta?
            </Text>
            <SmallAuthButton
              text="Regístrate"
              onPress={() => navigation.replace('Register')}
            />
          </View>
        
          <TouchableOpacity onPress={clearOnboarding} style={{ marginTop: 20 }}>
            <Text>Clear onboarding</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
