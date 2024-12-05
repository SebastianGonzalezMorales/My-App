import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Importa tus pantallas
import Mood from '../screens/mood/Mood';
import SaludMental from '../screens/SaludMental/SaludMental';
import MenuUv from '../screens/InformacionUv/MenuUv';
import Settings from '../screens/settings/Settings';

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
            case 'Mood':
              iconName = focused ? 'home-variant' : 'home-variant-outline';
              break;
            case 'SaludMental':
              iconName = 'brain';
              break;
            case 'MenuUv':
              iconName = focused ? 'file-document' : 'file-document-outline';
              break;
            case 'Settings':
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
        name="Mood"
        component={Mood}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="SaludMental"
        component={SaludMental}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="MenuUv"
        component={MenuUv}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;