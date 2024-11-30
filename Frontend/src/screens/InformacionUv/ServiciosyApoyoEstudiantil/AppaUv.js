// React imports
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  Animated,
  View,
  Dimensions,
  StyleSheet
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

// Custom styles
import GlobalStyle from '../../../assets/styles/GlobalStyle';
import BackButton from '../../../components/buttons/BackButton';

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

// Datos de los videos de los estudiantes
const studentVideos = [
{ id: 1, videoId: 'RER9MW267Js', title: 'Appa UV' },
/*   { id: 2, videoId: 'VKHqSbcW674', title: 'Vida Universitaria' },
  { id: 3, videoId: 'yqzZljKwTzU', title: 'Vida Universitaria' }, */
];

function AppaUv({ navigation }) {
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
      <View style={{ height: 215, padding: 15 }}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={GlobalStyle.welcomeText}>Espacio UV</Text>
      <Text style={[GlobalStyle.subtitleMenu, { color: '#FFFFFF' }]}>
      Servicios y Apoyo Estudiantil
        </Text>
        
        {/* Descripción debajo del título */}
        <Text style={[GlobalStyle.text, { textAlign: 'justify', color: '#FFFFFF' }]}>
        Appa UV - Programa de Atención Preferencial a los Primeros Años
        </Text>
      </View>

      {/* Contenedor para el Carrusel de Videos */}
      <View style={[GlobalStyle.rowTwo, styles.centeredContainer]}>
        <View style={styles.carouselWrapper}>
          <View style={styles.scrollContainer}>
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
               <Text style={styles.videoTitle}>
  {video.title}
  <Text style={{ width: 2}} /> {/* Espaciado controlado */}
</Text>

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
          </View>
          {/* Puntos de Paginación superpuestos */}
          <View style={styles.pagination}>
            {studentVideos.map((_, index) => {
              const opacity = scrollX.interpolate({
                inputRange: [
                  (index - 1) * width * 0.8,
                  index * width * 0.8,
                  (index + 1) * width * 0.8
                ],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      opacity,
                      backgroundColor: index === currentIndex ? '#000C7B' : '#D1D5DB'
                    }
                  ]}
                />
              );
            })}
          </View>
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
    marginTop: 20, // Ajuste para igualar el primer código
  },
  carouselWrapper: {
    position: 'relative',
    width: width * 0.8,
    height: height * 0.4,
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
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
    paddingTop: 20
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
    bottom: -20, // Ajusta este valor para acercar o alejar los puntos del video
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
});

export default AppaUv;
