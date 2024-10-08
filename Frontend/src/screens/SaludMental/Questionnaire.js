// react imports
import { FlatList, Modal, SafeAreaView, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the API URL from environment variables
import { API_URL } from '@env';

// components
import CustomButton from '../../components/buttons/CustomButton';
import FormButton from '../../components/buttons/FormButton';
import HistoryButton from '../../components/buttons/HistoryButton';
import StatsButton from '../../components/buttons/StatsButton';
import CircularButton from '../../components/buttons/CircularButton';
import BackButton from '../../components/buttons/BackButton';

// customisation
import GestureRecognizer from 'react-native-swipe-gestures';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import ModalStyle from '../../assets/styles/ModalStyle';

function Questionnaire({ navigation }) {
/*   // references
  const userRef = firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid);

  const questionnaireRef = firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .collection('questionnaire');
 */
  // states
  const [results, setResults] = useState([]);
  const [lastTest, setLastTest] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [seeAllModalVisible, setSeeAllModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [visible, setVisble] = useState(false);

  /*
   * *******************
   * **** Functions ****
   * *******************
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
  
        if (!token) {
          console.error('No se encontró el token');
          return;
        }

        console.log(token)
        console.log(" ")
        
        // Llamada para obtener el userId basado en el token
        const userResponse = await axios.post(`${API_URL}/users/userid`, {
          token: `${token}`
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       
        const userId = userResponse.data.userId;
        
        console.log(userId)
        console.log(" ")
        if (!userId) {
          console.error('No se encontró userId en la respuesta');
          return;
        }
        console.log("hola")
  
        // Llamada para obtener los resultados del test por userId
        const response = await axios.post(`${API_URL}/resultsTests/get-resultsTestUser/${userId}`, {
          token: `${token}`
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("hola")
        console.log(response)
        // Asumiendo que la respuesta tiene la estructura adecuada
        const responseData = response.data; // Obtén los datos de la respuesta
        console.log(responseData)
  
        // Mapeo de los resultados del test
        const results = responseData.map((doc) => {
          const { severity, date, total } = doc;
          const dateData = date// Formatea la fecha si es necesario
          const totalScore = `${total}/27`;
  
          console.log('Gravedad:', severity);
          console.log('Fecha:', dateData);
          console.log('Puntuación total:', totalScore);
  
          return {
            id: doc._id, // Suponiendo que _id es el identificador del documento
            severity,
            dateData,
            totalScore,
          };
        });
  
        // Guardar los resultados en el estado
        setResults(results);
  
        // Guardar la fecha del último test si existen resultados
        if (results.length > 0) {
          setLastTest(results[0].dateData); // Guardar la fecha del último test
        }
      } catch (error) {
        console.error('Error al obtener los resultados:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchData(); // Llamar la función para obtener los datos
  }, []); // Se ejecuta solo al montar el componente
  

  // delete document function
  const deleteItem = () => {
    if (selectedId) {
      userRef.collection('questionnaire').doc(selectedId).delete();
      console.log('Document', selectedId, 'has been deleted');
      setModalVisible(false);
    } else {
      console.log('Document not found');
    } 
  };

  /*
   * ****************
   * **** Screen ****
   * ****************
   */ 

  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
         <BackButton onPress={() => navigation.goBack()} />
      {/*
       * ******************
       * ***** Modals *****
       * ******************
       */}

      {/* modal one - questionnaire history */}
      <GestureRecognizer onSwipeDown={() => setSeeAllModalVisible(false)}>
        <Modal visible={seeAllModalVisible} animationType="slide">
          <SafeAreaView style={ModalStyle.modalContent}>
            <View style={ModalStyle.headerWrapper}>
              <Text style={ModalStyle.modalTitle}>History</Text>
              <MaterialCommunityIcons
                name="close"
                color="#666a72"
                size={30}
                style={ModalStyle.modalToggleExit}
                onPress={() => setSeeAllModalVisible(false)}
              />
            </View>
            <View style={ModalStyle.flatlistWrapper}>
              <FlatList
                data={results}
                numColumns={1}
                renderItem={({ item }) => (
                  <CustomButton
                    buttonStyle={{
                      backgroundColor: '#d8eef7',
                    }}
                    textStyle={{ color: '#238bdf' }}
                    title={item.severity}
                    textOne={item.totalScore}
                    textTwo={item.dateData}
                    onLongPress={() => (
                      setModalVisible(true), setSelectedId(item.id)
                    )}
                    onPress={() => {
                      setSeeAllModalVisible(false);
                      navigation.navigate('ResultView', {
                        documentId: item.id,
                      });
                    }}
                  />
                )}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </GestureRecognizer>

      {/* modal two - delete document modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
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
      <View style={{ height: 290 }}>
        <Text style={GlobalStyle.welcomeText}>Test PHQ-9 </Text>
        <Text style={GlobalStyle.subtitle}>Test de depresión</Text>
        <Text style={[GlobalStyle.text, { textAlign: 'left' }]}>
        El cuestionario PHQ-9 es una herramienta que se utiliza para medir la gravedad de la depresión a 
        través de nueve preguntas. Ayuda a identificar a las personas que pueden requerir una evaluación 
        o tratamiento adicional para la depresión.
        </Text>
        <View style={GlobalStyle.line} />
        <Text style={[GlobalStyle.text, { textAlign: 'left' }]}>
        Última prueba realizada: {lastTest}
        </Text>
      </View>

      {/*
       * *********************
       * ***** Section 2 *****
       * *********************
       */}
      <View style={GlobalStyle.rowTwo}>
        <View style={GlobalStyle.statsContainer}>
          <Text style={GlobalStyle.statsTitle}>Estadísticas</Text>
          <StatsButton
            onPress={() => navigation.navigate('QuestionnaireStats')}
          />
        </View>

        <HistoryButton
          // onPress={() => setSeeAllModalVisible(true)}
          onPress={() => navigation.navigate('QuestionnaireHistory')}
          textLeft="Resultados"
          textRight="Ver todos"
        />
        <FlatList
          data={results.slice(0, 10)}
          numColumns={1}
          renderItem={({ item }) => (
            <CustomButton
              buttonStyle={{
                backgroundColor:
                  item.severity === 'Normal'
                    ? '#f7e7d8'
                    : item.severity === 'Leve'
                    ? '#d8f7ea'
                    : item.severity === 'Moderado'
                    ? '#d8eef7'
                    : item.severity === 'Moderadamente grave'
                    ? '#f7d8e3'
                    : '#f7d8e3',
              }}
              textStyle={{
                color:
                  item.severity === 'Normal'
                    ? '#af7b56'
                    : item.severity === 'Leve'
                    ? '#109f5c'
                    : item.severity === 'Moderado'
                    ? '#238bdf'
                    : item.severity === 'Moderadamente grave'
                    ? '#d85a77'
                    : '#d85a77',
              }}
              title={item.severity}
              textOne={item.dateData}
              textTwo={item.totalScore}
              onLongPress={() => (
                setModalVisible(true), setSelectedId(item.id)
              )}
              onPress={() => {
                navigation.navigate('ResultView', { documentId: item.id });
              }}
            />
          )}
        />

        {/* button */}
        <View style={GlobalStyle.circularButtonContainer}>
          <CircularButton
            onPress={() => navigation.navigate('Test')}
            setVisble={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Questionnaire;
