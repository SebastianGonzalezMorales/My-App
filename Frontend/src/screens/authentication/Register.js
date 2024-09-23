// react imports
import { Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
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

const Register = ({ navigation }) => {

  // states
  const [fullName, setFullName] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [birthdate, setBirthdate] = useState(''); 
  const [carrera, setCarrera] = useState(''); 
  const [passwordError, setPasswordError] = useState('');

  /*
   * *******************
   * **** Functions ****
   * *******************
   */

  const validateRut = (rut) => {
    
    // Remover puntos y guiones
    rut = rut.replace(/[^0-9kK]/g, '');
    if (rut.length < 2) {
      return false;
    }
    
    // Separar número y dígito verificador
    const rutBody = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    
    // Calcular el dígito verificador
    let sum = 0;
    let multiplier = 2;
    for (let i = rutBody.length - 1; i >= 0; i--) {
      sum += parseInt(rutBody.charAt(i)) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const calculatedDv = 11 - (sum % 11);
   
    // Convertir el dígito verificador calculado
    if (calculatedDv === 11) dv = '0';
    else if (calculatedDv === 10) dv = 'K';
    else dv = calculatedDv.toString();
  
    return dv === rut.slice(-1).toUpperCase();
  };


  const formatRut = (rut) => {
    // Elimina cualquier carácter que no sea un número, punto o guion
    let cleanRut = rut.replace(/[^0-9kK.-]/g, '');
  
    // Añade puntos y guion si no están presentes
    if (cleanRut.length > 1) {
      if (cleanRut.length > 2 && cleanRut[2] !== '.') {
        cleanRut = cleanRut.slice(0, 2) + '.' + cleanRut.slice(2);
      }
      if (cleanRut.length > 6 && cleanRut[6] !== '.') {
        cleanRut = cleanRut.slice(0, 6) + '.' + cleanRut.slice(6);
      }
      if (cleanRut.length > 10 && cleanRut[10] !== '-') {
        cleanRut = cleanRut.slice(0, 10) + '-' + cleanRut.slice(10);
      }
    }
  
    return cleanRut.toUpperCase(); // Devuelve el RUT formateado
  };


  const handleRutChange = (text) => {
    // Aplica formateo solo si el usuario está ingresando caracteres, no borrando
    if (text.length >= rut.length) {
      setRut(formatRut(text));
    } else {
      // Si el usuario está borrando, simplemente actualiza el estado sin formatear
      setRut(text);
    }
  };

    
  const validateEmail = (email) => {
    const uvEmailPattern = /^[a-zA-Z]+\.[a-zA-Z]+@alumnos\.uv\.cl$/;                    
    return uvEmailPattern.test(email);
  };


  const isStrongPassword = (password) => {
    // Verificar longitud mínima
    if (password.length < 8) return false;
  
    // Verificar si contiene al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) return false;
  
    // Verificar si contiene al menos una letra minúscula
    if (!/[a-z]/.test(password)) return false;
  
    // Verificar si contiene al menos un número
    if (!/[0-9]/.test(password)) return false;
  
    // Verificar si contiene al menos un símbolo
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  
    return true;
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!validatePassword(text)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo.');
    } else {
      setPasswordError('');
    }
  };



  // sign up function
  const handleSignUp = async (fullName, rut, email, password, confirmPassword, birthdate, carrera) => {
    try {
        console.log(fullName)
        console.log(rut)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        console.log(birthdate)
        console.log(carrera)

        // Verificar que todos los campos estén completos
   /*  if (!fullName || !rut || !email || !password || !confirmPassword || !birthdate || !carrera) {
      alert('Por favor, completa todos los campos.');
      return;
    } */

      // Validar el RUT
      if (!validateRut(rut)) {
        alert('RUT inválido. Por favor, verifica el RUT ingresado.');
        return;
      }

       // Validar el email
    if (!validateEmail(email)) {
      alert('Correo electrónico inválido. Debe seguir el formato nombre.apellido@alumnos.uv.cl.');
      return;
    }
   
    if (!isStrongPassword(password)) {
      alert('La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un símbolo.');
      return;
    }

      if (password !== confirmPassword) {
        alert("Passwords don't match.");
        return;
      }

    // Datos a enviar al backend
      const userData = {
        name: fullName,
        rut: rut,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        birthdate: birthdate,
        carrera: carrera
      };

       // Realizar la solicitud POST al backend
    const response = await axios.post('http://192.168.1.2:3000/api/v1/users/register', userData);
   
    // Verificar la respuesta del servidor
    if (response.status === 201) {
      alert('Registration successful!');
      navigation.navigate('Login');
    } else {
      alert(`Registration failed: ${response.data}`);
    }
  } catch (error) {
    // Manejo de errores
    if (error.response) {
      // La solicitud se realizó y el servidor respondió con un estado de error
      alert(`Registration failed: ${error.response.data}`);
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      alert('No response from server.');
    } else {
      // Algo salió mal al configurar la solicitud
      alert(`Error: ${error.message}`);
    }
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
        {/* section one */}
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
            {/* <Text style={AuthStyle.logoText}>Logo</Text> */}
            <Image
              style={{ width: 100, height: 100 }}
              source={require('./../../../assets/salud-mental.png')}
                                
            />
          </SafeAreaView>
        </View>
        {/* section two */}
        <View style={AuthStyle.rowTwo}>
          <Text style={AuthStyle.title}>Crea una cuenta</Text>
          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              style={AuthStyle.icon}
            />
            <TextInput
              onChangeText={(text) => setFullName(text)} // every time the text changes, we can set the email to that text (callback function)
              placeholder="Nombre"
              placeholderTextColor="#92959f"
              selectionColor="#5da5a9"
              style={AuthStyle.input}
            />
          </View>
          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              style={AuthStyle.icon}
            />
            <TextInput
              value={rut} // El valor es el RUT formateado
              onChangeText={handleRutChange} // Se maneja el cambio de texto con el formateador
              placeholder="Rut"
              placeholderTextColor="#92959f"
              selectionColor="#5da5a9"
              style={AuthStyle.input}
              keyboardType="numeric" // Cambia el teclado a numérico
              maxLength={12} // Máxima longitud del RUT formateado
            />
          </View>
          
          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={23}
              style={AuthStyle.icon}
            />
            <TextInput
              autoCapitalize="none"
              keyboardType="Email address"
              onChangeText={(text) => setEmail(text)} // every time the text changes, we can set the email to that text (callback function)
              placeholder="Correo institucional"
              placeholderTextColor="#92959f"
              selectionColor="#5da5a9"
              style={AuthStyle.input}
            />
          </View>
 
          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="school-outline"
              size={24}
              style={AuthStyle.icon}
            />
            <TextInput
              onChangeText={(text) => setCarrera(text)} // every time the text changes, we can set the email to that text (callback function)
              placeholder="Carrera"
              placeholderTextColor="#92959f"
              selectionColor="#5da5a9"
              style={AuthStyle.input}
            />
          </View>

          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="calendar-outline"
              size={24}
              style={AuthStyle.icon}
            />
            <TextInput
              onChangeText={(text) => setBirthdate(text)} // every time the text changes, we can set the email to that text (callback function)
              placeholder="Fecha de nacimiento"
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
              secureTextEntry={!showPassword}
              selectionColor="#5da5a9"
              style={AuthStyle.input}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={AuthStyle.showPasswordButton}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#92959f"
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={AuthStyle.errorText}>{passwordError}</Text>
          ) : null}

          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              style={AuthStyle.icon}
            />
            <TextInput
              onChangeText={(text) => setConfirmPassword(text)}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#92959f"
              secureTextEntry={!showPassword}
              selectionColor="#5da5a9"
              style={AuthStyle.input}
            />
                       {/*  Botón para mostrar/ocultar contraseña  */}
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

          <AuthButton
            text="Finalizar"
            onPress={() => handleSignUp(fullName, rut, email, password, confirmPassword, birthdate, carrera)}
          />

          <View style={AuthStyle.changeScreenContainer}>
            <Text style={AuthStyle.changeScreenText}>
              ¿Ya tienes una cuenta?
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

export default Register;
