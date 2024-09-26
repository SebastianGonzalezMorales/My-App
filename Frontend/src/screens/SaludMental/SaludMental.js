// react imports
import {
    SafeAreaView,
    Text,
    ScrollView,
  
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
        <View style={{ height: 210 }}>
          <Text style={GlobalStyle.welcomeText}>Salud Mental </Text>
          <Text style={GlobalStyle.subtitle}></Text>
        <Text style={[GlobalStyle.text, { textAlign: 'left' }]}>

        </Text>
  
        
        
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
              text="Información"
              onPress={() => navigation.navigate('Counselling')}
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
  