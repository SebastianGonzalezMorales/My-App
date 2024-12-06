// react imports
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions
} from 'react-native';

// customisation
import GlobalStyle from '../../assets/styles/GlobalStyle';

// Components
import CustomButton from '../../components/buttons/CustomButton';
import SettingsButton from '../../components/buttons/SettingsButton';
import AuthButton from '../../components/buttons/AuthButton';

const { width, height } = Dimensions.get('window'); // Obtener las dimensiones de la pantalla


function MenuUv({ navigation }) {
  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>

      {/* Sección superior azul con título y subtítulo */}
      <View style={{ height: height * 0.45, padding: 10 }}>
        <Text style={GlobalStyle.welcomeText}>Espacio UV</Text>
        <Text style={[GlobalStyle.text, { textAlign: 'justify', color: '#FFFFFF' }]}>
          Descubre novedades eventos y toda la información sobre salud mental de la Universidad de Valparaíso.
        </Text>

        {/* Imagen con altura ajustada */}
        <Image
          source={require('../../../assets/Uv_Logo_White.png')}
          style={{
            width: '100%',
            height: height * 0.15, // Ajustar la altura de la imagen al 20% de la pantalla
            resizeMode: 'contain', // Cambiar a 'contain' para evitar recortes
            marginTop: 40
          }}
        />
      </View>


      {/* Contenedor de la segunda sección con fondo blanco y bordes redondeados */}
      <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden' }}>
        {/* Imagen de encabezado opcional */}


        {/* ScrollView para botones y contenido adicional */}
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={{ marginTop: 2 }}>
            <SettingsButton
              text="Servicios y Apoyo Estudiantil"
              onPress={() => navigation.navigate('InformacionUv')}
            />
            <SettingsButton
              text="Novedades"
              onPress={() => navigation.navigate('RedesSociales')}
              textStyle={{
                color: '#d85a77', // Personaliza el color del texto
                fontSize: 16, // Disminuir tamaño de la letra
                textAlign: 'left', // Alinear texto a la izquierda
              }}
            />
            <SettingsButton
              text="Contactarse con Apoyo UV"
              onPress={() => navigation.navigate('ContactarseConApoyoUV')}
              backgroundColor="#fbcdd1" // Un rojo más presente y vibrante en el fondo
              textColor="#F20C0C"       // Un rojo más oscuro para el texto
              iconColor="#c62828"       // El mismo rojo oscuro para el icono
            />
            
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default MenuUv;
