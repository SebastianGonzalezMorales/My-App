// react imports
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Svg, { Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import AuthButton from '../../components/buttons/AuthButton';
import SmallAuthButton from '../../components/buttons/SmallAuthButton';


// customisation
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthStyle from '../../assets/styles/AuthStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ForgotPassword = ({ navigation }) => {
  // states
  const [email, setEmail] = useState('');

  /*
   * *******************
   * **** Functions ****
   * *******************
   */

// Función de recuperación de contraseña
const handlePasswordRecovery = async () => {
  try {
    // Convertir el correo electrónico a minúsculas
    const lowercaseEmail = email.toLowerCase();
    
    // Enviar la solicitud al backend
    const response = await axios.post('http://192.168.1.8:3000/api/v1/users/forgot-password', { email: lowercaseEmail });
    
    // Manejar la respuesta del backend
    if (response.data.success) {
      alert(response.data.message); // Mensaje de éxito del backend

      // Guardar el correo electrónico en AsyncStorage
      try {
        await AsyncStorage.setItem('resetPasswordEmail', lowercaseEmail);
        console.log('Correo electrónico guardado exitosamente en AsyncStorage');

      } catch (error) {
        console.error('Error al guardar en AsyncStorage:', error);
      }

      // Navegar a la pantalla de cambio de contraseña
      navigation.replace('ChangePassword');
    } else {
      alert(response.data.message || 'Error al enviar el enlace de recuperación.'); // Mensaje de error del backend
    }
  } catch (error) {
    // Manejo de errores del backend
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      alert(error.response.data.message || 'Error al enviar el enlace de recuperación. Por favor, intenta nuevamente.');
    } else {
      // Error en la configuración de la solicitud
      alert('Error inesperado: ' + error.message);
    }
    console.log('Error @handlePasswordRecovery:', error);
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
        {/* Background styling with SVG */}
        <View style={AuthStyle.rowOne}>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="10%" cy="30%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="30%" cy="50%" r="30" />
          </Svg>
          <SafeAreaView style={AuthStyle.logo}>
            <TouchableOpacity style={{ marginTop: 20 }}>
              <Image
                style={{ width: 100, height: 100 }}
                source={require('./../../../assets/salud-mental.png')}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Input and buttons */}
        <View style={AuthStyle.rowTwo}>
          <Text style={AuthStyle.title}>Recuperar Contraseña</Text>
          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              style={AuthStyle.icon}
            />
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              placeholder="Correo institucional"
              placeholderTextColor="#92959f"
              selectionColor="#5da5a9"
              style={AuthStyle.input}
            />
          </View>

          {/* Recover Password Button */}
          <AuthButton
            onPress={handlePasswordRecovery}
            text="Recuperar contraseña"
            iconName="lock-open"
            
           
           
          />

          <View style={AuthStyle.changeScreenContainer}>
            <Text style={AuthStyle.changeScreenText}>
              ¿Recordaste tu contraseña?
            </Text>
            <SmallAuthButton
              text="Iniciar sesión"
              onPress={() => navigation.replace('Login')}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;
