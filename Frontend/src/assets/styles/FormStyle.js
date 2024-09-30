import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // containers
  container: {
    backgroundColor: '#000C7B',
    flex: 1,
    paddingTop: 20,
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // custom header
  flexContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 20,
    left: 120,
    position: 'relative',
    right: 120,
    textAlign: 'center',
    marginTop: 20, 
  },

  // activities
  subtitle: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 16,
    marginTop: 30,
  },
  flatListContainer: {
    height: 200,
  },
  activitiesContainer: {
    marginLeft: 6,
    marginRight: 6,
    marginTop: 30,
  },
  activityContainer: {
    alignItems: 'center',
    borderRadius: 10,
    height: 70,
    justifyContent: 'center',
    width: 60,
  },
  activityIcon: {
    marginBottom: 10,
  },
  activityText: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 10,
  },
  seeMoreText: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 12,
    marginTop: 10,
  },

  // inputs
  inputContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
  text: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 13,
    marginTop: 20,
  },

  // buttons
  buttonContainer: {
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },

  buttonPosition: {
    marginTop: 20,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },

  // questionnaire
  questionnaireText: {
    color: '#f2f2f2',
    fontFamily: 'Actor',
    fontSize: 18,
    paddingHorizontal: 40,
    paddingTop: 30,
    textAlign: 'center',
  },
  question: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 16,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 10,
  },
  optionContainer: {
    paddingHorizontal: 30,
  },
  selectedOption: {
    backgroundColor: '#f2f2f2',
  },
  selectedOptionText: {
    color: '#7db7ba',
  },
  smallButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },

  // results
  resultContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  resultTextOne: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 20,
  },
  resultTextTwo: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 36,
    marginTop: 30,
  },
  resultTextThree: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 20,
    marginTop: 30,
  },

  // table
  tableContainer: {
    marginTop: 40,
    paddingHorizontal: 30,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tableHeaderTitle: {
    color: '#5c6169',
    fontFamily: 'DoppioOne',
    fontSize: 14,
  },
  tableRowOdd: {
    backgroundColor: 'rgba(241, 241, 254, 0.3)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableRowEven: {
    backgroundColor: 'rgba(241, 241, 254, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableRowEnd: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  tableText: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 14,
  },
  tableSubContainer: {
    marginTop: 30,
  },
  tableShadow: {
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  // return home button
  buttonPosition: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
  },

  // text container
  textContainer: {
    backgroundColor: '#7db7ba',
    height: 60,
    borderRadius: 10,
    marginTop: 10,
  },

  // text view (Track)
  textBox: {
    backgroundColor: '#7db7ba',
    height: 60,
    borderRadius: 10,
    marginTop: 10,
  },

  // date time picker style (TrackMedication)
  startTimeContainer: {
    backgroundColor: '#7db7ba',
    color: '#abced5',
    height: 60,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dateTimePicker: {
    marginRight: 20,
    left: 0,
  },

  // drop down styles (TrackMedication)
  placeholderStyle: {
    color: '#abced5',
    fontFamily: 'DoppioOne',
    marginLeft: 20,
  },
  iconStyle: { marginRight: 20 },
  containerStyle: {
    borderRadius: 10,
    backgroundColor: '#7db7ba',
    borderColor: '#7db7ba',
  },
  itemTextStyle: { color: '#f2f2f2', fontFamily: 'DoppioOne' },
  selectedTextStyle: {
    color: '#fff',
    borderRadius: 10,
    marginLeft: 20,
    fontFamily: 'DoppioOne',
    fontSize: 14,
  },
  dropdownStyle: {
    marginTop: 10,
    backgroundColor: '#7db7ba',
    height: 60,
    borderRadius: 10,
  },
});
