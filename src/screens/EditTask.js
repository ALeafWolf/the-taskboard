import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function EditTask({navigation}){
    const ref =  firestore().collection('tasks').doc(navigation.getParam('id'));
    let [loaded, setLoaded] = useState(false);
    let [detail, setDetail] = useState({});


    return (
        <View>
            <Text>Edit Task</Text>
        </View>
    );
};
