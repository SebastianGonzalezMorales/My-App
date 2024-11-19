import React, { useState } from 'react';
import { SafeAreaView, Text, ScrollView, View } from 'react-native';
import GlobalStyle from '../../../assets/styles/GlobalStyle';
import BackButton from '../../../components/buttons/BackButton';
import SettingsButton from '../../../components/buttons/SettingsButton';

function Informacion({ navigation }) {
  // Estado para controlar qué secciones están desplegadas
  const [expandedSections, setExpandedSections] = useState({
    counseling: false,
    peerSupport: false,
    communityResources: false,
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
        <View style={{ height: 260, padding: 15 }}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={GlobalStyle.welcomeText}>Aprende sobre Salud Mental</Text>
      <Text style={[GlobalStyle.subtitleMenu, { color: '#FFFFFF' }]}>Información</Text>
      <Text style={{ color: '#FFFFFF', marginVertical: 10, paddingHorizontal: 20 }}>
       A continuacón se presentarán algunos consejos sobre Aprende Sobre Salud  en estudiantes Universitarios
      </Text>
      </View>


      {/* Contenedor para las secciones */}
      <View style={GlobalStyle.rowTwo}>
        <ScrollView>
          {/* Botón para Consejería */}
          <SettingsButton
            text="Burnout Académico"
            onPress={() => navigation.navigate('Burnout')}
          />
          {expandedSections.counseling && (
            <View style={GlobalStyle.responseBox}>
              <Text style={GlobalStyle.sectionContent}>
                La universidad ofrece servicios de consejería donde puedes recibir orientación profesional en temas emocionales, académicos y personales.
              </Text>
            </View>
          )}

          {/* Botón para Apoyo entre pares */}
          <SettingsButton
            text="Apoyo entre pares"
            onPress={() => toggleSection('peerSupport')}
            icon={expandedSections.peerSupport ? '▼' : '▶'}
          />
          {expandedSections.peerSupport && (
            <View style={GlobalStyle.responseBox}>
              <Text style={GlobalStyle.sectionContent}>
                Conecta con grupos de estudiantes que comparten experiencias similares. A menudo, hablar con tus pares puede ser una gran fuente de apoyo.
              </Text>
            </View>
          )}

          {/* Botón para Recursos comunitarios */}
          <SettingsButton
            text="Recursos comunitarios"
            onPress={() => toggleSection('communityResources')}
            icon={expandedSections.communityResources ? '▼' : '▶'}
          />
          {expandedSections.communityResources && (
            <View style={GlobalStyle.responseBox}>
              <Text style={GlobalStyle.sectionContent}>
                Encuentra líneas de ayuda, servicios comunitarios y organizaciones locales que están disponibles para brindarte apoyo.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Informacion;
