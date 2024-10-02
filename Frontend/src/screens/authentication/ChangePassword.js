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

const ChangePassword = ({ navigation }) => {
  // states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  /*
   * *******************
   * **** Functions ****
   * *******************
   */

  // Function to handle password change
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmZjNTQwYjNkNjI3NDYwYjcxYTc5YTgiLCJlbWFpbCI6InNlYmFzdGlhbi5nb256YWxlekBhbHVtbm9zLnV2LmNsIiwiaWF0IjoxNzI3ODI0OTk2LCJleHAiOjE3Mjc4Mjg1OTZ9.3hJJ3gzct5lmDasdc_lM2-vZ1lV-6XbpZpzTlanOQM4"
      /* const token = await AsyncStorage.getItem('token'); */
      console.log(token)
      console.log(newPassword)
      console.log(confirmPassword)
      const response = await axios.post(
        'http://192.168.1.8:3000/api/v1/users/change-password',
        {token, newPassword: newPassword, confirmPassword: confirmPassword },
        
      );
      alert('Contraseña cambiada exitosamente.');
      navigation.replace('Login');
    } catch (error) {
      alert('Error al cambiar la contraseña. Intenta nuevamente más tarde.');
      console.log('Error @handleChangePassword:', error.response?.data || error.message);

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
        {/* Section 1 */}
        <View style={AuthStyle.rowOne}>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="10%" cy="30%" r="25" />
          </Svg>
          <SafeAreaView style={AuthStyle.logo}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require('./../../../assets/salud-mental.png')}
            />
          </SafeAreaView>
        </View>

        {/* Section 2 */}
        <View style={AuthStyle.rowTwo}>
          <Text style={AuthStyle.title}>Cambiar contraseña</Text>

          {/* Nueva Contraseña */}
          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              style={AuthStyle.icon}
            />
            <TextInput
              placeholder="Nueva Contraseña"
              placeholderTextColor="#92959f"
              secureTextEntry={!showPassword}
              selectionColor="#5da5a9"
              style={AuthStyle.input}
              onChangeText={(text) => setNewPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={AuthStyle.showPasswordButton}
            >
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#92959f"
              />
            </TouchableOpacity>
          </View>

          {/* Confirmar Contraseña */}
          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              style={AuthStyle.icon}
            />
            <TextInput
              placeholder="Confirmar Contraseña"
              placeholderTextColor="#92959f"
              secureTextEntry={!showPassword}
              selectionColor="#5da5a9"
              style={AuthStyle.input}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={AuthStyle.showPasswordButton}
            >
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#92959f"
              />
            </TouchableOpacity>
          </View>

          {/* Cambiar Contraseña Button */}
          <AuthButton
            onPress={handleChangePassword}
            text="Cambiar contraseña"       
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

export default ChangePassword;
