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

          {/* Botón para Apoyo entre pares */}
          <SettingsButton
            text="Depresión"
            onPress={() => navigation.navigate('Depresion')}
          />


          {/* Botón para Recursos comunitarios */}
          <SettingsButton
            text="Ansiedad"
            onPress={() => navigation.navigate('Ansiedad')}
          />

          {/* Botón para Recursos comunitarios */}
          <SettingsButton
            text="Que es una crisis ?"
            onPress={() => navigation.navigate('Crisis')}
          />

          {/* Botón para Recursos comunitarios */}
          <SettingsButton
            text="Salud Mental"
            onPress={() => navigation.navigate('InfoSaludMental')}
          />

          {/* Botón para Recursos comunitarios */}
          <SettingsButton
            text="Como enfrentar una evaluación ?"
            onPress={() => navigation.navigate('Evaluacion')}
          />

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Informacion;
