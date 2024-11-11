import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importamos los iconos

// customisation
import GlobalStyle from '../../assets/styles/GlobalStyle';

function SaludMental({ navigation }) {
  return (
      <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
          
          {/* Encabezado con título y subtítulo centrados */}
          <View style={{ paddingTop: 40, alignItems: 'left', paddingHorizontal: 20 }}>
              <Text style={[GlobalStyle.welcomeText, { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'left' }]}>
                  Salud Mental
              </Text>
              <Text style={[GlobalStyle.text, { textAlign: 'left', marginTop: 10, color: 'white' }]}>
                  Cuida tu bienestar emocional
              </Text>
          </View>

          {/* Contenedor de Botones */}
          <View style={{
              padding: 20,
              marginTop: 30,
              borderRadius: 15,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              marginHorizontal: 20
          }}>
              <ScrollView>
                  <View style={{ marginTop: 10 }}>

                      {/* Botón "Aprende sobre Salud Mental" */}
                      <TouchableOpacity
                          style={{
                              backgroundColor: '#E3F2FD',
                              padding: 15,
                              borderRadius: 10,
                              marginBottom: 15,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                          }}
                          onPress={() => navigation.navigate('Counselling')}
                      >
                          <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <Icon name="book" size={24} color="#4A90E2" style={{ marginRight: 10 }} />
                                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4A90E2' }}>Aprende sobre Salud Mental</Text>
                              </View>
                              <Text style={{ fontSize: 14, color: '#4A90E2', marginTop: 5 }}>
                                  Explora artículos y recursos
                              </Text>
                          </View>
                          <Icon name="chevron-right" size={20} color="#4A90E2" />
                      </TouchableOpacity>

                      {/* Botón "Test" */}
                      <TouchableOpacity
                          style={{
                              backgroundColor: '#E3F2FD',
                              padding: 15,
                              borderRadius: 10,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                          }}
                          onPress={() => navigation.navigate('Tests')}
                      >
                          <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <Icon name="check-circle" size={24} color="#4A90E2" style={{ marginRight: 10 }} />
                                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4A90E2' }}>Test</Text>
                              </View>
                              <Text style={{ fontSize: 14, color: '#4A90E2', marginTop: 5 }}>
                                  Realiza un test de bienestar emocional
                              </Text>
                          </View>
                          <Icon name="chevron-right" size={20} color="#4A90E2" />
                      </TouchableOpacity>

                  </View>
              </ScrollView>
          </View>
      </SafeAreaView>
  );
}

export default SaludMental;
