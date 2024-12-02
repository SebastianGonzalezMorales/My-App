import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';

// Customisation
import GlobalStyle from '../../../assets/styles/GlobalStyle';

// Components
import BackButton from '../../../components/buttons/BackButton';
import GridSettingsButton from '../../../components/buttons/GridSettingsButton';

const { width, height } = Dimensions.get('window'); // Obtener las dimensiones de la pantalla

function InformacionUv({ navigation }) {
  // Array de datos para los botones
  const servicios = [
     { text: 'DAE', screen: 'DaeUv', imageSource: require('../../../../assets/RedesDeApoyo/Dae.png') },
    { text: 'APPA', screen: 'AppaUv', imageSource: require('../../../../assets/RedesDeApoyo/Appa.png') },
    { text: 'Conectados', screen: 'ConectadosUv', imageSource: require('../../../../assets/RedesDeApoyo/Conectados/conectados_logo.png') },
      { text: 'UV Inclusiva', screen: 'UvInclusiva' , imageSource: require('../../../../assets/RedesDeApoyo/UvInclusiva.png') },
   { text: 'Unidad de Salud', screen: 'UnidadDeSalud' , imageSource: require('../../../../assets/RedesDeApoyo/AreaDeSalud.png') },
    { text: 'Unidad PrimeraInfancia', screen: 'UnidadPrimeraInfancia', imageSource: require('../../../../assets/RedesDeApoyo/AreaDePrimeraInfancia.png') },
    { text: 'Unidad Deporte y Recreación', screen: 'AreaDeporteyRecreacion', imageSource: require('../../../../assets/RedesDeApoyo/druv.png')},
   { text: 'Unidad de Atencion Arancelaria', screen: 'AreaDeAtencionArancelaria' , imageSource: require('../../../../assets/RedesDeApoyo/ArancelesUv.png') },
   { text: 'Tne', screen: 'Tne', imageSource: require('../../../../assets/RedesDeApoyo/tne.png')},
    { text: 'Baes', screen: 'Baes', imageSource: require('../../../../assets/RedesDeApoyo/baes.png')},
  ];

  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
      <BackButton onPress={() => navigation.goBack()} />
      {/* Sección superior azul con título y subtítulo */}
      <View style={{ height: height * 0.25, padding: 10 }}>
        <Text style={GlobalStyle.welcomeText}>Espacio UV</Text>
        <Text style={[GlobalStyle.subtitleMenu, { color: '#FFFFFF' }]}>
          Servicios y Apoyo Estudiantil
        </Text>
      </View>

      {/* Contenedor de la segunda sección con fondo blanco y bordes redondeados */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        }}
      >
        {/* FlatList para mostrar los botones en dos columnas */}
        <FlatList
          data={servicios}
          keyExtractor={(item) => item.text}
          numColumns={2} // Número de columnas que deseas mostrar
          contentContainerStyle={{ padding: 10 }} // Reduje el padding para minimizar el espacio en blanco
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }} // Espacio entre columnas reducido
          renderItem={({ item }) => (
            <GridSettingsButton
              text={item.text}
              imageSource={item.imageSource}
              onPress={() => navigation.navigate(item.screen)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default InformacionUv;
