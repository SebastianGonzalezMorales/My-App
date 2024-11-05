import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { fetchWithToken } from '../utils/apiHelpers';
import { Dropdown } from 'react-native-element-dropdown';
import { getMonth, getMonths, getMonthName } from '../utils/getMonths';
import ChartStyle from '../../assets/styles/ChartStyle';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import FormStyle from '../../assets/styles/FormStyle';

import BackButton from '../../components/buttons/BackButton';

const MoodStats = ({ navigation }) => {
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [malCounter, setMalCount] = useState(0);
  const [regularCounter, setRegularCount] = useState(0);
  const [bienCounter, setBienCount] = useState(0);
  const [excelenteCounter, setExcelenteCount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthChart, setMonthChart] = useState('');

  const pieChartData = [
    { name: 'Mal', count: malCounter, color: '#d85a77', legendFontColor: '#7F7F7F', legendFontSize: 14 },
    { name: 'Regular', count: regularCounter, color: '#238bdf', legendFontColor: '#7F7F7F', legendFontSize: 14 },
    { name: 'Bien', count: bienCounter, color: '#109f5c', legendFontColor: '#7F7F7F', legendFontSize: 14 },
    { name: 'Excelente', count: excelenteCounter, color: '#cc8e62', legendFontColor: '#7F7F7F', legendFontSize: 14 },
  ];

  const currentMonth = getMonth();
  const months = getMonths();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moodData = await fetchWithToken('/moodState/get-MoodStatesByUserId');

        const x = [];
        const y = [];

        let mal = 0;
        let regular = 0;
        let bien = 0;
        let excelente = 0;

        const currentMonthAbbr = currentMonth.slice(0, 3);
        moodData.data.forEach((moodEntry) => {
          const { mood_state, intensidad, date } = moodEntry;
          const month = new Date(date).toLocaleString('default', { month: 'short' });
          if (month === currentMonthAbbr) {
            x.push('');
            y.push(intensidad);

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
            }
          }
        });

        y.unshift(0);
        setX(x);
        setY(y);

        setMalCount(mal);
        setRegularCount(regular);
        setBienCount(bien);
        setExcelenteCount(excelente);
        setMonthChart(currentMonth);
      } catch (error) {
        console.error('Error al obtener los estados de ánimo:', error);
      }
    };

    fetchData();
  }, []);

  const handleMonthSelected = async (item) => {
    setSelectedMonth(item.value);

    try {
      const moodData = await fetchWithToken('/moodState/get-MoodStatesByUserId');
      const x = [];
      const y = [];

      let mal = 0;
      let regular = 0;
      let bien = 0;
      let excelente = 0;

      moodData.data.forEach((moodEntry) => {
        const { mood_state, intensidad, date } = moodEntry;
        const month = getMonthName(new Date(date).getMonth());

        if (item.value === month) {
          x.push('');
          y.push(intensidad);
          setMonthChart(month);

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
          }
        }
      });

      y.unshift(0);
      setX(x);
      setY(y);

      setMalCount(mal);
      setRegularCount(regular);
      setBienCount(bien);
      setExcelenteCount(excelente);
    } catch (error) {
      console.error('Error al obtener los estados de ánimo:', error);
    }
  };

  return (
    <SafeAreaView style={[FormStyle.container, GlobalStyle.androidSafeArea]}>
      <View style={FormStyle.flexContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={FormStyle.title}>Estadísticas de Estado de Ánimo</Text>
      </View>

      <View style={{ paddingHorizontal: 30, marginVertical: 20 }}>
        <Dropdown
          placeholderStyle={{ color: '#f2f2f2', fontFamily: 'DoppioOne' }}
          containerStyle={{ borderRadius: 10 }}
          selectedTextStyle={{ color: '#f2f2f2', fontFamily: 'DoppioOne', fontSize: 14 }}
          itemTextStyle={{ color: '#666a72', fontFamily: 'DoppioOne' }}
          iconStyle={{ tintColor: '#fff' }}
          placeholder={currentMonth}
          data={months.map((month) => ({ label: month, value: month }))}
          value={selectedMonth}
          onChange={(item) => handleMonthSelected(item)}
          labelField="label"
          valueField="value"
        />
      </View>

      {y.length > 0 ? (
        <View>
          <LineChart
            data={{ labels: x, datasets: [{ data: y }] }}
            width={Dimensions.get('window').width * 0.85}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#f2f2f2',
              backgroundGradientTo: '#f2f2f2',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(93, 165, 169, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(40, 42, 45, ${opacity})`,
              propsForDots: { r: '3', strokeWidth: '1', stroke: '#5da5a9' },
            }}
            style={ChartStyle.chartStyle}
            bezier
            yAxisInterval={4}
          />
          <Text style={{ position: 'absolute', alignSelf: 'center', bottom: '3%', paddingLeft: 30, color: '#666a72', fontFamily: 'DoppioOne' }}>
            {monthChart}
          </Text>
        </View>
      ) : (
        <Text>Cargando gráfico...</Text>
      )}

      <View style={ChartStyle.legendContainer}>
        <Text style={ChartStyle.legendtext}>1 - Mal</Text>
        <Text style={ChartStyle.legendtext}>2 - Regular</Text>
        <Text style={ChartStyle.legendtext}>3 - Bien</Text>
        <Text style={ChartStyle.legendtext}>4 - Excelente</Text>
      </View>

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
    </SafeAreaView>
  );
};

export default MoodStats;
