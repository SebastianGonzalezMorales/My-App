// react imports
import { Alert, FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// firebase
/* import { firebase } from '../../../firebase'; */

// Import the API URL from environment variables
import { API_URL } from '@env';

// components
import BackButton from '../../components/buttons/BackButton';
import FormButton from '../../components/buttons/FormButton';
import OptionButton from '../../components/buttons/OptionButton';
import SmallFormButton from '../../components/buttons/SmallFormButton';

// customisation
import FormStyle from '../../assets/styles/FormStyle';
import GlobalStyle from '../../assets/styles/GlobalStyle';

const Test = ({ navigation }) => {
  // references
  /*   const userRef = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid);
   */
  /* const questionsRef = firebase.firestore().collection('questions'); */

  // states
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
 const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [date, setDate] = useState('');
  const [severity, setSeverity] = useState('');

  /*
   * *******************
   * **** Functions ****
   * *******************
   */

  // get all questions from the database
  // get all questions from the API
  useEffect(() => {
    const getQuestions = async () => {
      setSelectedOptions({});
      setShowResults(false);
      try {

        const token = await AsyncStorage.getItem('token');

        if (token) {

          const response = await axios.get(`${API_URL}/questions/get-questions`, { // obtén las preguntas desde tu API
            headers: {
              'Authorization': `Bearer ${token}`  // Usa el token recuperado
            }
          });
          const questions = response.data; // Asumiendo que la respuesta tiene la estructura adecuada
          //console.log(questions)
          setQuestions(questions);
        } else {
          console.log('No se encontró el token. Por favor, inicia sesión.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    getQuestions();
  }, []);



  // set the selected option
  const handleSelectedOptions = (index, option) => {
    setSelectedOptions({
      ...selectedOptions, // spread operator to copy existing object into another object
      [index]: option, // set selected option on the current index
    });
  };
  // submit for results and set data to database
  const handleSubmit = async () => {
    let total = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.selectedoption1) {
        total = total + 0;
      } else if (selectedOptions[index] === question.selectedoption2) {
        total = total + 1;
      } else if (selectedOptions[index] === question.selectedoption3) {
        total = total + 2;
      } else if (selectedOptions[index] === question.selectedoption4) {
        total = total + 3;
      }
    });

    let severity = '';
    if (total >= 0 && total <= 4) {
      severity = 'Normal';
    } else if (total > 4 && total < 10) {
      severity = 'Leve';
    } else if (total >= 10 && total < 15) {
      severity = 'Moderado';
    } else if (total >= 15 && total < 20) {xx
      severity = 'Moderadamente grave';
    } else {
      severity = 'Grave';
    }

    setSeverity(severity);
    setScore(total);
    setShowResults(true);

    // get date
    const date = new Date().toDateString().slice(4, 15);
    setDate(date);

    // Enviar los resultados a la API
    try {
      // Recupera el token del almacenamiento
      const token = await AsyncStorage.getItem('token');

      if (token) {
        // Llama al backend para obtener el userId usando el token
        const userResponse = await axios.post(`${API_URL}/users/userid`, {
          token: `${token}`
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userId = userResponse.data.userId; // Extrae el userId de la respuesta

        // Ahora envía los resultados de la prueba
        const response = await axios.post(`${API_URL}/resultsTests/post-resultsTest`, {
          userId,    // Usa el userId obtenido
          total,
          severity,
          date,
          created: new Date() // O usa el formato que necesites
        }, {
          headers: {
            'Authorization': `Bearer ${token}` // Usar el token recuperado
          }
        });

        console.log('Datos enviados correctamente:', response.data);
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      Alert.alert('Error', 'No se pudo enviar los resultados. Por favor, inténtalo de nuevo.');
    }
  };


  /*
   * ****************
   * **** Screen ****
   * ****************
   */

  // display if no questions have been loaded in yet
  if (questions.length === 0) {
    return (
      <View>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text>Cargando...</Text>
      </View>
    );
  }

  // if showResults has been set to true
  if (showResults) {
    return (
      <SafeAreaView style={[FormStyle.container, GlobalStyle.androidSafeArea]}>
        <View style={FormStyle.resultContainer}>
          <Text style={FormStyle.resultTextOne}>Tu resultado</Text>
          <Text style={FormStyle.resultTextTwo}>
            {score} / {questions.length * 3}
          </Text>
          <Text style={FormStyle.resultTextThree}>{severity}</Text>
        </View>

        <View style={FormStyle.tableContainer}>

          <View style={[FormStyle.tableRowOdd, [FormStyle.tableRowEnd, {borderRadius: 10}, {backgroundColor: '#f2f2f2'}]]}>
            <Text style={[FormStyle.tableText, { color: '#5c6169' }]}>Fecha del test</Text>
            <Text style={[FormStyle.tableText, { color: '#5c6169' }]}>{date}</Text>
          </View>

          <View style={FormStyle.tableSubContainer}>
            <View style={FormStyle.tableHeader}>
              <Text style={FormStyle.tableHeaderTitle}>
                Clasificación del Test
              </Text>
            </View>
            {/* Subtítulos para las columnas */}
            <View style={FormStyle.tableColumnHeader}>
              <Text style={FormStyle.tableColumnText}>Estado</Text>
              <Text style={FormStyle.tableColumnText}>Puntaje</Text>
            </View>

            <View style={FormStyle.tableRowOdd}>
              <Text style={FormStyle.tableText}>Normal</Text>
              <Text style={FormStyle.tableText}>0 - 4</Text>
            </View>
            <View style={FormStyle.tableRowEven}>
              <Text style={FormStyle.tableText}>Leve</Text>
              <Text style={FormStyle.tableText}>5 - 9</Text>
            </View>
            <View style={FormStyle.tableRowOdd}>
              <Text style={FormStyle.tableText}>Moderado</Text>
              <Text style={FormStyle.tableText}>10 - 14</Text>
            </View>
            <View style={FormStyle.tableRowEven}>
              <Text style={FormStyle.tableText}>Moderadamente grave</Text>
              <Text style={FormStyle.tableText}>15 - 19</Text>
            </View>
            <View style={[FormStyle.tableRowOdd, FormStyle.tableRowEnd]}>
              <Text style={FormStyle.tableText}>Grave</Text>
              <Text style={FormStyle.tableText}>20 - 27</Text>
            </View>
          </View>
        </View>

        <View style={[FormStyle.buttonContainer, FormStyle.buttonPosition]}>
          <FormButton
            onPress={() => navigation.navigate('Questionnaire')}
            text="Volver atrás"
            buttonStyle={{
              backgroundColor: '#f2f2f2',
            }}
            textStyle={{ color: '#5da5a9' }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[FormStyle.container, GlobalStyle.androidSafeArea]}>
      <View style={FormStyle.flexContainer}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text style={FormStyle.title}>PHQ-9</Text>
      </View>

      {/* questionnaire */}
      <FlatList
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            {index === 0 && (
              <Text style={FormStyle.questionnaireText}>
                Durante las últimas dos semanas, ¿ con qué frecuencia le han molestado alguno de los siguientes problemas ?
              </Text>
            )}
            <Text style={FormStyle.question}>{item.question}</Text>
            <View style={FormStyle.optionContainer}>
              <OptionButton
                buttonStyle={[
                  selectedOptions[index] === 0 && FormStyle.selectedOption,
                ]}
                textStyle={
                  selectedOptions[index] === 0 && FormStyle.selectedOptionText
                }
                onPress={() => handleSelectedOptions(index, 0)}
                text={item.option1}
              />
              <OptionButton
                buttonStyle={[
                  selectedOptions[index] === 1 && FormStyle.selectedOption,
                ]}
                textStyle={
                  selectedOptions[index] === 1 && FormStyle.selectedOptionText
                }
                onPress={() => handleSelectedOptions(index, 1)}
                text={item.option2}
              />
              <OptionButton
                buttonStyle={[
                  selectedOptions[index] === 2 && FormStyle.selectedOption,
                ]}
                textStyle={
                  selectedOptions[index] === 2 && FormStyle.selectedOptionText
                }
                onPress={() => handleSelectedOptions(index, 2)}
                text={item.option3}
              />
              <OptionButton
                buttonStyle={[
                  selectedOptions[index] === 3 && FormStyle.selectedOption,
                ]}
                textStyle={
                  selectedOptions[index] === 3 && FormStyle.selectedOptionText
                }
                onPress={() => handleSelectedOptions(index, 3)}
                text={item.option4}
              />
            </View>
            {/* buttons */}
            {index === 8 && (
              <View style={FormStyle.smallButtonContainer}>
                <SmallFormButton onPress={handleSubmit} text={'Responder'} />
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Test;
