import { FlatList, Modal, SafeAreaView, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';

// componentes
import CustomButton from '../../../components/buttons/CustomButton';
import FormButton from '../../../components/buttons/FormButton';
import HistoryButton from '../../../components/buttons/HistoryButton';
import StatsButton from '../../../components/buttons/StatsButton';
import CircularButton from '../../../components/buttons/CircularButton';
import BackButton from '../../../components/buttons/BackButton';

// personalización
import GestureRecognizer from 'react-native-swipe-gestures';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyle from '../../../assets/styles/GlobalStyle';
import ModalStyle from '../../../assets/styles/ModalStyle';

function Questionnaire({ navigation }) {
  // estados
  const [results, setResults] = useState([]);
  const [lastTest, setLastTest] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [seeAllModalVisible, setSeeAllModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [visible, setVisble] = useState(false);
  const [graveCount, setGraveCount] = useState(0); // Estado para contar los resultados graves

  /*
   * ****************
   * **** Pantalla ****
   * ****************
   */
  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
      <BackButton onPress={() => navigation.goBack()} />

      {/* Mostrar alerta si tiene 4 o más resultados graves */}
      {graveCount >= 20 && (
        <View
          style={{
            padding: 15,
            backgroundColor: '#fff3e0', // Fondo claro
            borderRadius: 12,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: '#ffd699', // Borde rojo claro
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={16}
              color="#e53935" // Rojo más prominente
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color: '#e53935', // Título en rojo
                fontWeight: 'bold',
                fontSize: 16,
                lineHeight: 22,
                flex: 1,
              }}
            >
              Atención
            </Text>
            <MaterialCommunityIcons
              name="close"
              size={16}
              color="#e53935" // Color rojo
              onPress={() => setGraveCount(0)} // Oculta el mensaje al presionar
            />
          </View>

          <Text
            style={{
              color: '#e53935', // Texto principal en rojo
              fontSize: 15,
              lineHeight: 22,
              textAlign: 'justify',
              marginTop: 8,
              fontWeight: 'bold',
            }}
          >
            Hemos detectado que podrías estar atravesando una situación difícil.
          </Text>

          <Text
            style={{
              color: '#333', // Texto secundario en negro
              fontSize: 14,
              lineHeight: 22,
              textAlign: 'justify',
              marginTop: 5,
            }}
          >
            Por favor, envíanos un correo a{' '}
            <Text style={{ fontWeight: 'bold' }}>dae@uv.cl</Text>, indicando tu
            teléfono. También puedes llamarnos o escribirnos un WhatsApp al
            +569 68301655 de Lunes a Viernes de 8:30 a 17:30 horas.
          </Text>
        </View>
      )}

      {/* Sección 1 */}
      <View style={{ height: 290 }}>
        <Text style={GlobalStyle.welcomeText}>Test GAD-7</Text>
        <Text style={GlobalStyle.subtitle}>Test de Ansiedad Generalizada</Text>
        <Text style={[GlobalStyle.text, { textAlign: 'justify' }]}>
          El cuestionario GAD-7 es una herramienta que se utiliza para medir la
          gravedad de la ansiedad a través de siete preguntas. Ayuda a
          identificar a las personas que pueden requerir una evaluación o
          tratamiento adicional para la ansiedad.
        </Text>
        <View style={GlobalStyle.line} />
        <Text style={[GlobalStyle.text, { textAlign: 'left' }]}>
          Última prueba realizada: {lastTest}
        </Text>
      </View>

      {/* Sección 2 */}
      <View style={GlobalStyle.rowTwo}>
        <View style={GlobalStyle.statsContainer}>
          <Text style={GlobalStyle.statsTitle}>Estadísticas</Text>
          <StatsButton
            /* onPress={() => navigation.navigate('QuestionnaireStats')} */
          />
        </View>

        <HistoryButton
        /*   onPress={() => navigation.navigate('QuestionnaireHistory')} */
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

        {/* Botón */}
        <View style={GlobalStyle.circularButtonContainer}>
          <CircularButton
            onPress={() => {
              Alert.alert(
                'Funcionalidad no disponible',
                'Las preguntas de este test aún no están cargadas. La funcionalidad se habilitará cuando el administrador las cargue. Intenta nuevamente más tarde.',
                [{ text: 'Aceptar' }]
              );              
            }}
            setVisble={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Questionnaire;
