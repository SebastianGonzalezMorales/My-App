import React, { useState } from 'react';
import { SafeAreaView, Text, ScrollView, View } from 'react-native';
import GlobalStyle from '../../../assets/styles/GlobalStyle';
import BackButton from '../../../components/buttons/BackButton';
import SettingsButton from '../../../components/buttons/SettingsButton';

function RedesDeApoyo({ navigation }) {
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
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={GlobalStyle.welcomeText}>Salud Mental</Text>
      <Text style={[GlobalStyle.subtitleMenu, { color: '#FFFFFF' }]}>Redes de apoyo</Text>
      <Text style={{ color: '#FFFFFF', marginVertical: 10, paddingHorizontal: 20 }}>
        Conecta con los recursos y contactos disponibles para apoyarte en momentos difíciles. Explora las opciones de consejería, apoyo entre pares y recursos comunitarios.
      </Text>

      {/* Contenedor para las secciones */}
      <View style={GlobalStyle.rowTwo}>
        <ScrollView>
          {/* Botón para Consejería */}
          <SettingsButton
            text="Consejería universitaria"
            onPress={() => toggleSection('counseling')}
            icon={expandedSections.counseling ? '▼' : '▶'}
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

export default RedesDeApoyo;
