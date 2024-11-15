// react imports
import {
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  View,
} from 'react-native';

// customisation
import GlobalStyle from '../../assets/styles/GlobalStyle';


//Components
import CustomButton from '../../components/buttons/CustomButton';
import SettingsButton from '../../components/buttons/SettingsButton';


function SaludMental({ navigation }) {
  return (
    <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>

      {/*
       * *********************
       * ***** Section 1 *****
       * *********************
       */}
      {/*
     
         */}
      {/* Section 1 */}
      <View style={{ height: 180 }}>
        <Text style={GlobalStyle.welcomeText}>Salud Mental</Text>
        <Text style={[GlobalStyle.text, { textAlign: 'justify', color: '#FFFFFF' }, ]}>
          Descubre recursos y consejos para fortalecer tu bienestar mental, con información sobre diversos aspectos de la salud emocional. Evalúa tu bienestar a través de tests disponibles en esta sección.
        </Text>
        {/* Aquí agregamos la imagen */}
        {/*                 <Image
                     source={require('../../../assets/Menu/salud_Mental.png')} // Reemplaza con la ruta de tu imagen
                    style={{ width: '100%', height: 200, resizeMode: 'cover', marginTop: 10 }}
                /> */}
      </View>


      {
      }

      {/*
        {/*
       * *********************
       * ***** Section 2 *****
       * *********************
       */}
      <View style={GlobalStyle.rowTwo}>
        <View style={GlobalStyle.statsContainer}>

        </View>
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <SettingsButton
              text="Aprende sobre Salud Mental"
              onPress={() => navigation.navigate('AprendeSobreSaludMental')}
            />
            <SettingsButton
              text="Test"
              onPress={() => navigation.navigate('Tests')}
            />

            {/* <SettingsButton text="Notifications" onPress={() => navigation.navigate('Counselling')} /> */}
            {/*  <SettingsButton
              text="Privacy policy"
               onPress={() => navigation.navigate('Notification')}
            /> */}

          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}

export default SaludMental;
