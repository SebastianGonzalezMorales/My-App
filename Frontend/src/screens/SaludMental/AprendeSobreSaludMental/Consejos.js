// React imports
import React from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
} from 'react-native';

// Custom styles
import GlobalStyle from '../../../assets/styles/GlobalStyle';
import BackButton from '../../../components/buttons/BackButton';

// Datos de los consejos (solo las imágenes)
const adviceImages = [
  require('../../../../assets/Consejos/1.png'),
  require('../../../../assets/Consejos/2.png'),
  require('../../../../assets/Consejos/3.png'),
  require('../../../../assets/Consejos/4.png'),
  // Añade más imágenes según sea necesario
];

function Consejos({ navigation }) {
  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
      
      {/* Sección Azul del Encabezado */}
      <View style={{ height: 210, padding: 15 }}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={[GlobalStyle.welcomeText, { color: '#FFFFFF' }]}>Salud Mental</Text>
        <Text style={[GlobalStyle.subtitleMenu, { color: '#B0B0B0' }]}>
          Consejos
        </Text>
      </View>

      {/* Sección de Contenedor para Imágenes */}
      <View style={GlobalStyle.rowTwo}>
        <View style={GlobalStyle.statsContainer}>
          <ScrollView contentContainerStyle={styles.imageContainer}>
            {adviceImages.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </ScrollView>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: '90%', // Ancho del 90% de la pantalla
    height: 250,  // Ajusta la altura según el tamaño deseado
    marginVertical: 10,
    resizeMode: 'contain', // Asegura que la imagen se ajuste sin distorsión
  },
});

export default Consejos;
