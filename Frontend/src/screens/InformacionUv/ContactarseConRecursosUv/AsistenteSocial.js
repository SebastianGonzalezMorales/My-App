import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { fetchWithToken } from '../../utils/apiHelpers';
import GlobalStyle from '../../../assets/styles/GlobalStyle';
import BackButton from '../../../components/buttons/BackButton';

const { height } = Dimensions.get('window'); // Obtener dimensiones

function AsistenteSocial({ navigation }) {
  const [assistant, setAssistant] = useState(null); // Estado para almacenar los datos del asistente
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Carrera hardcodeada temporalmente
  const carrera = 'Ingeniería Civil Informática';

  // Función para obtener datos del asistente social desde el backend
  const fetchAssistant = async () => {
    try {
      const response = await fetchWithToken(`/assistants/${carrera}`);
      if (response?.assistant) {
        setAssistant(response.assistant); // Guardar los datos del asistente en el estado
      } else {
        setError('No se encontró un asistente para esta carrera.');
      }
    } catch (err) {
      console.error('Error al obtener el asistente:', err);
      setError('Hubo un problema al cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  // Obtener los datos del asistente al montar el componente
  useEffect(() => {
    fetchAssistant();
  }, []);

  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
      {/* Botón para regresar */}
      <BackButton onPress={() => navigation.goBack()} />

      {/* Sección superior azul */}
      <View style={{ height: height * 0.20, padding: 10, backgroundColor: '#000C7B' }}>
        <Text style={GlobalStyle.welcomeText}>Espacio UV</Text>
        
        <Text style={[GlobalStyle.text, { textAlign: 'justify', color: '#FFFFFF' }]}>
        Contactarse con Recursos UV
        </Text>
        <Text style={[GlobalStyle.text, { textAlign: 'justify', color: '#FFFFFF' }]}>
          Asistentes Sociales
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
        {loading ? (
          <ActivityIndicator size="large" color="#000C7B" style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
            {/* Frase personalizada (opcional) */}
            <View
              style={{
                padding: 20,
                backgroundColor: '#F5F5F5',
                borderRadius: 10,
                marginBottom: 20,
                width: '100%',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'justify', color: '#333' }}>
                Sebastián, te presentamos a la asistente social asignada a tu carrera. Ella es tu
                primer contacto para recibir orientación y apoyo.
              </Text>
            </View>

            {/* Tarjeta del asistente */}
            <View
              style={{
                backgroundColor: '#F5F5F5',
                borderRadius: 10,
                padding: 15,
                marginBottom: 15,
                alignItems: 'center',
                width: '100%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Image
                source={{ uri: assistant.imagen }}
                style={{
                  width: 250, // Ajustar el ancho de la imagen
                  height: 250, // Ajustar la altura de la imagen
                  borderRadius: 20,
                  marginBottom: 20,
                }}
              />

              {/* Se elimina el texto redundante */}
              {/* Botones para contactar */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  width: '100%',
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#B2EBF2',
                    padding: 15,
                    borderRadius: 10,
                    marginHorizontal: 5,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    Linking.openURL(`tel:${assistant.phone}`);
                  }}
                >
                  <Text style={{ color: '#00796B', fontWeight: 'bold' }}>Llamar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#FFCDD2',
                    padding: 15,
                    borderRadius: 10,
                    marginHorizontal: 5,
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    Linking.openURL(`mailto:${assistant.email}`);
                  }}
                >
                  <Text style={{ color: '#C62828', fontWeight: 'bold' }}>Correo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

export default AsistenteSocial;
