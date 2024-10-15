import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SmallAuthButton from '../../components/buttons/SmallAuthButton';

const Policy = ({ navigation }) => {

  const acceptPolicy = async () => {
    try {
      await AsyncStorage.setItem('policyAccepted', 'true');
      Alert.alert('Política Aceptada', 'Gracias por aceptar la política de privacidad.');
      navigation.navigate('Register'); // Redirigir al registro
    } catch (error) {
      console.error('Error al guardar la política:', error);
    }
  };

  const handleReject = () => {
    Alert.alert('Atención', 'Debes aceptar la política para continuar.');
  };

  const handleBackToOnboarding = () => {
    navigation.navigate('Onboarding'); // Navegar de vuelta al Onboarding
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
      <Image
          source={require('../../../assets/PoliticaDePrivacidad/PoliticaDePrivacidad-removebg.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Política de Privacidad</Text>
        <Text style={styles.text}>
          Por favor, lee y acepta nuestra política de privacidad para continuar utilizando la aplicación.
        </Text>
        <TouchableOpacity style={styles.acceptButton} onPress={acceptPolicy}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.buttonText}>Rechazar</Text>
        </TouchableOpacity>
{/*         <TouchableOpacity style={styles.backButton} onPress={handleBackToOnboarding}>
          <Text style={styles.backButtonText}></Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={handleBackToOnboarding} style={{ marginTop: 20 }} >
        <Text style={styles.textButton}>Volver al Onboarding</Text>
          </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
};

export default Policy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000C7B',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },

  textButton: {
    color: '#5da5a9',
    fontFamily: 'Actor',
    fontSize: 15,
  },
  
  acceptButton: {
    backgroundColor: '#000C7B',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  rejectButton: {
    backgroundColor: '#000C7B',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },

  backButtonText: {
    color: '#5da5a9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 300, // Ajusta el tamaño de la imagen según tu necesidad
    height: 200,
    resizeMode: 'contain', // Asegura que la imagen mantenga sus proporciones
    marginBottom: 20,
  },
});
