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
      <View style={{ height: height * 0.5, padding: 15 }}>
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
            height: height * 0.23, // Ajustar la altura de la imagen al 20% de la pantalla
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
              text="Redes de apoyo"
              onPress={() => navigation.navigate('RedesDeApoyo')}
              backgroundColor="#f7d8e3" // Cambia el color de fondo
              textColor="#d85a77"       // Cambia el color del texto
              iconColor="#d85a77"       // Cambia el color del icono
            />

          </View>
        </ScrollView>
      </View>
      
    </SafeAreaView>
  );
}

export default AprendeSobreSaludMental;
