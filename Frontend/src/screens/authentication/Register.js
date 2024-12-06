// react imports
import { Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';



// Import the API URL from environment variables
import { API_URL } from '@env';

// components
import AuthButton from '../../components/buttons/AuthButton';
import SmallAuthButton from '../../components/buttons/SmallAuthButton';

// customisation
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthStyle from '../../assets/styles/AuthStyle';

import facultadesData from '../../assets/data/facultades.json'; // Importamos el archivo JSON con las facultades y carreras

const Register = ({ navigation }) => {

  // states
  const [fullName, setFullName] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [birthdate, setBirthdate] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [facultad, setFacultad] = useState('');
  const [carrera, setCarrera] = useState('');
  const [carrerasDisponibles, setCarrerasDisponibles] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+569 '); // Inicializa con el prefijo

  /*
   * *******************
   * **** Functions ****
   * *******************
   */

  // Función para manejar el cambio de facultad
  const handleFacultadChange = (selectedFacultad) => {
    setFacultad(selectedFacultad);
    setCarrerasDisponibles(facultadesData[selectedFacultad] || []);
    setCarrera(''); // Resetea carrera si cambia la facultad
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Oculta el selector de fecha

    if (selectedDate) {
      // Formatear la fecha como YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setBirthdate(formattedDate); // Guardar la fecha formateada
    }
  };

  const handlePhoneFocus = () => {
    if (!phoneNumber.startsWith('+569 ')) {
      setPhoneNumber('+569 '); // Agrega el prefijo al enfocar
    }
  };


  const handlePhoneNumberChange = (text) => {
    // Forzar el prefijo "+569 " al inicio
    if (!text.startsWith('+569 ')) {
      text = '+569 ';
    }
  
    // Permitir solo números después del prefijo
    let numbersOnly = text.slice(5).replace(/[^0-9]/g, '');
  
    // Limitar a 8 dígitos
    if (numbersOnly.length > 8) {
      numbersOnly = numbersOnly.slice(0, 8);
    }
  
    const formattedNumber = `+569 ${numbersOnly}`;
    console.log('Número actualizado correctamente:', formattedNumber); // Log adicional
    setPhoneNumber(formattedNumber);
  };
  
  /*
  * ***********************
  * **** Recuperación de AsyncStorage ****
  * ***********************
  */

  const handleBirthdateChange = (text) => {
    // Permitir solo números y guiones
    const validText = text.replace(/[^0-9\-]/g, '');

    // Aplicar formato YYYY-MM-DD de forma dinámica
    let formattedDate = '';
    const numbersOnly = validText.replace(/-/g, ''); // Eliminar guiones para contar caracteres

    if (numbersOnly.length > 0) {
      formattedDate += numbersOnly.substring(0, 4); // Añadir año
    }
    if (numbersOnly.length >= 5) {
      formattedDate += '-' + numbersOnly.substring(4, 6); // Añadir mes
    }
    if (numbersOnly.length >= 7) {
      formattedDate += '-' + numbersOnly.substring(6, 8); // Añadir día
    }

    // Actualizar el estado con el formato actual
    setBirthdate(formattedDate);

    // Solo hacer la validación cuando se haya ingresado una fecha completa
    if (formattedDate.length === 10) {
      const [year, month, day] = formattedDate.split('-').map(Number);

      // Validar el año (por ejemplo, debe ser un valor razonable)
      if (year < 1900 || year > new Date().getFullYear()) {
        console.log('Año inválido');
        return;
      }

      // Validar el mes (1 a 12)
      if (month < 1 || month > 12) {
        console.log('Mes inválido');
        return;
      }

      // Validar el día en función del mes y si el año es bisiesto
      const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (day < 1 || day > daysInMonth[month - 1]) {
        console.log('Día inválido');
        return;
      }

      // La fecha es válida
      console.log('Fecha válida');
    }
  };



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
    const trimmedText = text.trim();
    setPassword(trimmedText);
    if (!isStrongPassword(trimmedText)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo.');
    } else {
      setPasswordError('');
    }
  };
  


  // sign up function
  const handleSignUp = async (fullName, rut, email, facultad, carrera, birthdate, phoneNumber, password, confirmPassword) => {

    try {
      console.log(" ")
      console.log(fullName)
      console.log(rut)
      console.log(email)
      console.log(facultad)
      console.log(carrera)
      console.log(birthdate)
      console.log(phoneNumber)
      console.log(password)
      console.log(confirmPassword)
      console.log(" ")

      if (!/^\+569 \d{8}$/.test(phoneNumber.trim())) {
        console.log('Número de teléfono inválido (detalles):', phoneNumber.trim(), 'Longitud:', phoneNumber.trim().length);
        alert('Por favor, ingresa un número de celular válido con el formato +569 XXXXXXXX.');
        return;
      }
      


        if (!facultad || !carrera) {
           alert('Por favor, selecciona una facultad y una carrera.');
           return;
         } 

      // Verifica si se aceptó la política
      const accepted = await AsyncStorage.getItem('policyAccepted');
      console.log('Policy Accepted:', accepted); // Verificar en consola

      if (accepted !== 'true') {
        alert('Debes aceptar la política de privacidad para continuar.');
        return; // Detenemos el registro si no se aceptó la política
      }

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
      const trimmedPassword = password.trim();
      console.log("Hola")
      console.log(trimmedPassword)
      if (!isStrongPassword(trimmedPassword)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un símbolo.');
        return;
      }

      if (password !== confirmPassword) {
        alert("Contraseñas no coinciden");
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
        carrera: carrera,
        facultad: facultad,
        phoneNumber: phoneNumber.replace(' ', ''), // Elimina el espacio
        policyAccepted: accepted,
      };
      console.log('Datos enviados al backend:', userData);

      // Realizar la solicitud POST al backend
      const response = await axios.post(`${API_URL}/users/register`, userData);
      console.log('Datos enviados al backend:', userData);


      // Verificar la respuesta del servidor
      if (response.status === 201) {
        alert('Registro existoso, verifica tu cuenta ingresando a tu correo electrónico!');
        navigation.navigate('Login');
      } else {
        alert(`Registro fallido: ${response.data}`);
      }
    } catch (error) {
      // Manejo de errores
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un estado de error
        alert(`Error en el registro: ${error.response.data}`);
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        alert('No hay respuesta del servidor..');
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
              source={require('./../../assets/images/SlidesOnboarding/Icon_Application.png')}

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

          {/* Dropdown para Facultad */}
          <View style={[AuthStyle.inputContainer, { position: 'relative' }]}>
            <MaterialCommunityIcons
              name="domain"
              size={24}
              color="#5da5a9"
              style={AuthStyle.icon}
            />
            <Picker
              selectedValue={facultad}
              onValueChange={(itemValue) => handleFacultadChange(itemValue)}
              style={[
                AuthStyle.input,
                {
                  backgroundColor: 'transparent',
                  width: '87%', // Asegura que el Picker ocupe todo el espacio disponible
                  right: 16 // Ajusta este valor
                },
              ]}
              enabled={Object.keys(facultadesData).length > 0}
              dropdownIconColor="#92959f"
            >
              <Picker.Item label="Selecciona una facultad" value="" />
              {Object.keys(facultadesData).map((fac) => (
                <Picker.Item key={fac} label={fac} value={fac} />
              ))}
            </Picker>
          </View>




          {/* Dropdown para Carrera */}
          <View style={[AuthStyle.inputContainer, { position: 'relative' }]}>
            <MaterialCommunityIcons
              name="school-outline" // Ícono para Carrera
              size={24}
              color="#5da5a9" // Color celeste igual al resto
              style={AuthStyle.icon} // Usa el mismo estilo que los otros íconos
            />
            <Picker
              selectedValue={carrera}
              onValueChange={(itemValue) => setCarrera(itemValue)}
              style={[
                AuthStyle.input,
                {
                  backgroundColor: 'transparent',
                  width: '87%', // Asegura que el Picker ocupe todo el espacio disponible
                  right: 16, // Ajusta este valor
                },
              ]}
              enabled={carrerasDisponibles.length > 0} // Solo habilitado si hay carreras disponibles
              dropdownIconColor="#92959f" // Color de la flecha predeterminada
            >
              <Picker.Item label="Selecciona una carrera" value="" />
              {carrerasDisponibles.map((car) => (
                <Picker.Item key={car} label={car} value={car} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={AuthStyle.inputContainer} // Aplica los mismos estilos
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <MaterialCommunityIcons
                name="calendar-outline"
                size={24}
                style={AuthStyle.icon}
              />
              <TextInput
                value={birthdate}
                placeholder="Selecciona tu fecha de nacimiento"
                placeholderTextColor="#92959f"
                style={[AuthStyle.input, { flex: 1 }]} // Asegura que ocupe el ancho restante
                editable={false}
                pointerEvents="none"
              />
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthdate ? new Date(birthdate) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

<View style={AuthStyle.inputContainer}>
  <MaterialCommunityIcons
    name="phone-outline"
    size={24}
    style={AuthStyle.icon}
  />
  <TextInput
    value={phoneNumber} // Vincular al estado phoneNumber
    onChangeText={handlePhoneNumberChange} // Llamar a la función para actualizar el estado
    placeholder="Número de teléfono"
    placeholderTextColor="#92959f"
    selectionColor="#5da5a9"
    keyboardType="phone-pad" // Cambia el teclado a numérico
    maxLength={13} // Limitar a "+569 XXXXXXXX"
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
            onPress={() => handleSignUp(fullName, rut, email, facultad, carrera, birthdate, phoneNumber, password, confirmPassword)}
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
