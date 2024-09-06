// react imports
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';


// components
import AuthButton from '../../components/buttons/AuthButton';
import SmallAuthButton from '../../components/buttons/SmallAuthButton';


// customisation
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthStyle from '../../assets/styles/AuthStyle';

const Login = ({ navigation }) => {
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    /*
   * *******************
   * **** Functions ****
   * *******************
   */

  // clear onboarding from asyncstorage
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding');
    } catch (error) {
      console.log('Error @clearOnboarding', error);
    }
  };

  // Login function
  const handleLogin = async (email, password) => {
    try {
    //  await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.replace('Home');
    } catch (error) {
      alert(error.message);
    }
  };

  
  /*
   * ****************
   * **** Screen ****
   * ****************
   */

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={AuthStyle.container}>
        {/*
         * *********************
         * ***** Section 1 *****
         * *********************
         */}
        <View style={AuthStyle.rowOne}>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="10%" cy="30%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="2%" cy="70%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="30%" cy="50%" r="30" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="25%" cy="95%" r="30" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="52%" cy="70%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="64%" cy="20%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="70%" cy="100%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="75%" cy="60%" r="30" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="95%" cy="35%" r="25" />
          </Svg>
          <Svg style={{ position: 'absolute' }}>
            <Circle opacity={0.2} fill="#abced5" cx="100%" cy="85%" r="30" />
          </Svg>
          <SafeAreaView style={AuthStyle.logo}>
            <TouchableOpacity
              onPress={clearOnboarding}
              style={{ marginTop: 20 }}
            >
              <Image
                style={{ width: 80, height: 80 }}
                source={require('./../../../assets/adaptive-icon.png')}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        {/*
         * *********************
         * ***** Section 2 *****
         * *********************
         */}

        {/* inputs */}
        <View style={AuthStyle.rowTwo}>
          <Text style={AuthStyle.title}>Iniciar sesión</Text>
          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              style={AuthStyle.icon}
            />
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)} // every time the text changes, we can set the email to that text (callback function)
              placeholder="Email address"
              placeholderTextColor="#92959f"
              selectionColor="#5da5a9"
              style={AuthStyle.input}
            />
          </View>
          <View style={AuthStyle.inputContainer}>
            <MaterialCommunityIcons
              name="lock-open-outline"
              size={24}
              style={AuthStyle.icon}
            />
            <TextInput
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderTextColor="#92959f"
              secureTextEntry
              selectionColor="#5da5a9"
              style={AuthStyle.input}
            />
          </View>

          {/* buttons */}
          <AuthButton
            text="Ingresar"
            onPress={() => handleLogin(email, password)}
          />

          <View style={AuthStyle.changeScreenContainer}>
            <Text style={AuthStyle.changeScreenText}>
            ¿Aún tienes una cuenta?
            </Text>
            <SmallAuthButton
              text="Regístrate"
              onPress={() => navigation.replace('Register')}
            />
          </View>
        
          <TouchableOpacity onPress={clearOnboarding} style={{ marginTop: 20 }}>
            <Text>Clear onboarding</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
