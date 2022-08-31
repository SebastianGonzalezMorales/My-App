import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

const Todo = (props) => {
    return(
        <View style={[{ margin: 8, padding: 8}, styles.item]}>
            <Text>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 5,
        background: 'whitesmoke'
    }
})

export default Todo;