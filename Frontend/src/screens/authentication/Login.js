// react imports
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Alert } from 'react-native';


import { AuthContext } from '../../context/AuthContext';

// Import the API URL from environment variables
import { API_URL } from '@env';

// components
import AuthButton from '../../components/buttons/AuthButton';
import SmallAuthButton from '../../components/buttons/SmallAuthButton';

// customisation
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthStyle from '../../assets/styles/AuthStyle';

const Login = ({ navigation }) => {

  const { login } = useContext(AuthContext);

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
      // Convertir el correo electrónico a minúsculas
      const lowercaseEmail = email.toLowerCase();
      const response = await axios.post(`${API_URL}/auth/login`, { email: lowercaseEmail, password });

      const { token } = response.data;
      await login(token);
      navigation.replace('Home');
      // Mostrar alerta de éxito
      Alert.alert(
        "Inicio de sesión exitoso",
        "¡Has iniciado sesión correctamente!",
        [
          {
            text: "OK",
            onPress: () => console.log("Usuario presionó OK al incio de sesión exitoso")
          }
        ]
      );
    } catch (error) {
      // Registra la respuesta completa del servidor para inspeccionar
      console.log('Error en login:', error.response?.data);

      // Si el backend devuelve { success: false, message: '...'}, podemos usar error.response.data.message
      const errorMessage = error.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales.";

      Alert.alert(
        "Error",
        errorMessage,
        [
          {
            text: "OK",
            onPress: () => console.log("Usuario presionó OK en el alerta de error")
          }
        ]
      );
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
                style={{ width: 130, height: 130 }}
                source={require('./../../assets/images/SlidesOnboarding/Icon_Application.png')}
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
              placeholder="Correo institucional"
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
              placeholder="Contraseña"
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
            onPress={() => {
              if (!email) {
                Alert.alert("Error", "Por favor, ingresa tu correo electrónico.");
                return;
              }
              if (!password) {
                Alert.alert("Error", "Por favor, ingresa tu contraseña.");
                return;
              }
              handleLogin(email, password);
            }}
            text="Ingresar"
            iconName="log-in"
          />


          <View style={AuthStyle.changeScreenContainer}>
            <Text style={AuthStyle.changeScreenText}>
              ¿Aún no tienes una cuenta?
            </Text>
            <SmallAuthButton
              text="Regístrate"
              onPress={() => navigation.replace('Register')}
            />
          </View>

          <View style={AuthStyle.changeScreenContainer}>
            <Text style={AuthStyle.changeScreenText}>
            </Text>
            <SmallAuthButton
              text="Olvidaste tu contraseña"
              onPress={() => navigation.replace('ForgotPassword')}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.replace('Onboarding')}>


            <Text>Conoce las funcionalidades</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
