import React, {useState} from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import Todo from './Todo';

const TodoList = () => {

    const [title, setTitle] = useState('Todolist')

    return(
        <View style={{width: '80%', marginBottom: 60 }}>
            <Text style={[styles.align, styles.font]}>{title}</Text>
            <Todo name={'First Todo'} />
            <Todo name={'Second Todo'} />
            <Button title='Change me' onPress={() => setTitle('My List')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    align: {
        alignSelf: 'center'
    },
    font: {
        fontSize:20,
        fontWeight: 'bold'
    }
})

export default TodoList;