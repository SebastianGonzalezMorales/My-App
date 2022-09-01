import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfile from "../Screens/User/UserProfile";
import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";

const Stack = createStackNavigator() 

function MyStack() {

    return (
        <Stack.Navigator>
  
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
  
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                }}
            />
  
            <Stack.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator(){
    return <MyStack />
}