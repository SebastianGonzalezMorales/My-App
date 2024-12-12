import { FlatList, Modal, SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import { API_URL } from '@env'; // Ajusta esto según tu entorno

import CustomButton from '../../../../components/buttons/CustomButton';
import FormButton from '../../../../components/buttons/FormButton';
import HistoryButton from '../../../../components/buttons/HistoryButton';
import StatsButton from '../../../../components/buttons/StatsButton';
import CircularButton from '../../../../components/buttons/CircularButton';
import BackButton from '../../../../components/buttons/BackButton';

import GestureRecognizer from 'react-native-swipe-gestures';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyle from '../../../../assets/styles/GlobalStyle';
import ModalStyle from '../../../../assets/styles/ModalStyle';

function TestDeDepresion({ navigation }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [results, setResults] = useState([]);
  const [lastTest, setLastTest] = useState('Cargando...');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [seeAllModalVisible, setSeeAllModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [graveCount, setGraveCount] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const checkTooltip = async (noResults) => {
    // Verificar si ya se mostró el tooltip
    const shown = await AsyncStorage.getItem('shownTooltip');
    if (!shown && noResults) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  };

  const storeTooltipShown = async () => {
    await AsyncStorage.setItem('shownTooltip', 'true');
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            console.error('No se encontró el token');
            return;
          }

          const userResponse = await axios.post(
            `${API_URL}/tokens/userid`,
            { token: `${token}` },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const userId = userResponse.data.userId;
          if (!userId) {
            console.error('No se encontró userId');
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

          const responseData = response.data.results || [];
          responseData.sort((a, b) => new Date(b.created) - new Date(a.created));

          const fetchedResults = responseData.map((doc) => {
            const { severity, created, total } = doc;
            return {
              id: doc._id,
              severity,
              dateData: formatDate(created),
              totalScore: `${total}/27`,
            };
          });

          const graveResults = fetchedResults.filter(
            (result) => result.severity === 'Grave'
          );
          setGraveCount(graveResults.length);
          setResults(fetchedResults);

          if (fetchedResults.length > 0) {
            setLastTest(fetchedResults[0].dateData);
          } else {
            setLastTest('Sin resultados previos');
          }

          await checkTooltip(fetchedResults.length === 0);

        } catch (error) {
          console.error(
            'Error al obtener los resultados:',
            error.response ? error.response.data : error.message
          );
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, [])
  );

  // Eliminar el useEffect que manejaba el temporizador

  // Función para reiniciar el tooltip sin borrar todo el AsyncStorage
  const resetTooltip = async () => {
    await AsyncStorage.removeItem('shownTooltip');
    // Si no hay tests, se puede volver a mostrar el tooltip
    if (results.length === 0) {
      setShowTooltip(true);
    }
  };

  // Función para eliminar un item (necesitas implementar esta función)
  const deleteItem = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token');
        return;
      }

      await axios.delete(
        `${API_URL}/resultsTests/delete/${selectedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Actualizar la lista de resultados después de eliminar
      setResults(results.filter(item => item.id !== selectedId));
      setGraveCount(graveCount - 1);
    } catch (error) {
      console.error('Error al eliminar el item:', error);
    }
  };

  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
      <BackButton onPress={() => navigation.goBack()} />

      {graveCount >= 1 && (
        <View style={{
          padding: 15,
          backgroundColor: '#fff3e0',
          borderRadius: 12,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: '#ffd699',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={16}
              color="#e53935"
              style={{ marginRight: 8 }}
            />
            <Text style={{
              color: '#e53935',
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
              color="#e53935"
              onPress={() => setGraveCount(0)}
            />
          </View>

          <Text style={{
            color: '#e53935',
            fontSize: 15,
            lineHeight: 22,
            textAlign: 'justify',
            marginTop: 8,
            fontWeight: 'bold'
          }}>
            Hemos detectado que podrías estar atravesando una situación difícil.
          </Text>

          <Text style={{
            color: '#333',
            fontSize: 14,
            lineHeight: 22,
            textAlign: 'justify',
            marginTop: 5
          }}>
            Por favor, envíanos un correo a <Text style={{ fontWeight: 'bold' }}>dae@uv.cl</Text>, indicando tu teléfono. También puedes llamarnos o escribirnos un WhatsApp al +569 68301655 de Lunes a Viernes de 8:30 a 17:30 horas.
          </Text>
        </View>
      )}

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

      <View style={{ height: 290 }}>
        <Text style={GlobalStyle.welcomeText}>Test PHQ-9</Text>
        <Text style={GlobalStyle.subtitle}>Test de depresión</Text>
        <Text style={[GlobalStyle.text, { textAlign: 'justify' }]}>
          El cuestionario PHQ-9 es una herramienta que se utiliza para medir la gravedad de la depresión a
          través de nueve preguntas. Ayuda a identificar a las personas que pueden requerir una evaluación
          o tratamiento adicional para la depresión.
        </Text>
        <View style={GlobalStyle.line} />
        <Text style={[GlobalStyle.text, { textAlign: 'left' }]}>
          Última prueba realizada: {isLoading ? 'Cargando...' : lastTest}
        </Text>
      </View>

      <View style={GlobalStyle.rowTwo}>
        <View style={GlobalStyle.statsContainer}>
          <Text style={GlobalStyle.statsTitle}>Estadísticas</Text>
          <StatsButton
            onPress={() => navigation.navigate('TestDepresionEstadisticas')}
          />
        </View>

        <HistoryButton
          onPress={() => navigation.navigate('TestDepresionHistorial')}
          textLeft="Resultados"
          textRight="Ver todos"
        />
        {isLoading ? (
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
            Cargando resultados...
          </Text>
        ) : results.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
            Aún no has realizado ningún test. Completa un test para ver tus resultados.
          </Text>
        ) : (
          <FlatList
            data={results.slice(0, 10)}
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
                            : '#f7d8e3',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  navigation.navigate('ResultView', { documentId: item.id });
                }}
                title={item.severity}
                textOne={item.dateData}
                textTwo={item.totalScore}
                textStyle={{ color: '#af7b56' }}
              />
            )}
          />
        )}
      </View>

      {showTooltip && results.length === 0 && (
        <View style={styles.tooltipContainer}>
          <Text style={styles.tooltipTextStyle}>
            ¡Pulsa aquí para iniciar tu primer test!
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowTooltip(false);
              storeTooltipShown();
            }}
            style={styles.tooltipButton}
          >
            <Text style={styles.tooltipButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
{/* Flecha animada hacia el botón "+" */}
{showTooltip && (
  <Animatable.View
    animation="bounce" // Animación de rebote
    easing="ease-in-out"
    iterationCount="infinite" // Repetición infinita
    style={styles.arrowContainer}
  >
    <MaterialCommunityIcons name="arrow-down" size={30} color="#9F8758" />
  </Animatable.View>
)}
      <Animatable.View
        animation="pulse"
        easing="ease-in-out"
        duration={800} // Duración
        iterationCount="infinite"
        style={styles.floatingButtonContainer}
      >
        <CircularButton
          onPress={async () => {
            setShowTooltip(false);
            await storeTooltipShown();
            navigation.navigate('TestDepresion'); 
          }}
          setVisble={false}
        />
      </Animatable.View>

      {/* Botón para reiniciar el tooltip */}
{/*       <View style={{ position: 'absolute', top: 100, right: 20 }}>
        <TouchableOpacity
          onPress={resetTooltip}
          style={{ backgroundColor: '#ddd', padding: 10, borderRadius: 5 }}
        >
          <Text>Reset Tooltip</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#FFF', // Fondo blanco opaco
    padding: 10, // Añadir espacio interno
    borderRadius: 50, // Redondear el contenedor si es necesario
    elevation: 5, // Agregar sombra (en Android)
    shadowColor: '#000', // Configurar sombras (en iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  
  tooltipContainer: {
    position: 'absolute',
    bottom: '15%', // Proporcional al alto de la pantalla
    right: '10%', // Proporcional al ancho de la pantalla
    width: '40%', // Relativo al ancho de la pantalla
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco semitransparente
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  
  tooltipTextStyle: {
    color: '#888',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },
  
  tooltipButton: {
    backgroundColor: '#9F8758',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  
  tooltipButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

    arrowContainer: {
      position: 'absolute',
      bottom: 115, // Ajusta esta distancia para que quede justo sobre el botón
      right: 50, // Ajusta según la posición del botón "+",
      alignItems: 'center',
      justifyContent: 'center',

  },
  
});

export default TestDeDepresion;
