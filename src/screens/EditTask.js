import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function EditTask({navigation}){
    console.log(navigation.getParam('title') + "\n" + navigation.getParam('target'));
    return (
        <View>
            <Text>Edit Task</Text>
        </View>
    );
};
