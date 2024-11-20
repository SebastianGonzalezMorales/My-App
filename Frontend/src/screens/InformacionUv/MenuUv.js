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
          source={require('../../../assets/uv_logo_act.png')}
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
          <View style={{ marginTop: 10 }}>
            <SettingsButton
              text="Información"
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
              text="Contactarse con recursos UV"
              onPress={() => navigation.navigate('UV')}
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

export default MenuUv;
