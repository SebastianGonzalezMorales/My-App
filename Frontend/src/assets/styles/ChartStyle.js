import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // line chart
  chartStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 10,
    alignItems: 'center',
    
  },

  // pie chart
  pieChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieChartStyle: {
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 10,
    paddingLeft: 15,
  },

  // text
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'DoppioOne',
    color: '#f2f2f2',
    fontSize: 14,
  },

  textContainer: {
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 10,
  },
  text: {
    fontFamily: 'DoppioOne',
    color: '#f2f2f2',
    fontSize: 14,
  },

  // legend
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 30,
  },
  legendtext: {
    fontFamily: 'DoppioOne',
    color: '#f2f2f2',
  },
});
