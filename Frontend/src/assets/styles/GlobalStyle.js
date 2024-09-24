import { StatusBar, StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // android
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  // containers
  container: {
    backgroundColor: '#000C7B',
    flex: 1,
  },
  rowTwo: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },

  // row one
  welcomeText: {
    color: '#f2f2fc',
    fontFamily: 'DoppioOne',
    fontSize: 20,
  
    paddingTop: 20,
  },
  subtitle: {
    color: '#f2f2fc',
    fontFamily: 'DoppioOne',
    fontSize: 16,
    paddingLeft: 30,
    paddingTop: 30,
  },
  text: {
    color: '#f2f2fc',
    fontFamily: 'DoppioOne',
    fontSize: 14,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    textAlign: 'center',
  },

  // mood
  moodsContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // statistics
  statsTitle: {
    color: '#5c6169',
    fontFamily: 'DoppioOne',
    fontSize: 16,
    paddingTop: 30,
  },

  // settings button container
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // circular button (questionnaire & medication)
  circularButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 30,
    marginBottom: 30,
  },

  // line (questionnaire)
  line: {
    marginTop: 20,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    marginLeft: 30,
    marginRight: 215,
  },

  // calendar (medication)
  calendarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  selectDate: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  daysContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  daysText: {
    color: '#f2f2f2',
    fontFamily: 'DoppioOne',
    fontSize: 14,
  },

  // line (counselling)
  counsellingLine: {
    marginTop: 20,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#f2f2fc',
  }
});
