import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer'; // Importar Buffer

// Customisation
import GlobalStyle from '../../../assets/styles/GlobalStyle';

// Components
import BackButton from '../../../components/buttons/BackButton';

// Importamos API_URL y BASE_URL desde las variables de entorno
import { API_URL, BASE_URL } from '@env';

const { width, height } = Dimensions.get('window'); // Obtener dimensiones

function AsistenteSocial({ navigation }) {
  const [assistant, setAssistant] = useState(null); // Para almacenar los datos del asistente social
  const [firstName, setFirstName] = useState(''); // Para almacenar solo el primer nombre del usuario
  const [imageData, setImageData] = useState(null); // Para almacenar los datos de la imagen en Base64

  // Función para obtener los datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.post(
            `${API_URL}/users/userdata`,
            { token: `${token}` },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const fullName = response.data.data.name;
          const firstName = fullName.split(' ')[0]; // Tomar solo el primer nombre
          setFirstName(firstName); // Actualizar el estado con el primer nombre
        } else {
          console.log('No se encontró el token. Por favor, inicia sesión.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Función para obtener los datos del asistente social y la imagen
  useEffect(() => {
    const fetchAssistantData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Obtener datos del asistente
          const response = await axios.get(
            `${API_URL}/assistants/Ingeniería Civil Informática`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const assistantData = response.data.assistant;

          // Reemplazar 'http://localhost:3001' con 'BASE_URL' en la URL de la imagen
          if (assistantData.imagen) {
            assistantData.imagen = assistantData.imagen.replace(
              'http://localhost:3001',
              BASE_URL
            );
          }

          setAssistant(assistantData); // Almacenar los datos del asistente

          // Obtener datos de la imagen con autenticación
          if (assistantData.imagen) {
            const imageResponse = await axios.get(assistantData.imagen, {
              headers: { Authorization: `Bearer ${token}` },
              responseType: 'arraybuffer',
            });

            const base64Image = `data:image/jpeg;base64,${Buffer.from(
              imageResponse.data,
              'binary'
            ).toString('base64')}`;

            setImageData(base64Image); // Almacenar los datos de la imagen en Base64
          }
        } else {
          console.log('No se encontró el token. Por favor, inicia sesión.');
        }
      } catch (error) {
        console.error('Error fetching assistant data or image:', error);
      }
    };

    fetchAssistantData();
  }, []);

  return (
    <SafeAreaView
      style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}
    >
      {/* Botón para regresar */}
      <BackButton onPress={() => navigation.goBack()} />

      {/* Sección superior azul */}
      <View
        style={{
          height: height * 0.32,
          padding: 10,
          backgroundColor: '#000C7B',
        }}
      >
        <Text style={GlobalStyle.welcomeText}>Espacio UV</Text>

        <Text
          style={[
            GlobalStyle.text,
            { textAlign: 'justify', color: '#FFFFFF' },
          ]}
        >
          Contactarse con Recursos UV
        </Text>
        <Text
          style={[
            GlobalStyle.text,
            { textAlign: 'justify', color: '#FFFFFF' },
          ]}
        >
          Asistente Social
        </Text>
         <Text
                  style={[
                    GlobalStyle.text,
                    { textAlign: 'justify', color: '#FFFFFF' },
                  ]}

  >
    {firstName
      ? `${firstName}, te presentamos a la asistente social asignada a tu carrera. Ella es tu primer contacto para recibir orientación y apoyo.`
      : 'Cargando...'}
  </Text>
      </View>

      {/* Contenedor principal */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {/* Frase personalizada */}

        {/* Información del asistente */}
        {assistant ? (
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: 10,
                padding: 15,
                marginBottom: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              {imageData ? (
                <Image
                  source={{ uri: imageData }}
                  style={{
                    width: '90%', // Reducir ligeramente el ancho
                    height: 250, // Reducir la altura
                    borderRadius: 10,
                    marginBottom: 10,
                    alignSelf: 'center', // Centrar la imagen
                  }}
                  onError={(error) =>
                    console.error(
                      'Error al cargar la imagen:',
                      error.nativeEvent.error
                    )
                  }
                  resizeMode="contain" // Asegurar que la imagen se adapte dentro del contenedor
                />

              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#999',
                    marginBottom: 10,
                  }}
                >
                  Cargando imagen...
                </Text>
              )}

              <Text
                style={{
                  fontSize: 14,
                  color: '#555',
                  textAlign: 'center',
                  marginBottom: 5,
                }}
              >
                {assistant.ubicacion}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: '#4CAF50',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    Linking.openURL(`tel:${assistant.phone}`);
                  }}
                >
                  <Text style={{ color: 'white' }}>Llamar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#2196F3',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    Linking.openURL(`mailto:${assistant.email}`);
                  }}
                >
                  <Text style={{ color: 'white' }}>Correo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : (
          <Text
            style={{
              textAlign: 'center',
              color: '#999',
              marginTop: 20,
            }}
          >
            Cargando datos...
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

export default AsistenteSocial;
