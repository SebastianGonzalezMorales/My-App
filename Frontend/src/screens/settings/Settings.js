// react imports
import {
    Linking,
    NativeModules,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    View,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  
  // firebase
 
  
  // components
  import CustomButton from '../../components/buttons/CustomButton';
  import SmallFormButton from '../../components/buttons/SmallFormButton';
  import SettingsButton from '../../components/buttons/SettingsButton';
  
  // customisation
  import GlobalStyle from '../../assets/styles/GlobalStyle';
  
  function Settings({ navigation }) {
    // references
  /*  const userRef = firebase
       .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid); */
  
    // states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    /*
     * *******************
     * **** Functions ****
     * *******************
     */
  
    // hook to fetch user's data
    useEffect(() => {
 /*      const fetchName = async () => {
        userRef.onSnapshot((snapshot) => {
          const { fullName, email } = snapshot.data();
          setName(fullName);
          setEmail(email);
        });
      }; */
      fetchName();
    }, []);
  
    // sign out function
    const handleSignOut = () => {
/*       firebase
        .auth()
        .signOut()
        .then(() => {
          navigation.replace('Login');
        }); */
    };
  
    // go to settings
    const { RNAndroidOpenSettings } = NativeModules;
    const openAppPrefs = () => {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings://notification/HealthApplication');
      } else {
        RNAndroidOpenSettings.generalSettings();
      }
    };
  
    /*
     * ****************
     * **** Screen ****
     * ****************
     */
  
    return (
      <SafeAreaView style={[GlobalStyle.container, GlobalStyle.androidSafeArea]}>
        {/*
         * *********************
         * ***** Section 1 *****
         * *********************
         */}
        <View style={{ height: 225 }}>
          <Text style={GlobalStyle.welcomeText}>{name}</Text>
          <Text style={GlobalStyle.subtitle}>{email}</Text>
          <View style={GlobalStyle.buttonContainer}>
            <SmallFormButton
              onPress={() => navigation.navigate('EditProfile')}
              text="Edit profile"
            />
          </View>
        </View>
  
        {/*
         * *********************
         * ***** Section 2 *****
         * *********************
         */}
        <View style={GlobalStyle.rowTwo}>
          <View style={GlobalStyle.statsContainer}>
            <Text style={GlobalStyle.statsTitle}>Settings</Text>
          </View>
          <ScrollView>
            <View style={{ marginTop: 10 }}>
             {/*  <SettingsButton
                text="WeBt"
                onPress={() => navigation.navigate('Counselling')}
              /> */}
              <SettingsButton
                text="Counselling information"
              /*   onPress={() => navigation.navigate('Counselling')} */
              />
              {/* <SettingsButton text="Notifications" onPress={() => navigation.navigate('Counselling')} /> */}
             {/*  <SettingsButton
                text="Privacy policy"
                 onPress={() => navigation.navigate('Notification')}
              /> */}
              <CustomButton
                buttonStyle={{
                  backgroundColor: '#f7d8e3',
                }}
                textStyle={{
                  color: '#d85a77',
                }}
                onPress={() => handleSignOut()}
                title="Sign out"
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
  
  export default Settings;
  