// react imports
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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Activity from './Activities';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the API URL from environment variables
import { API_URL } from '@env';

// components
import BackButton from '../../components/buttons/BackButton';
import FormButton from '../../components/buttons/FormButton';
import InputButton from '../../components/buttons/InputButton';

// customisation
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FormStyle from '../../assets/styles/FormStyle';
import GlobalStyle from '../../assets/styles/GlobalStyle';

// route to manage navigation history
const MoodTrack = ({ route, navigation }) => {

    // Obtener mood y value desde la pantalla anterior
    const { mood, value } = route.params;
    // references

    /*    // document id passed from previous screen
       const docId = route.params.documentId;
     
       // obtain document id
       const obtainId = firebase
         .firestore()
         .collection('users')
         .doc(firebase.auth().currentUser.uid)
         .collection('mood')
         .doc(docId);
     
       // states */

    const [title, setTitle] = useState('');
    const [quickNote, setQuickNote] = useState('');
    const [activities, setActivities] = useState(Activity); // select activity handler

    /*
     * *******************
     * **** Functions ****
     * *******************
     */



    // delete document when back button has been pressed
    function deleteDocument() {
        /*     obtainId.delete();
        
            console.log('Document', docId, 'has been deleted.');*/
        navigation.goBack();
    }

    // track mood
    const MoodTrack = async (mood, value, title, quickNote) => {
        try {
            await obtainId.set({
                mood,
                value,
                activities: activities,
                title,
                quickNote,
                created: firebase.firestore.Timestamp.now(),
            });
            console.log('Mood has been tracked');
            navigation.navigate('Mood');
        } catch (error) {
            alert(error.message);
        }
    };

    // select activity handler
    const selectHandler = (item) => {
        // Crea un array que altere el estado de seleccionado
        const selectedItem = activities.map((value) => {
            if (value.id === item.id) {
                return { ...value, selected: !value.selected }; // toggle the selected state
            } else {
                return value;
            }
        });
        setActivities(selectedItem);
        console.log(selectedItem);
    };

    // Guardar el estado de ánimo en MongoDB a través del backend
    const saveMoodTrack = async () => {
        try {
            // Obtener el token del usuario
            const token = await AsyncStorage.getItem('token');

            if (token) {
                // Crear array con actividades seleccionadas
                const selectedActivities = activities.filter((activity) => activity.selected);

                // Enviar datos al backend
                const response = await axios.post(
                    `${API_URL}/moodState/post-moodState`, // Asegúrate de que esta ruta esté configurada en tu backend
                    {
                        mood_state: mood,   // Estado de ánimo seleccionado en la pantalla anterior
                        intensidad: value,  // Intensidad seleccionada en la pantalla anterior
                        comentarios: quickNote,  // Nota rápida introducida por el usuario
                        Activities: selectedActivities.map((activity) => activity.activity), // Actividades seleccionadas
                        title: title,       // Título introducido por el usuario
                      
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Enviar token en los headers
                        },
                    }
                );
                console.log('Estado de ánimo guardado:', response.data);

                // Navegar de regreso a la pantalla principal después de guardar
                navigation.navigate('Mood');
            } else {
                console.log('No se encontró el token. Por favor, inicia sesión.');
            }
        } catch (error) {
            console.error('Error al guardar el estado de ánimo:', error);
        }
    };

    // keyboard offset
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

    /*
     * ****************
     * **** Screen ****
     * ****************
     */
    return (
        <SafeAreaView style={[FormStyle.container, GlobalStyle.androidSafeArea]}>
            {/* header */}
            <View style={FormStyle.flexContainer}>
                <BackButton onPress={deleteDocument} />

                <Text style={FormStyle.title}>{mood}</Text>
            </View>
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={keyboardVerticalOffset}
                style={{ flex: 1 }}
            >
                <View style={FormStyle.formContainer}>
                    {/* activities */}
                    <Text style={FormStyle.subtitle}> Qué has estado haciendo?</Text>

                    <View style={FormStyle.flatListContainer}>
                        <FlatList
                            data={activities}
                            scrollEnabled={true}
                            numColumns={4}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                let iconName = '';

                                // set icons based on activity id
                                switch (item.id) {
                                    case 1:
                                        item.selected
                                            ? (iconName = 'weather-sunny')
                                            : (iconName = 'weather-sunny');
                                        break;
                                    case 2:
                                        item.selected
                                            ? (iconName = 'power-sleep')
                                            : (iconName = 'power-sleep');
                                        break;
                                    case 3:
                                        item.selected
                                            ? (iconName = 'cart')
                                            : (iconName = 'cart-outline');
                                        break;
                                    case 4:
                                        item.selected
                                            ? (iconName = 'school')
                                            : (iconName = 'school-outline');
                                        break;
                                    case 5:
                                        item.selected
                                            ? (iconName = 'dumbbell')
                                            : (iconName = 'dumbbell');
                                        break;
                                    case 6:
                                        item.selected
                                            ? (iconName = 'controller-classic')
                                            : (iconName = 'controller-classic-outline');
                                        break;
                                    case 7:
                                        item.selected
                                            ? (iconName = 'home')
                                            : (iconName = 'home-outline');
                                        break;
                                    case 8:
                                        item.selected
                                            ? (iconName = 'briefcase')
                                            : (iconName = 'briefcase-outline');
                                        break;
                                    case 9:
                                        item.selected
                                            ? (iconName = 'book-open')
                                            : (iconName = 'book-open-outline');
                                        break;
                                    case 10:
                                        item.selected
                                            ? (iconName = 'chef-hat')
                                            : (iconName = 'chef-hat');
                                        break;
                                    case 11:
                                        item.selected
                                            ? (iconName = 'movie')
                                            : (iconName = 'movie-outline');
                                        break;
                                    case 12:
                                        item.selected
                                            ? (iconName = 'dots-horizontal-circle')
                                            : (iconName = 'dots-horizontal-circle-outline');
                                        break;
                                }

                                return (
                                    <View style={FormStyle.activitiesContainer}>
                                        <TouchableOpacity onPress={() => selectHandler(item)}>
                                            <View
                                                style={[
                                                    FormStyle.activityContainer,
                                                    {
                                                        backgroundColor: item.selected
                                                            ? 'white'
                                                            : 'transparent',
                                                    },
                                                ]}
                                            >
                                                <MaterialCommunityIcons
                                                    name={iconName}
                                                    size={24}
                                                    color="#f2f2f2"
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
                                        </TouchableOpacity>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <Text style={FormStyle.seeMoreText}>Desliza para ver más</Text>
                    {/* inputs */}
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={FormStyle.inputContainer}>
                            <Text style={FormStyle.text}>Titulo</Text>
                            <InputButton
                                placeholder="Escribe un título..."
                                onChangeText={(title) => {
                                    setTitle(title);
                                }}
                                autoCorrect={false}
                            />

                            <Text style={FormStyle.text}>Nota</Text>
                            <InputButton
                                placeholder="Escribe una nota..."
                                onChangeText={(quickNote) => {
                                    setQuickNote(quickNote);
                                }}
                                autoCorrect={false}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* button */}
                <View style={[FormStyle.buttonContainer, { marginTop: 20 }]}>
                    <FormButton
                        onPress={saveMoodTrack}
                        text="Guardar"
                        buttonStyle={{
                            backgroundColor: '#f2f2f2',
                        }}
                        textStyle={{ color: '#5da5a9' }}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default MoodTrack;
