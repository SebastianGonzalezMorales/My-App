import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Import the API URL from environment variables
import { API_URL } from '@env';

// Guardar el token JWT en AsyncStorage
 export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error guardando el token', error);
  }
}; 

// Verificar el estado de autenticación del usuario
export const onAuthStateChanged = async (setUser, setInitialising) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      setUser(null);
      setInitialising(false);
      console.log("verificando")
      return;
    }


    console.log(token)
    // Verificar el token con el backen
   const response = await axios.get(`${API_URL}/users/verifyToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 

    if (response.data.message === 'Token válido') {
      console.log(response.data.message)
      setUser(true); // El token es  válido, el usuario está autenticado
    } else {
      setUser(null); // Token inválido, no está autenticado
    }
  } catch (error) {
    console.log('Error verificando la autenticación', error);
    setUser(null);
  } finally {
    setInitialising(false); // Finalizar la inicialización
    console.log("Finalizar la inicialización")
  }
};
