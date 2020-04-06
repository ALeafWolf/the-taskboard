import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';

export default function TaskDetails({navigation}) {
    const item = [navigation.getParam('title'), navigation.getParam('target')];
    const actions = [{
        text: "Edit the task",
        position: 1,
        name: "bt_addTask"
    }];
    const editHandler = () => {
        navigation.navigate("EditTask", item);
    };


  return (
    <View style={style.container}>
        <Text>Task Detail</Text>
      <Text>{navigation.getParam('title')}</Text>
      <Text>{navigation.getParam('target')}</Text>
        <FloatingAction
            actions={actions}
            onPressItem={editHandler} />
    </View>
  );
};
const style = StyleSheet.create({
    container: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1
    },
});
