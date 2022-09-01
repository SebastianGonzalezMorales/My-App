import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from '../../Shared/Form/FormContainer' ;
import Input from '../../Shared/Form/Input';

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <FormContainer title={"Iniciar sesión"}>
            <Text>
                
            </Text>
            <Input
                placeholder={"Correo"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Text>
                
            </Text>            

            <Input
                placeholder={"Contraseña"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text)=> setPassword(text)}
            />
            <Text>
                
            </Text>
            
            <View style={styles.buttonGroup}>
                <Button title="Ingresar" />
            </View>
            <View style={[{marginTop: 30}, styles.buttonGroup]}>
                <Text style={styles.middleText}>    Aún no tienes una cuenta ? Registrate aquí !</Text>
                <Button title="Registrarse" onPress={
                    () => props.navigation.navigate("register")}/>
            </View>
        </FormContainer>

    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        marginLeft: -35,
        alignItems: 'center'       
    },
    middleText:{
        marginBottom:20,
        alignSelf: 'center'
    }
})

export default Login;