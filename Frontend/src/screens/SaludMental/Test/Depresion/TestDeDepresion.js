// react imports
import { FlatList, Modal, SafeAreaView, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect

// Import the API URL from environment variables
import { API_URL } from '@env';

// components
import CustomButton from '../../../../components/buttons/CustomButton';
import FormButton from '../../../../components/buttons/FormButton';
import HistoryButton from '../../../../components/buttons/HistoryButton';
import StatsButton from '../../../../components/buttons/StatsButton';
import CircularButton from '../../../../components/buttons/CircularButton';
import BackButton from '../../../../components/buttons/BackButton';

// customisation
import GestureRecognizer from 'react-native-swipe-gestures';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyle from '../../../../assets/styles/GlobalStyle';
import ModalStyle from '../../../../assets/styles/ModalStyle';

function TestDeDepresion({ navigation }) {

  // states
  const [results, setResults] = useState([]);
  const [lastTest, setLastTest] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [seeAllModalVisible, setSeeAllModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [visible, setVisble] = useState(false);

  const [graveCount, setGraveCount] = useState(0);  // Estado para contar los resultados graves

  /*
   * *******************
   * **** Functions ****
   * *******************
   */

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`; // Formato: DD/MM/YYYY
  };
  

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            console.error('No se encontró el token');
            return;
          }

          const userResponse = await axios.post(
            `${API_URL}/users/userid`,
            { token: `${token}` },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const userId = userResponse.data.userId;
          if (!userId) {
            console.error('No se encontró userId en la respuesta');
            return;
          }

          const response = await axios.post(
            `${API_URL}/resultsTests/get-resultsTestUser/${userId}`,
            { token: `${token}` },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          let responseData = response.data;

          // Ordenar los resultados por fecha en orden descendente
          responseData.sort((a, b) => new Date(b.created) - new Date(a.created));

          const results = responseData.map((doc) => {
            const { severity, created, total } = doc;
            return {
              id: doc._id,
              severity,
              dateData: formatDate(created),
              totalScore: `${total}/27`,
            };
          });

          // Contar cuántos resultados tienen severidad "Grave"
          const graveResults = results.filter(
            (result) => result.severity === 'Grave'
          );
          setGraveCount(graveResults.length);

          setResults(results);

          if (results.length > 0) {
            setLastTest(results[0].dateData);
          }
        } catch (error) {
          console.error(
            'Error al obtener los resultados:',
            error.response ? error.response.data : error.message
          );
        }
      };

      fetchData();
    }, []) // Se ejecuta cada vez que la pantalla tiene foco
  );


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

{/* Mostrar alerta si tiene 4 o más resultados graves */}
{/* Mostrar alerta si tiene 4 o más resultados graves */}
{/* Mostrar alerta si tiene 4 o más resultados graves */}
{graveCount >= 20 && (
  <View style={{ 
    padding: 15, 
    backgroundColor: '#fff3e0',  // Fondo claro
    borderRadius: 12, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ffd699',  // Borde rojo claro
  }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <MaterialCommunityIcons 
        name="alert-circle-outline" 
        size={16}  
        color="#e53935"  // Rojo más prominente
        style={{ marginRight: 8 }}
      />
      <Text style={{ 
        color: '#e53935',  // Título en rojo
        fontWeight: 'bold', 
        fontSize: 16, 
        lineHeight: 22,  
        flex: 1 
      }}>
        Atención
      </Text>
      <MaterialCommunityIcons 
        name="close" 
        size={16}  
        color="#e53935"  // Color rojo
        onPress={() => setGraveCount(0)}  // Oculta el mensaje al presionar
      />
    </View>

    <Text style={{ 
      color: '#e53935',  // Texto principal en rojo
      fontSize: 15,  
      lineHeight: 22,  
      textAlign: 'justify', 
      marginTop: 8,
      fontWeight: 'bold'
    }}>
      Hemos detectado que podrías estar atravesando una situación difícil.
    </Text>
    
    <Text style={{ 
      color: '#333',  // Texto secundario en negro
      fontSize: 14,  
      lineHeight: 22,  
      textAlign: 'justify', 
      marginTop: 5
    }}>
      Por favor, envíanos un correo a <Text style={{ fontWeight: 'bold' }}>dae@uv.cl</Text>, indicando tu teléfono. También puedes llamarnos o escribirnos un WhatsApp al +569 68301655 de Lunes a Viernes de 8:30 a 17:30 horas.
    </Text>
  </View>
)}



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
        <Text style={[GlobalStyle.text, { textAlign: 'justify' }]}>
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
            onPress={() => navigation.navigate('TestDepresionEstadisticas')}
          />
        </View>

        <HistoryButton
          // onPress={() => setSeeAllModalVisible(true)}
          onPress={() => navigation.navigate('TestDepresionHistorial')}
          textLeft="Resultados"
          textRight="Ver todos"
        />
        <FlatList
  data={results.slice(0, 10)} // Mostrar solo los primeros 10 resultados
  numColumns={1}
  renderItem={({ item }) => (
    <CustomButton
      buttonStyle={{
        backgroundColor:
          item.severity === 'Normal'
            ? '#fdf3e4'
            : item.severity === 'Leve'
            ? '#e4f7f1'
            : item.severity === 'Moderado'
            ? '#e4eff7'
            : item.severity === 'Moderadamente grave'
            ? '#f7e4eb'
            : '#f7d8e3', // Colores para cada tipo de severidad
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
      }}
      onPress={() => {
        navigation.navigate('ResultView', { documentId: item.id });
      }}
      title={item.severity} // Pasar la severidad
      textOne={item.dateData} // Pasar la fecha
      textTwo={item.totalScore} // Pasar el puntaje
      textStyle={{ color: '#af7b56' }} // Estilos del texto
    />
  )}
/>


        {/* button */}
        <View style={GlobalStyle.circularButtonContainer}>
          <CircularButton
            onPress={() => navigation.navigate('TestDepresion')}
            setVisble={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default TestDeDepresion;
