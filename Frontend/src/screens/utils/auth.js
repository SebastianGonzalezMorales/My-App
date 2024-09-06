import AsyncStorage from '@react-native-async-storage/async-storage';
/* import axios from 'axios'; */

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

    // Verificar el token con el backend
   const response = await axios.get('http://localhost:3000/api/verifyToken', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 

    if (response.data.user) {
      setUser(response.data.user); // Actualizar el estado con el usuario autenticado
    } else {
      setUser(null); // Token inválido
    }
  } catch (error) {
    console.error('Error verificando la autenticación', error);
    setUser(null);
  } finally {
    setInitialising(false); // Finalizar la inicialización
    console.log("Finalizar la inicialización")
  }
};
