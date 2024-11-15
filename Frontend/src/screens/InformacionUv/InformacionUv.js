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
import BackButton from '../../components/buttons/BackButton';
import CustomButton from '../../components/buttons/CustomButton';
import SettingsButton from '../../components/buttons/SettingsButton';

function InformacionUv({ navigation }) {
  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
 <BackButton onPress={() => navigation.goBack()} />
{/* Sección superior azul con título y subtítulo */}
<View style={{ height: 210 }}>
  <Text style={GlobalStyle.welcomeText}>Espacio UV</Text>
  <Text style={[GlobalStyle.subtitleMenu, { color: '#FFFFFF' }]}>
    Información 
  </Text>
</View>


      {/* Contenedor de la segunda sección con fondo blanco y bordes redondeados */}
      <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden' }}>
        {/* Imagen de encabezado opcional */}


        {/* ScrollView para botones y contenido adicional */}
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={{ marginTop: 10 }}>
            <SettingsButton
              text="DaeUV"
              onPress={() => navigation.navigate('RedesSociales')}
            />
            <SettingsButton
              text="AppaUv"
              onPress={() => navigation.navigate('InformacionUV')}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default InformacionUv;
