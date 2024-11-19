// React imports
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

// Custom styles
import GlobalStyle from '../../../../assets/styles/GlobalStyle';
import BackButton from '../../../../components/buttons/BackButton';

// Importa ImageZoom
import ImageZoom from 'react-native-image-pan-zoom';

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

// Datos de los consejos (solo las imágenes)
const adviceImages = [
  require('../../../../../assets/Informacion/Evaluacion/1.jpg'),
  require('../../../../../assets/Informacion/Evaluacion/2.jpg'),
  require('../../../../../assets/Informacion/Evaluacion/3.jpg'),
  require('../../../../../assets/Informacion/Evaluacion/4.jpg'),
  require('../../../../../assets/Informacion/Evaluacion/5.jpg'),
];

function Evaluacion({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para manejar el cambio de página en el carrusel
  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
      {/* Sección Azul del Encabezado */}
      <View style={{ height: 200, padding: 15 }}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={[GlobalStyle.welcomeText, { color: '#FFFFFF' }]}>
          Aprende sobre Salud Mental
        </Text>
        <Text style={[GlobalStyle.subtitleMenu, { color: '#FFFFFF' }]}>
          Información
        </Text>

        {/* Descripción debajo del título */}
        <Text style={[GlobalStyle.text, { textAlign: 'justify' }]}>
          Evaluación
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
            contentContainerStyle={{
              paddingEnd: width * 0.1, // Espacio extra al final para el último slide
            }}
          >
            {adviceImages.map((image, index) => (
              <View key={index} style={styles.slide}>
                {/* Utiliza ImageZoom para habilitar zoom y desplazamiento */}
                <ImageZoom
                  cropWidth={width}
                  cropHeight={height * 0.45}
                  imageWidth={width * 0.95}
                  imageHeight={height * 0.47}
                  panToMove={true}
                  pinchToZoom={true}
                  enableDoubleClickZoom={true}
                  minScale={1}
                  maxScale={3}
                >
                  <Image source={image} style={styles.image} />
                </ImageZoom>
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
                { backgroundColor: index === currentIndex ? '#000C7B' : '#D1D5DB' },
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
    marginHorizontal: 15,
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
  },
  scrollContainer: {
    width: width,
    height: height * 0.45,
  },
  slide: {
    width: width, // Cada slide ocupa el 100% del ancho de la pantalla
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.95,
    height: height * 0.47,
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: '#D1D5DB',
  },
});

export default Evaluacion;
