// react imports
import {
  Linking,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

// components
import BackButton from '../../components/buttons/BackButton';

// customisation
import GlobalStyle from '../../assets/styles/GlobalStyle';
import FormStyle from '../../assets/styles/FormStyle';

const Counselling = ({ navigation }) => {
  const freePhoneCall = () => {
    Linking.openURL('tel:+569 5944 6403');
  };
  const under18Call = () => {
    Linking.openURL('tel:+569 5944 6919');
  };

  const sendEmail = () => {
    Linking.openURL('mailto:dae@uv.cl?subject=[Atención en salud mental]');

  };

  return (
    <SafeAreaView style={[FormStyle.container, GlobalStyle.androidSafeArea]}>
      <View style={[FormStyle.flexContainer, { marginBottom: 10 }]}>
        {/* <BackButton onPress={() => navigation.goBack()} /> */}

        <Text style={FormStyle.title}>Información Uv</Text>
      </View>

      <View style={FormStyle.inputContainer}>
        {/* support line */}
        <Text
          style={{
            color: '#f2f2f2',
            fontFamily: 'DoppioOne',
            fontSize: 20,
            marginTop: 20,
          }}
        >
         Como puedo acceder a la atención en Salud Mental ?
          
        </Text>
        <Text
          style={{ color: '#f2f2f2', fontFamily: 'DoppioOne', marginTop: 20, fontSize: 14, }}
        >

         1.- Puedes escribir a los siguientes correos: {'\n'}
  
        {/* Correo DAE */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text style={FormStyle.text}>a) Escribir al correo: </Text>
          <TouchableOpacity onPress={sendEmail}>
            <Text style={[FormStyle.text, { color: '#a0a0a0', marginLeft: 2 }]}>dae@uv.cl</Text>
          </TouchableOpacity>
        </View>
        {'\n'}

         {'\n'}
         b) Escribir al correo de la o el profesional Asistente social encargado de tu carrera.{'\n'}

         {'\n'}

          2.- Puedes comunicarte llamando al call center CONECTADOS UV o a través de whatsapp a los siguientes números.
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={FormStyle.text}></Text>
          <TouchableOpacity onPress={() => freePhoneCall()}>
            <Text style={[FormStyle.text, { color: '#a0a0a0'}]}>+569 5944 6403</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={FormStyle.text}></Text>
          <TouchableOpacity onPress={() => under18Call()}>
          <Text style={[FormStyle.text, { color: '#a0a0a0'}]}>+569 5944 6919</Text>
          </TouchableOpacity>
        </View>

        <View style={GlobalStyle.counsellingLine} />
  

        {/* counselling */}
        <Text
          style={{
            color: '#f2f2f2',
            fontFamily: 'DoppioOne',
            fontSize: 20,
            marginTop: 20,
          }}
        >
         Importante
        </Text>
        <View style={GlobalStyle.counsellingLine} />
        <Text
          style={{ color: '#f2f2f2', fontFamily: 'DoppioOne', marginTop: 20 }}
        >
         Cada vez que solicites atención y escribas, debes indicarnos la siguiente información: Nombre, rut, carrera, número de contacto y año de ingreso
    
        </Text>

 

       
      </View>
    </SafeAreaView>
  );
};

export default Counselling;
