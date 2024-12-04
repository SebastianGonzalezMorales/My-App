// react imports
import { FlatList, Modal, SafeAreaView, Text, View, ScrollView, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Image, TouchableOpacity, Linking, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { fetchWithToken } from '../utils/apiHelpers';
import ChartStyle from '../../assets/styles/ChartStyle';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import FormStyle from '../../assets/styles/FormStyle';

// Import the API URL from environment variables
import { API_URL } from '@env';

// components
import CustomButton from '../../components/buttons/CustomButton';
import FormButton from '../../components/buttons/FormButton';
import HistoryButton from '../../components/buttons/HistoryButton';
import PickMoodButton from '../../components/buttons/PickMoodButton';
import StatsButton from '../../components/buttons/StatsButton';

import { PieChart } from 'react-native-chart-kit';

// customisation
import ModalStyle from '../../assets/styles/ModalStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mood = ({ navigation }) => {

  // states
  const [name, setName] = useState('');
  const [moods, setMoods] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [motivationalQuote, setMotivationalQuote] = useState('');

  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentMonth = new Date().getMonth(); // Mes actual (0 = enero, 11 = diciembre)
  const currentYear = new Date().getFullYear(); // Año actual


  // Llama a la función fetchData cuando la pantalla obtiene el enfoque
  useFocusEffect(
    useCallback(() => {
      fetchData();  // Llama a la función que recupera los datos
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moodData = await fetchWithToken('/moodState/get-MoodStatesByUserId');

        console.log('Datos recibidos de la API:', moodData);

        let mal = 0;
        let regular = 0;
        let bien = 0;
        let excelente = 0;

        moodData.data.forEach((moodEntry) => {
          const { mood_state, date } = moodEntry;

          const entryDate = new Date(date);
          const entryMonth = entryDate.getMonth(); // Extraer mes de la fecha
          const entryYear = entryDate.getFullYear(); // Extraer año de la fecha

          if (entryMonth === currentMonth && entryYear === currentYear) {
            console.log(`Estado de ánimo detectado (${entryDate}):`, mood_state);

            switch (mood_state) {
              case 'Mal':
                mal++;
                break;
              case 'Regular':
                regular++;
                break;
              case 'Bien':
                bien++;
                break;
              case 'Excelente':
                excelente++;
                break;
              default:
                console.log('Estado de ánimo desconocido:', mood_state);
                break;
            }
          }
        });

        // Configurar los datos del gráfico de torta
        const data = [
          { name: 'Mal', count: mal, color: '#d85a77', legendFontColor: '#7F7F7F', legendFontSize: 14 },
          { name: 'Regular', count: regular, color: '#238bdf', legendFontColor: '#7F7F7F', legendFontSize: 14 },
          { name: 'Bien', count: bien, color: '#109f5c', legendFontColor: '#7F7F7F', legendFontSize: 14 },
          { name: 'Excelente', count: excelente, color: '#cc8e62', legendFontColor: '#7F7F7F', legendFontSize: 14 },
        ];

        console.log('Datos procesados para el gráfico:', data);
        setPieChartData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los estados de ánimo:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  /*
   * *******************
   * **** Functions ****
   * *******************
   */

  // Function to open Instagram profiles
  const openInstagram = (url) => {
    Linking.openURL(url);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`; // Formato: DD/MM/YYYY
  };
  

  const startTracking = (mood, value) => {
    // Navegar a la pantalla `MoodTrack` pasando el estado de ánimo y la intensidad
    navigation.navigate('MoodTrack', {
      mood: mood,   // Estado de ánimo seleccionado
      value: value  // Valor de la intensidad del estado de ánimo
    });
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${API_URL}/moodState/get-MoodStatesByUserId`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.data.data.length === 0) {
          console.log('No se encontraron estados de ánimo para este usuario.');
        } else {
          // Ordenar los datos obtenidos por fecha en orden descendente
          const moodsData = response.data.data
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Orden descendente
            .map((item) => {
              const date = formatDate(item.date);
              const time = new Date(item.date).toLocaleTimeString();
  
              return {
                id: item._id,
                mood: item.mood_state,
                date,
                time,
              };
            });
  
          // Actualizar el estado con los estados de ánimo formateados y ordenados
          setMoods(moodsData);
        }
      } else {
        console.log('No se encontró el token. Por favor, inicia sesión.');
      }
    } catch (error) {
      console.error('Error al obtener los estados de ánimo:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  // delete document function
  const deleteItem = () => {
    if (selectedId) {

      console.log('Document', selectedId, 'has been deleted');
      setModalVisible(false);
    } else {
      console.log('Document not found');
    }
  };

  const fetchMotivationalQuote = async () => {
    try {
      // Recupera el token almacenado en AsyncStorage
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const response = await axios.get(`${API_URL}/phraseOfTheDay/get-random-phraseOfTheDay`, {
          headers: {
            'Authorization': `Bearer ${token}`  // Usa el token recuperado
          }
        });
        console.log(`token: ${token}`);
        const { mensaje, autor } = response.data;
        console.log(`Mensaje: ${mensaje}`);
        console.log(`Autor: ${autor}`);

        setMotivationalQuote(`${mensaje} - ${autor}`);
      } else {
        console.log('No se encontró el token. Por favor, inicia sesión.');
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  // Llama a la función en un useEffect para que se ejecute cuando el componente se monte
  useEffect(() => {
    fetchMotivationalQuote();
  }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.post(`${API_URL}/users/userdata`,
            {
              // Token en el cuero de la solicitud
              token: `${token}`
            },
            {
              // Token de autoización en el header
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const userName = response.data.data.name;

          // Actualiza el estado con el nombre
          setName(userName);
          // Para verificar en la consola
          //   console.log('User name:', userName);

        } else {
          console.log('No se encontró el token. Por favor, inicia sesión.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

    };
    fetchUserData();
  }, []);

  /*
   * ****************
   * **** Screen ****
   * ****************
   */

  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
      {/*
       * *****************
       * ***** Modal *****
       * *****************
       */}

      {/* info modal */}

      <Modal
        visible={infoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setInfoModalVisible(!infoModalVisible);
        }}
      >
        <View style={ModalStyle.smallModalContainer}>
          <View style={ModalStyle.smallModalContent}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={ModalStyle.smallModalTitle}>Tips</Text>
              <MaterialCommunityIcons
                name="close"
                color="#f2f2f2"
                size={30}
                style={ModalStyle.modalToggleExit}
                onPress={() => setInfoModalVisible(!infoModalVisible)}
              />
            </View>
            <Text style={ModalStyle.smallModalText}>
              1. 
            </Text>
            <Text style={ModalStyle.smallModalTextTwo}>
              2. 
            </Text>
          </View>
        </View>
      </Modal>

      {/* delete document modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={ModalStyle.halfModalContent}>
          <View style={ModalStyle.halfModalWrapper}>
            <FormButton
              text="Delete"
              onPress={() => {
                deleteItem(), setModalVisible(!modalVisible);
              }}
              buttonStyle={{
                backgroundColor: '#e55e7e',
              }}
              textStyle={{ color: '#f2f2f2' }}
            />

            <FormButton
              text="Cancel"
              onPress={() => setModalVisible(!modalVisible)}
              buttonStyle={{
                backgroundColor: '#5da5a9',
              }}
              textStyle={{ color: '#f2f2f2' }}
            />
          </View>
        </View>
      </Modal>

      {/*
       * *********************
       * ***** Section 1 *****
       * *********************
       */}
      {/* Espacio hasta la frase del día  */}
      <View style={{ height: 290 }}>
        <Text style={GlobalStyle.welcomeText}>Hola, {name}  !</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[GlobalStyle.subtitle, { textAlign: 'left' }]}> Cómo te sientes ahora mismo ?</Text>

          <MaterialCommunityIcons
            name="information"
            color="#f2f2f2"
            size={24}
            style={{ paddingTop: 28, paddingRight: 30 }}
            onPress={() => setInfoModalVisible(true)}
          />
        </View>
        <View style={GlobalStyle.moodsContainer}>
          <PickMoodButton onPress={() => startTracking('Mal', 1)}
            emoji="😞"
            text="Mal"
          />
          <PickMoodButton onPress={() => startTracking('Regular', 2)}
            emoji="🙂"
            text="Regular"
          />
          <PickMoodButton onPress={() => startTracking('Bien', 3)}
            emoji="😊"
            text="Bien"
          />
          <PickMoodButton
            onPress={() => startTracking('Excelente', 4)}
            emoji="😃"
            text="Excelente"
          />
          {/* Motivational Quote Section */}

        </View>
        <View style={{ marginTop: -10, alignItems: 'left', paddingHorizontal: 20 }}>
          <Text style={GlobalStyle.subtitle}>Frase del día: </Text>
          <Text style={[GlobalStyle.quoteText, { textAlign: 'left', marginTop: 10 }]}>
            {motivationalQuote}
          </Text>
        </View>
      </View>

      {/*
       * *********************
       * ***** Section 2 *****
       * *********************
       */}

      <View style={GlobalStyle.rowTwo}>
        <View style={GlobalStyle.statsContainer}>
    
          <HistoryButton
          onPress={() => navigation.navigate('MoodStats')}
           textLeft="Estadísticas del último mes"
          textRight="Ver detalles" />
       {/*    <StatsButton onPress={() => navigation.navigate('MoodStats')} /> */}
        </View>

        <View style={FormStyle.flexContainer}>
        {/*   <Text style={[FormStyle.title, { left: 30 }]}>Estadísticas del último mes</Text> */}
      </View>

      {loading ? (
        <Text>Cargando datos...</Text>
      ) : (
        <View style={ChartStyle.pieChartContainer}>
          <PieChart
            data={pieChartData}
            width={Dimensions.get('window').width * 0.85}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#f2f2f2',
              backgroundGradientTo: '#f2f2f2',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(93, 165, 169, ${opacity})`,
            }}
            accessor="count"
            backgroundColor="transparent"
            style={ChartStyle.pieChartStyle}
          />
        </View>
  )}

        <HistoryButton
          onPress={() => navigation.navigate('MoodHistory')}
          textLeft="Recientes"
          textRight="Ver todo"
        />
        <FlatList
          data={moods.slice(0, 5)}
          numColumns={1}
          renderItem={({ item }) => (
            <CustomButton
              buttonStyle={{
                backgroundColor:
                  item.mood === 'Mal'
                    ? '#f7d8e3'
                    : item.mood === 'Regular'
                      ? '#d8eef7'
                      : item.mood === 'Bien'
                        ? '#d8f7ea'
                        : '#f7e7d8',
              }}
              textStyle={{
                color:
                  item.mood === 'Mal'
                    ? '#d85a77'
                    : item.mood === 'Regular'
                      ? '#238bdf'
                      : item.mood === 'Bien'
                        ? '#109f5c'
                        : '#af7b56',
              }}
              // En lugar de mostrar texto, mostramos emojis
              title={
                item.mood === 'Mal'
                  ? '😞'
                  : item.mood === 'Regular'
                    ? '🙂'
                    : item.mood === 'Bien'
                      ? '😊'
                      : '😃' // Puedes añadir más casos si tienes más estados de ánimo
              }
              textOne={item.date}
              textTwo={item.time}
              onLongPress={() => (
                setModalVisible(true), setSelectedId(item.id) // set id as the document id
              )}
              onPress={() => {
                navigation.navigate('MoodDetails', { moodId: item.id });
              }}
            />
          )}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  storyImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Mood;
