import React, { useState } from 'react';
import { SafeAreaView, Text, ScrollView, View } from 'react-native';
import GlobalStyle from '../../../assets/styles/GlobalStyle';
import BackButton from '../../../components/buttons/BackButton';
import SettingsButton from '../../../components/buttons/SettingsButton';

function Informacion({ navigation }) {
  // Estado para controlar qué secciones están desplegadas
  const [expandedSections, setExpandedSections] = useState({
    depression: false,
    stress: false,
    universityChallenges: false,
  });

  // Función para alternar el estado de cada sección
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={GlobalStyle.welcomeText}>Salud Mental</Text>
      <Text style={[GlobalStyle.subtitleMenu, { color: '#FFFFFF' }]}>Información</Text>
      <Text style={{ color: '#FFFFFF', marginVertical: 10, paddingHorizontal: 20 }}>
        Conoce más sobre temas de salud mental que pueden afectar a los estudiantes universitarios, como la depresión, el estrés y cómo afrontar momentos difíciles. 
      </Text>

      {/* Contenedor para las secciones */}
      <View style={GlobalStyle.rowTwo}>
        <ScrollView>
          {/* Botón para Depresión */}
          <SettingsButton
            text="¿Qué es la Depresión?"
            onPress={() => toggleSection('depression')}
            icon={expandedSections.depression ? '▼' : '▶'}
          />
          {expandedSections.depression && (
            <View style={GlobalStyle.responseBox}>
              <Text style={GlobalStyle.sectionContent}>
                La depresión es un trastorno que afecta el estado de ánimo, generando sentimientos de tristeza profunda y pérdida de interés en actividades.
              </Text>
            </View>
          )}

          {/* Botón para Estrés */}
          <SettingsButton
            text="¿Qué es el Estrés?"
            onPress={() => toggleSection('stress')}
            icon={expandedSections.stress ? '▼' : '▶'}
          />
          {expandedSections.stress && (
            <View style={GlobalStyle.responseBox}>
              <Text style={GlobalStyle.sectionContent}>
                El estrés es una reacción del cuerpo ante situaciones desafiantes o amenazantes. Puede afectar la salud física y mental.
              </Text>
            </View>
          )}

          {/* Botón para Momentos difíciles en la universidad */}
          <SettingsButton
            text="Momentos Difíciles en la Universidad"
            onPress={() => toggleSection('universityChallenges')}
            icon={expandedSections.universityChallenges ? '▼' : '▶'}
          />
          {expandedSections.universityChallenges && (
            <View style={GlobalStyle.responseBox}>
              <Text style={GlobalStyle.sectionContent}>
                La vida universitaria puede ser desafiante, con presión académica, adaptación social y momentos de soledad. Estos son sentimientos normales en esta etapa.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Informacion;
