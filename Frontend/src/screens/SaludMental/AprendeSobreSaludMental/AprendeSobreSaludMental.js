// React imports
import React from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions
} from 'react-native';

// Custom styles
import GlobalStyle from '../../../assets/styles/GlobalStyle';

// Components
import BackButton from '../../../components/buttons/BackButton';
import SettingsButton from '../../../components/buttons/SettingsButton';

const { width, height } = Dimensions.get('window'); // Obtener las dimensiones de la pantalla

function AprendeSobreSaludMental({ navigation }) {
  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>

      {/* Sección Azul del Encabezado */}
      <View style={{ height: height * 0.45, padding: 15 }}>
        {/* Altura ajustada al 50% del tamaño de la pantalla */}
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={[GlobalStyle.welcomeText, { color: '#FFFFFF' }]}>Salud Mental</Text>
        <Text style={[GlobalStyle.subtitleMenu, { color: '#FFFFFF' }]}>
          Aprende sobre Salud Mental
        </Text>

        {/* Imagen con altura ajustada */}
        <Image
          source={require('../../../../assets/Menu/salud_Mental.png')}
          style={{
            width: '100%',
            height: height * 0.21, // Ajustar la altura de la imagen al 20% de la pantalla
            resizeMode: 'contain', // Cambiar a 'contain' para evitar recortes
            marginTop: 5
          }}
        />

        {/* Texto adicional */}
        {/*          <Text style={[GlobalStyle.welcomeText, { color: '#FFFFFF', fontSize: 16, textAlign: 'center', marginTop: 10 }]}>
          ¡ NO HAY SALUD SIN SALUD MENTAL !
        </Text>  */}
      </View>

      {/* Sección de Botones de Navegación */}
      <View style={GlobalStyle.rowTwo}>
        <ScrollView contentContainerStyle>
          <View style={{ marginTop: 10 }}>
            <SettingsButton
              text="Información"
              onPress={() => navigation.navigate('Informacion')}
            />
            <SettingsButton
              text="Consejos"
              onPress={() => navigation.navigate('Consejos')}
            />
            <SettingsButton
              text="Consejos de estudiantes"
              onPress={() => navigation.navigate('ConsejosDeEstudiantes')}
            />
            <SettingsButton
              text="Redes de Apoyo"
              onPress={() => navigation.navigate('RedesDeApoyo')}
              backgroundColor="#FFE0B2" // Naranja claro y cálido
              textColor="#E65100"       // Naranja oscuro para texto
              iconColor="#E65100"       // Naranja oscuro para icono
            />
            <SettingsButton
              text="Contactarse con recursos UV"
              onPress={() => navigation.navigate('UV')}
              backgroundColor="#fbcdd1" // Un rojo más presente y vibrante en el fondo
              textColor="#c62828"       // Un rojo más oscuro para el texto
              iconColor="#c62828"       // El mismo rojo oscuro para el icono
            />



          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}

export default AprendeSobreSaludMental;
