// react imports
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarChart } from 'react-native-chart-kit';

/* // firebase
import { firebase } from '../../../firebase'; */

// components
import BackButton from '../../components/buttons/BackButton';
import { Dropdown } from 'react-native-element-dropdown';

// get functions
import { getMonth, getMonths, getMonthName } from '../utils/getMonths';

// customisation
import ChartStyle from '../../assets/styles/ChartStyle';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import FormStyle from '../../assets/styles/FormStyle';

 const QuestionnaireStats = ({ navigation }) => {
  // references
 /* const questionnaireRef = firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .collection('questionnaire');
 */
  // states
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthChart, setMonthChart] = useState('');

  /*
   * *******************
   * **** Functions ****
   * *******************
   */

  const currentMonth = getMonth();
  const months = getMonths();

  // fetch questionnaire data
  useEffect(() => {
    const fetchData = async () => {
    /*   try {
        questionnaireRef
          .orderBy('created', 'asc')
          .limit(30)
          .onSnapshot((querySnapshot) => {
            const x = [];
            const y = [];

            querySnapshot.forEach((doc) => {
              const { total, created } = doc.data();
              const date = created.toDate().toString().slice(7, 10);
              const month = getMonthName(created.toDate().getMonth());

              console.log(month);

              if (currentMonth === month) {
                x.push('');
                y.push(total);
              }
            });

            // line chart
            y.unshift(0);
            setX(x);
            setY(y);
            setMonthChart(currentMonth);
          });
      } catch (error) {
        console.error(error);
      } */
    };

    fetchData();
  }, []);

  // handle month selection
  const handleMonthSelected = async (item) => {
    setSelectedMonth(item.value);
    console.log('selected item:', item.value);

    const x = [];
    const y = [];

 /*    const questionnaireSnapshot = await questionnaireRef
      .orderBy('created', 'desc')
      .get(); // get the data once
    try {
      questionnaireSnapshot.forEach((doc) => {
        const { total, created } = doc.data();

        const date = created.toDate().toString().slice(7, 10);
        const month = getMonthName(created.toDate().getMonth());
        console.log(monthChart);
        if (item.value === month) {
          x.push('');
          y.push(total);
          setMonthChart(month);
        }
      });
      y.unshift(0);
      setX(x);
      setY(y);
    } catch (error) {
      console.error(error);
    } */
  };

  return (
    <SafeAreaView style={[FormStyle.container, GlobalStyle.androidSafeArea]}>
      <View style={FormStyle.flexContainer}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text style={FormStyle.title}>Estadísticas</Text>
      </View>

      {/*
       * *********************
       * ***** Bar chart *****
       * *********************
       */}
      <View style={{ paddingHorizontal: 30, marginVertical: 20 }}>
        <Dropdown
          placeholderStyle={{
            color: '#f2f2f2',
            fontFamily: 'DoppioOne',
          }}
          containerStyle={{
            borderRadius: 10,
          }}
          selectedTextStyle={{
            color: '#f2f2f2',
            fontFamily: 'DoppioOne',
            fontSize: 14,
          }}
          itemTextStyle={{ color: '#666a72', fontFamily: 'DoppioOne' }}
          iconStyle={{ tintColor: '#fff' }}
          placeholder={currentMonth}
          data={months.map((month) => ({ label: month, value: month }))}
          value={selectedMonth}
          onChange={(month) => handleMonthSelected(month)}
          labelField="label"
          valueField="value"
        />
      </View>
      {y.length > 0 ? (
        <View>
          <BarChart
            data={{
              labels: x,
              datasets: [
                {
                  data: y,
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.85}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#f2f2f2',
              backgroundGradientTo: '#f2f2f2',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(93, 165, 169, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(40, 42, 45, ${opacity})`,
              style: {
                marginTop: 20,
                backgroundColor: '#f2f2f2',
              },
              propsForDots: {
                r: '3',
                strokeWidth: '1',
                stroke: '#5da5a9',
              },
            }}
            style={ChartStyle.chartStyle}
            bezier
            yAxisInterval={4}
          />

          <Text
            style={{
              position: 'absolute',
              alignSelf: 'center',
              bottom: '3%',
              paddingLeft: 30,
              color: '#666a72',
              fontFamily: 'DoppioOne',
            }}
          >
            {monthChart}
          </Text>
        </View>
      ) : (
        <Text>   Cargando gráfico...</Text>
      )}
      {/* table */}
      <View style={[FormStyle.tableSubContainer, FormStyle.tableShadow]}>
        <View style={FormStyle.tableHeader}>
          <Text style={FormStyle.tableHeaderTitle}>
            Gravedad de la depresión (Eje-y)
          </Text>
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
    </SafeAreaView>
  );
};

export default QuestionnaireStats;
