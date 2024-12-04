import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { fetchWithToken } from '../utils/apiHelpers';
import ChartStyle from '../../assets/styles/ChartStyle';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import FormStyle from '../../assets/styles/FormStyle';

import BackButton from '../../components/buttons/BackButton';

const MoodStats = ({ navigation }) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentMonth = new Date().getMonth(); // Mes actual (0 = enero, 11 = diciembre)
  const currentYear = new Date().getFullYear(); // Año actual

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moodData = await fetchWithToken('/moodState/get-MoodStatesByUserId');

        console.log('Datos recibidos de la API:', moodData);

        let mal = 0;
        let regular = 0;
        let bien = 0;
        let excelente = 0;

        moodData.data.forEach((moodEntry) => {
          const { mood_state, date } = moodEntry;

          const entryDate = new Date(date);
          const entryMonth = entryDate.getMonth(); // Extraer mes de la fecha
          const entryYear = entryDate.getFullYear(); // Extraer año de la fecha

          if (entryMonth === currentMonth && entryYear === currentYear) {
            console.log(`Estado de ánimo detectado (${entryDate}):`, mood_state);

            switch (mood_state) {
              case 'Mal':
                mal++;
                break;
              case 'Regular':
                regular++;
                break;
              case 'Bien':
                bien++;
                break;
              case 'Excelente':
                excelente++;
                break;
              default:
                console.log('Estado de ánimo desconocido:', mood_state);
                break;
            }
          }
        });

        // Configurar los datos del gráfico de torta
        const data = [
          { name: 'Mal', count: mal, color: '#d85a77', legendFontColor: '#7F7F7F', legendFontSize: 14 },
          { name: 'Regular', count: regular, color: '#238bdf', legendFontColor: '#7F7F7F', legendFontSize: 14 },
          { name: 'Bien', count: bien, color: '#109f5c', legendFontColor: '#7F7F7F', legendFontSize: 14 },
          { name: 'Excelente', count: excelente, color: '#cc8e62', legendFontColor: '#7F7F7F', legendFontSize: 14 },
        ];

        console.log('Datos procesados para el gráfico:', data);
        setPieChartData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los estados de ánimo:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={[FormStyle.container, GlobalStyle.androidSafeArea]}>
      <View style={FormStyle.flexContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={[FormStyle.title, { left: 30 }]}>Estadísticas del último mes</Text>
      </View>

      {loading ? (
        <Text>Cargando datos...</Text>
      ) : (
        <View style={ChartStyle.pieChartContainer}>
          <PieChart
            data={pieChartData}
            width={Dimensions.get('window').width * 0.85}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#f2f2f2',
              backgroundGradientTo: '#f2f2f2',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(93, 165, 169, ${opacity})`,
            }}
            accessor="count"
            backgroundColor="transparent"
            style={ChartStyle.pieChartStyle}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MoodStats;
