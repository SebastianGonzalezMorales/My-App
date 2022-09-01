import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';   
import { View } from 'react-native';
import Icon from  "react-native-vector-icons/FontAwesome5";

//Stacks
import HomeNavigator from './HomeNavigator';
import UserNavigator from './UserNavigator';
import InformationNavigator from './InformationNavigator';
import SaludMentalNavigator from './SaludMentalNavigator';


const Tab = createBottomTabNavigator();

const Main = () => {

    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: '#0000ff'
            }}
        >
            <Tab.Screen
                name="Salud Mental"
                component={SaludMentalNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon 
                                name="brain"
                                color={color}
                                size={40}
                            />
                        )
                }}
            />
            <Tab.Screen 
                name='Home' 
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({color }) => (
                        <Icon 
                            name="home"
                            style={{position : "relative" }}
                            color={color}
                            size={40}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Information"
                component={InformationNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon 
                            name="info"
                            color={color}
                            size={40}
                            />
                        )
                }}
            />
            <Tab.Screen
                name="User"
                component={UserNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon 
                            name="user"
                            color={color}
                            size={40}
                            />
                        )
                }}
            />     
        </Tab.Navigator>
    )
}

export default Main;