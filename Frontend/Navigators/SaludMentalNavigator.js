import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SaludMental from "../Screens/SaludMental/SaludMental";


const Stack = createStackNavigator() 

function MyStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Salud Mental"
                component={SaludMental}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function SaludMentalNavigator(){
    return <MyStack />
}