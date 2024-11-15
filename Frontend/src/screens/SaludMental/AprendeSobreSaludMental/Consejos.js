// React imports
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';

// Custom styles
import GlobalStyle from '../../../assets/styles/GlobalStyle';
import BackButton from '../../../components/buttons/BackButton';

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

// Datos de los consejos (solo las imágenes)
const adviceImages = [
  require('../../../../assets/Consejos/1.png'),
  require('../../../../assets/Consejos/2.png'),
  require('../../../../assets/Consejos/3.png'),
  require('../../../../assets/Consejos/4.png'),
  require('../../../../assets/Consejos/5.png'),
  require('../../../../assets/Consejos/6.png'),
  require('../../../../assets/Consejos/7.png'),
  require('../../../../assets/Consejos/8.png'),
  require('../../../../assets/Consejos/9.png'),
  require('../../../../assets/Consejos/10.png'),
  // Añade más imágenes según sea necesario
];

function Consejos({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para manejar el cambio de página en el carrusel
  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / (width * 0.8));
    setCurrentIndex(slideIndex);
  };

  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
      
      {/* Sección Azul del Encabezado */}
      <View style={{ height: 240, padding: 15 }}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={[GlobalStyle.welcomeText, { color: '#FFFFFF' }]}>Salud Mental</Text>
        <Text style={[GlobalStyle.subtitleMenu, { color: '#FFFFFF' }]}>
          Consejos
        </Text>
        
        {/* Descripción debajo del título */}
        <Text style={[GlobalStyle.text, { textAlign: 'justify' }]}>
        A continuación, te ofrecemos algunos consejos extraídos de la Red de Salud Digital de las Universidades del Estado (RSDUE) para apoyar tu bienestar emocional y salud mental.
        </Text>
      </View>

      {/* Contenedor para el Carrusel de Imágenes */}
      <View style={[GlobalStyle.rowTwo, styles.centeredContainer]}>
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.carouselContainer}
          >
            {adviceImages.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image source={image} style={styles.image} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Puntos de Paginación fijos debajo del carrusel */}
        <View style={styles.pagination}>
          {adviceImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === currentIndex ? '#000C7B' : '#D1D5DB' }
              ]}
            />
          ))}
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    textAlign: 'left',
    marginTop: 10,
    marginHorizontal: 15, // Margen horizontal para evitar que el texto toque los bordes
  },
  centeredContainer: {
    justifyContent: 'center', // Centra verticalmente el contenedor
    alignItems: 'center',
    flex: 1,
    marginTop: 20, // Ajuste para bajar todo el contenedor del carrusel
  },
  scrollContainer: {
    width: width * 0.8, // Limita el ancho del ScrollView al 80% de la pantalla
    height: height * 0.4, // Fija la altura para mantener la barra de desplazamiento cerca de la imagen
  },
  carouselContainer: {
    alignItems: 'center',
  },
  slide: {
    width: width * 0.8, // Cada slide ocupa el 80% del ancho de la pantalla
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', // La imagen ocupa el 100% del ancho del slide
    height: '100%', // La imagen ocupa el 100% de la altura del contenedor scrollContainer
    resizeMode: 'contain',
    borderRadius: 30,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30, // Espacio justo debajo de la imagen
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default Consejos;
