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
/*   rowTwo: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20,  // Espacio entre secciones
  },
 */

  rowTwo: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },


  titleWhite: {
    color: '#000C7B',
    fontFamily: 'DoppioOne',
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 10,  // Espacio entre el título y la siguiente sección
    textAlign: 'left',  // Alineación a la izquierda
  },

  titleWhitee: {
    color: '#fff',
    fontFamily: 'DoppioOne',
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 10,  // Espacio entre el título y la siguiente sección
    textAlign: 'left',  // Alineación a la izquierda
  },

  subtitleBlack: {
    color: '#5c6169',
    fontFamily: 'DoppioOne',
    fontSize: 16,
    paddingTop: 5,
    textAlign: 'left',
  },

  // Contenedor exterior para el borde negro
  outerContainer: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    borderWidth: 2,
    borderColor: '#000C7B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',  // Agregar sombra
    shadowOffset: { width: 0, height: 4 },  // Desplazamiento de la sombra
    shadowOpacity: 0.3,  // Opacidad de la sombra
    shadowRadius: 4,  // Difusión de la sombra
    elevation: 5,  // Para que funcione en Android
    backgroundColor: '#fff',  // Fondo blanco para resaltar el botón
    marginHorizontal: 10,   // Añadir espacio horizontal entre los botones
    marginBottom: 20,  // Aumentar el espacio debajo del contenedor
  },

  // La imagen en sí
  storyImage: {
    width: '100%',  // La imagen ocupa todo el ancho del contenedor
    height: '100%',  // La imagen ocupa todo el alto del contenedor
    borderRadius: 50,  // Mantener la imagen redondeada dentro del contenedor blanco
    resizeMode: 'cover',  // Ajustar la imagen sin distorsionar
  },
  // Contenedor de las historias
  storiesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',  // Permite que las filas se ajusten
    padding: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 80, //Aumentar el espacio entre filas
  },

  // row one
  welcomeText: {
    color: '#f2f2fc',
    fontFamily: 'DoppioOne',
    fontSize: 20,
    paddingLeft: 30,
    paddingTop: 20,
  },
  subtitle: {
    color: '#f2f2fc',
    fontFamily: 'DoppioOne',
    fontSize: 16,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    textAlign: 'justify',
    
  },

  subtitleMenu: {
    color: '#f2f2fc',
    fontFamily: 'DoppioOne',
    fontSize: 15,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    textAlign: 'justify',
    
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
  },

  responseBox: {
    backgroundColor: '#F0F4F8', // Fondo claro para destacar el recuadro
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#B0BEC5', // Color de borde para definir el recuadro
  },
  buttonIcon: {
    fontSize: 18,
    color: '#00796B', // Color de la flecha para que sea visible
  },
  sectionContent: {
    textAlign: 'justify', // Para justificar el texto
    color: '#424242', // Color del texto
    fontSize: 14, // Tamaño de la fuente
    lineHeight: 20, // Espaciado entre líneas para mejor legibilidad
    paddingHorizontal: 1, // Espaciado horizontal dentro del recuadro
    paddingVertical: 5, // Espaciado vertical dentro del recuadro
  },
  


});
