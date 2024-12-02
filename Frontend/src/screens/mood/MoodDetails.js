// React imports
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  
  // Components
  import BackButton from '../../components/buttons/BackButton';
  import InputButton from '../../components/buttons/InputButton';
  
  // Customization
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import FormStyle from '../../assets/styles/FormStyle';
  import GlobalStyle from '../../assets/styles/GlobalStyle';
  
  // Import Axios for backend requests
  import axios from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { API_URL } from '@env';
  
  // Import activities from Activities.js
  import Activity from './Activities';
  
  const MoodDetails = ({ route, navigation }) => {
    // Obtener el ID del estado de ánimo desde la ruta
    const { moodId } = route.params;
  
    // Estados
    const [mood, setMood] = useState('');
    const [title, setTitle] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [activities, setActivities] = useState(Activity);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
  
    // Cargar los datos desde el backend
    useEffect(() => {
      const fetchMoodDetails = async () => {
        try {
          const token = await AsyncStorage.getItem('token'); // Obtener token del almacenamiento
          if (!token) {
            setErrorMessage('Token no encontrado. Por favor, inicia sesión.');
            return;
          }
  
          // Solicitar detalles del estado de ánimo
          const response = await axios.get(
            `${API_URL}/moodState/get-MoodStatesById/${moodId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = response.data.data;
  
          // Establecer los datos obtenidos
          setMood(data.mood_state || 'Estado no definido');
          setTitle(data.title || 'Sin título');
  
          // Asegurarse de utilizar el campo correcto para los comentarios
          // Verificar si el campo es 'comentarios' o 'commentarios'
          if (data.comentarios) {
            setComentarios(data.comentarios);
          } else if (data.commentarios) {
            setComentarios(data.commentarios);
          } else {
            setComentarios('Sin nota');
          }
  
          // Actualizar las actividades seleccionadas
          const updatedActivities = Activity.map((activity) => {
            if (data.Activities.includes(activity.activity)) {
              return { ...activity, selected: true };
            }
            return { ...activity, selected: false };
          });
          setActivities(updatedActivities);
        } catch (error) {
          console.error('Error al cargar los datos del mood:', error);
          setErrorMessage(
            'Error al cargar los datos del estado de ánimo. Por favor, inténtalo de nuevo.'
          );
        } finally {
          setIsLoading(false); // Ocultar indicador de carga
        }
      };
  
      fetchMoodDetails();
    }, [moodId]);
  
    // keyboard offset
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  
    /*
     * ****************
     * **** Screen ****
     * ****************
     */
    if (isLoading) {
      return (
        <View style={[FormStyle.container, GlobalStyle.androidSafeArea]}>
          <ActivityIndicator size="large" color="#5da5a9" />
        </View>
      );
    }
  
    if (errorMessage) {
      return (
        <View style={[FormStyle.container, GlobalStyle.androidSafeArea]}>
          <Text style={FormStyle.text}>{errorMessage}</Text>
        </View>
      );
    }
  
    return (
      <SafeAreaView style={[FormStyle.container, GlobalStyle.androidSafeArea]}>
        {/* Header */}
        <View style={FormStyle.flexContainer}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={FormStyle.title}>{mood}</Text>
        </View>
  
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={{ flex: 1 }}
        >
          <View style={FormStyle.formContainer}>
            {/* Activities */}
            <Text style={FormStyle.subtitle}>¿Qué has estado haciendo?</Text>
  
            <View style={FormStyle.flatListContainer}>
              <FlatList
                data={activities}
                scrollEnabled={true}
                numColumns={4}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  let iconName = '';
                  // Asignar iconos basados en el id de la actividad
                  switch (item.id) {
                    case 1:
                      iconName = 'thought-bubble';
                      break;
                    case 2:
                      iconName = 'emoticon-confused';
                      break;
                    case 3:
                      iconName = 'account-group';
                      break;
                    case 4:
                      iconName = 'emoticon-sad';
                      break;
                    case 5:
                      iconName = 'book-check';
                      break;
                    case 6:
                      iconName = 'tea';
                      break;
                    case 7:
                      iconName = 'school';
                      break;
                    case 8:
                      iconName = 'run';
                      break;
                    case 9:
                      iconName = 'briefcase-check';
                      break;
                    case 10:
                      iconName = 'calendar-clock';
                      break;
                    case 11:
                      iconName = 'lightbulb-on';
                      break;
                    case 12:
                      iconName = 'home-heart';
                      break;
                    case 13:
                      iconName = 'emoticon-happy';
                      break;
                    case 14:
                      iconName = 'arm-flex';
                      break;
                    case 15:
                      iconName = 'heart';
                      break;
                    case 16:
                      iconName = 'dots-horizontal';
                      break;
                    default:
                      iconName = 'alert-circle';
                      break;
                  }
  
                  return (
                    <View style={FormStyle.activitiesContainer}>
                      <View
                        style={[
                          FormStyle.activityContainer,
                          {
                            backgroundColor: item.selected ? 'white' : 'transparent',
                          },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={iconName}
                          size={24}
                          style={[
                            FormStyle.activityIcon,
                            {
                              color: item.selected ? '#5da5a9' : '#f2f2f2',
                            },
                          ]}
                        />
                        <Text
                          style={[
                            FormStyle.activityText,
                            {
                              color: item.selected ? '#5da5a9' : '#f2f2f2',
                            },
                          ]}
                        >
                          {item.activity}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
  
            <Text style={FormStyle.seeMoreText}>Desliza para ver más</Text>
  
{/* Inputs */}
<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  <View style={FormStyle.inputContainer}>
    {/* Título */}
    <Text style={FormStyle.text}>Título</Text>
    <View pointerEvents="none">
      <InputButton
        value={title}
        editable={true} // editable debe seguir siendo true para que muestre correctamente el valor
        autoCorrect={false}
      />
    </View>

    {/* Nota */}
    <Text style={FormStyle.text}>Nota</Text>
    <View pointerEvents="none">
      <InputButton
        value={comentarios}
        editable={true} // editable debe seguir siendo true para que muestre correctamente el valor
        autoCorrect={false}
      />
    </View>
  </View>
</TouchableWithoutFeedback>

          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default MoodDetails;
  