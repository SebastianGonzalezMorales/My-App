// react imports
import { FlatList, Modal, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

// Import the API URL from environment variables
import { API_URL } from '@env';

// components
import CustomButton from '../../components/buttons/CustomButton';
import FormButton from '../../components/buttons/FormButton';
import HistoryButton from '../../components/buttons/HistoryButton';
import PickMoodButton from '../../components/buttons/PickMoodButton';
import StatsButton from '../../components/buttons/StatsButton';

// customisation
import GlobalStyle from '../../assets/styles/GlobalStyle';
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
  /*
   * *******************
   * **** Functions ****
   * *******************
   */

  // Function to open Instagram profiles
  const openInstagram = (url) => {
    Linking.openURL(url);
  };

  // transfer document id to the next screen
  const startTracking = async (mood, value) => {
    const selectedMood = userRef.collection('mood').doc();
    // store id of document into documentId
    const documentId = selectedMood.id;
    await selectedMood.set({
      mood,
      value,
    });

    /* // pass the documentId to the following page
    navigation.navigate('TrackMood', { documentId }); */

    // delay promise execution
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('New document created');
  };

  // hook to fetch user's data
  /*  useEffect(() => {
     const fetchName = async () => {
       userRef.onSnapshot((snapshot) => {
         const { fullName } = snapshot.data();
         const firstName = fullName.split(' ')[0];
         setName(firstName);
       });
     };
     fetchName();
   }, []);
  */
  // hook to fetch all documents
  useEffect(() => {
    const fetchData = async () => {
      /*       // onSnapshot method to listen to real time updates
            moodRef.orderBy('created', 'desc').onSnapshot((querySnapshot) => {
              const moods = [];
              querySnapshot.forEach((doc) => {
                const { mood, created } = doc.data();
                const date = created.toDate().toString().slice(4, 10);
                const time = created.toDate().toString().slice(16, 21);
                moods.push({
                  id: doc.id, // document id
                  mood,
                  date,
                  time,
                });
              });
              setMoods(moods);
            }); */
    };

    fetchData(); // call the async function to fetch data
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
        const response = await axios.get(`${API_URL}/tips/get-random-tips`, {
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
          console.log('User name:', userName);

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
      <ScrollView>
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
                1. Tap on a mood to start tracking!
              </Text>
              <Text style={ModalStyle.smallModalTextTwo}>
                2. Tap and hold to delete an entry
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
        <View style={{ height: 301 }}>
          <Text style={GlobalStyle.welcomeText}>Hola, {name} 😀 !</Text>
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
          <Text style={[GlobalStyle.titleWhite, { textAlign: 'left' }]}>Novedades UV</Text>
          <Text style={[GlobalStyle.subtitleBlack, { textAlign: 'left' }]}>
            Mantente informado sobre los eventos de la UV a través de nuestras redes sociales.
          </Text>
          {/* Sección Vida Estudiantil y Apoyo */}
          <Text style={[GlobalStyle.titleWhite, { textAlign: 'left' }]}>Vida Estudiantil y Apoyo</Text>
          <View style={styles.storiesContainer}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => openInstagram('https://www.instagram.com/daeuvalpo/')}>
                <View style={GlobalStyle.outerContainer}>
                  <Image
                    source={require('./../../../assets/Instagram/DaeUV.jpeg')}
                    style={GlobalStyle.storyImage}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openInstagram('https://www.instagram.com/buentratoyconvivenciauv/')}>
                <View style={GlobalStyle.outerContainer}>
                  <Image
                    source={require('./../../../assets/Instagram/BuenTratoYConvivenciaUV.jpeg')}
                    style={GlobalStyle.storyImage}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity onPress={() => openInstagram('https://www.instagram.com/conectadosuv_dae/')}>
                <View style={GlobalStyle.outerContainer}>
                  <Image
                    source={require('./../../../assets/Instagram/ConectadosUV1.png')}
                    style={GlobalStyle.storyImage}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openInstagram('https://www.instagram.com/viveuv.saludable/')}>
                <View style={GlobalStyle.outerContainer}>
                  <Image
                    source={require('./../../../assets/Instagram/ViveUVSaludable.png')}
                    style={GlobalStyle.storyImage}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sección Institucional y Universitario */}
          <Text style={GlobalStyle.titleWhite}>Institucional y Universitario</Text>
          <View style={styles.storiesContainer}>
            <TouchableOpacity onPress={() => openInstagram('https://www.instagram.com/uvalpochile/')}>
              <View style={GlobalStyle.outerContainer}>

                <Image
                  source={require('./../../../assets/Instagram/UValpoChile.jpeg')}
                  style={GlobalStyle.storyImage}
                />

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openInstagram('https://www.instagram.com/federacionuv/')}>
              <View style={GlobalStyle.outerContainer}>

                <Image
                  source={require('./../../../assets/Instagram/FeUV.png')}
                  style={GlobalStyle.storyImage}
                />

              </View>
            </TouchableOpacity>
          </View>
          {/* Sección Deporte y Recreación */}
          <Text style={GlobalStyle.titleWhite}>Deporte y Recreación</Text>
          <View style={styles.storiesContainer}>
            <TouchableOpacity onPress={() => openInstagram('https://www.instagram.com/deportesyrecreacionuv/?hl=es')}>
              <View style={GlobalStyle.outerContainer}>

                <Image
                  source={require('./../../../assets/Instagram/Druv.jpeg')}
                  style={GlobalStyle.storyImage}
                />

              </View>
            </TouchableOpacity>
          </View>
          {/* Sección Ciencia y Conocimiento */}
          <Text style={GlobalStyle.titleWhite}>Ciencia y Conocimiento</Text>
          <View style={styles.storiesContainer}>
            <TouchableOpacity onPress={() => openInstagram('https://www.instagram.com/cienciaabiertauv/')}>
              <View style={GlobalStyle.outerContainer}>

                <Image
                  source={require('./../../../assets/Instagram/CienciaAbiertaUV.jpeg')}
                  style={GlobalStyle.storyImage}
                />

              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
