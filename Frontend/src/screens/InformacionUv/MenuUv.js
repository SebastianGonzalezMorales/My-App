// react imports
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
} from 'react-native';

// customisation
import GlobalStyle from '../../assets/styles/GlobalStyle';

// Components
import CustomButton from '../../components/buttons/CustomButton';
import SettingsButton from '../../components/buttons/SettingsButton';

function MenuUv({ navigation }) {
  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>

{/* Sección superior azul con título y subtítulo */}
<View style={{ height: 180 }}>
  <Text style={GlobalStyle.welcomeText}>Espacio UV</Text>
  <Text style={[GlobalStyle.text, { textAlign: 'justify', color: '#FFFFFF' }]}>
    Descubre novedades eventos y toda la información sobre salud mental de la Universidad de Valparaíso.
  </Text>
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
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default MenuUv ;
