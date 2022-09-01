import react from "react";
import { ScrollView, Dimensions, StyleSheet, Text } from "react-native";

var { width } = Dimensions.get('window');

const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle ={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        marginBottom: 600,
        marginLeft: 80,
        width: width,
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        fontSize: 30,
    }
})

export default FormContainer;