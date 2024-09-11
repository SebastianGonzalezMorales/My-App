import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // containers
  container: {
    backgroundColor: '#000C7B',
    flex: 1,
    flexDirection: 'column',
  },
  rowOne: {
    height: 220,
  },
  rowTwo: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },

  // logo
  logo: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontFamily: 'DoppioOne',
    fontSize: 24,
  },

  // title
  title: {
    alignSelf: 'flex-start',
    color: '#000C7B',
    fontFamily: 'DoppioOne',
    fontSize: 24,
    marginTop: 30,
  },

  // input style
  inputContainer: {
    backgroundColor: '#f1f1fe',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 5, // Asegura espacio dentro del contenedor
    marginBottom: 1, // Espacio debajo del contenedor
    flexDirection: 'row',
    height: 60,
    marginTop: 20,
    width: '100%',
  },
  icon: {
    alignSelf: 'center',
    color: '#5da5a9',
    marginLeft: 20,
    width: '10%',
  },
  input: {
    color: '#333943',
    fontFamily: 'DoppioOne',
    fontSize: 12,
    marginLeft: 10,
    width: '70%',
  },

  // other
  changeScreenContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  changeScreenText: {
    color: '#85888e',
    fontFamily: 'Actor',
    fontSize: 12,
    right: 5,
    paddingBottom: 20
  },
});
