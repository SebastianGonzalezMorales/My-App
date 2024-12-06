import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Importa tus pantallas
import HomeMood from '../screens/Home/HomeMood.js';
import SaludMentalMenu from '../screens/SaludMental/SaludMentalMenu.js';
import MenuUv from '../screens/InformacionUv/MenuUv';
import Profile from '../screens/UserProfile/Profile.js';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: { paddingTop: 10 },
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          let iconColor = focused ? '#000C7B' : '#999';
          let iconSize = 30;

          switch (route.name) {
            case 'HomeMood':
              iconName = focused ? 'home-variant' : 'home-variant-outline';
              break;
            case 'SaludMentalMenu':
              iconName = 'brain';
              break;
            case 'MenuUv':
              iconName = focused ? 'file-document' : 'file-document-outline';
              break;
            case 'Profile':
              iconName = 'account';
              break;
            default:
              iconName = 'circle';
          }

          return <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeMood"
        component={HomeMood}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="SaludMentalMenu"
        component={SaludMentalMenu}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="MenuUv"
        component={MenuUv}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;