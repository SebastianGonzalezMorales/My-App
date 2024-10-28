import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const fetchWithToken = async (endpoint, method = 'GET', data = null, params = null) => {
  try {
    // Obtener el token desde AsyncStorage
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token. Por favor, inicia sesión.');
    }

    // Configuración de la solicitud
    const config = {
      method,
      url: `${API_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...(params && { params }), // Agregar parámetros si existen
      ...(data && { data }),     // Agregar body si existe
    };

    // Realizar la solicitud
    const response = await axios(config);

    // Devolver la respuesta
    return response.data;

  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    throw error; // Lanza el error para que el componente que llame a la función pueda manejarlo
  }
};
