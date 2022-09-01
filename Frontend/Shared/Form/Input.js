import react from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            name={props.name}
            id={props.id}
            value={props.value}
            autoCorrect={props.autoCorrect}
            onChangeText={props.onChangeText}
            onFocus={props.onFocus}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
        >    
        </TextInput>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '60%',
        height:45,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: 'blue'
    }
})


export default Input