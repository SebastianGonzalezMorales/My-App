// React imports
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  Animated,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importar íconos


// Custom styles
import GlobalStyle from '../../../assets/styles/GlobalStyle';
import BackButton from '../../../components/buttons/BackButton';

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

// Datos de los videos de los estudiantes
const studentVideos = [
  { id: 1, videoId: '2hFy0kOe_AM'},
];

function UnidadPrimeraInfancia({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [playingIndex, setPlayingIndex] = useState(null);

  // Manejar la reproducción del video
  const onVideoPlay = (index) => {
    setPlayingIndex(index);
  };

  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
      {/* Sección Azul del Encabezado */}
      <View style={{ height: 200, padding: 15 }}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={GlobalStyle.welcomeText}>Espacio UV</Text>
        <Text style={[GlobalStyle.subtitleMenu, { color: '#FFFFFF' }]}>
          Servicios y Apoyo Estudiantil
        </Text>
        <Text style={[GlobalStyle.text, { textAlign: 'justify', color: '#FFFFFF' }]}>
          Unidad de Primera Infancia
        </Text>
      </View>

      {/* Contenedor para el Carrusel de Videos */}
      <View style={[GlobalStyle.rowTwo, styles.centeredContainer]}>
        <View style={styles.carouselWrapper}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={styles.carouselContainer}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.round(event.nativeEvent.contentOffset.x / (width * 0.8));
              setCurrentIndex(slideIndex);
            }}
          >
            {studentVideos.map((video, index) => (
              <View key={video.id} style={styles.slide}>
          
                <YoutubePlayer
                  height={height * 0.3}
                  width={width * 0.8}
                  play={playingIndex === index}
                  videoId={video.videoId}
                  onChangeState={(state) => {
                    if (state === 'playing') {
                      onVideoPlay(index);
                    } else if (state === 'ended' || state === 'paused') {
                      setPlayingIndex(null);
                    }
                  }}
                />
              </View>
            ))}
          </Animated.ScrollView>
          {/* Puntos de Paginación */}
          <View style={styles.pagination}>
            {studentVideos.map((_, index) => {
              const opacity = scrollX.interpolate({
                inputRange: [
                  (index - 1) * width * 0.8,
                  index * width * 0.8,
                  (index + 1) * width * 0.8,
                ],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
            })}
          </View>
        </View>
      {/* Botones de contacto */}
      <View style={styles.contactButtonsContainer}>
        {/* Botón para programa general */}
        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => Linking.openURL('mailto:programa.infancia@uv.cl')}
        >
 <Icon name="email" size={20} color="white" style={{ marginRight: 15 }} />
          <Text style={{ color: 'white', fontSize: 16 }}>Enviar Correo</Text>
        </TouchableOpacity>

      
      </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
  },
  carouselWrapper: {
    position: 'relative',
    width: width * 0.8,
    height: height * 0.4,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  slide: {
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    paddingTop: 20,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5c6169',
    marginBottom: 5,
    textAlign: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: '#D1D5DB',
  },
  contactButtonsContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '60%',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    textAlign: 'right',
  },
});

export default UnidadPrimeraInfancia;
