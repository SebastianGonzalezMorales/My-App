import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Information from "../Screens/Information/Information";

const Stack = createStackNavigator() 

function MyStack() {

    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Information"
                component={Information}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function InformationNavigator(){
    return <MyStack />
}