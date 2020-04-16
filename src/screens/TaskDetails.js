import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Fab} from 'native-base';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TaskDetails({navigation}) {
    const item = [navigation.param];
    // console.log(item);
    const actions = [{
        text: 'Edit the task',
        position: 1,
        name: 'bt_addTask',
    }];
    const editHandler = () => {
        navigation.navigate('EditTask');
    };


    return (
        <View style={style.container}>
            <Text>{navigation.getParam('id')}</Text>
            <Text>{navigation.getParam('title')}</Text>
            <Text>{navigation.getParam('createdDate')}</Text>
            <Fab
                onPress={editHandler}
                position={'bottomRight'}>
                <Icon name="pencil"/>
            </Fab>
        </View>
    );
};
const style = StyleSheet.create({
    container: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
    },
});
