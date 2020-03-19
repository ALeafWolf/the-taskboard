import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function AddNewTask({navigation}) {
  const pressHandler = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Text>Add New Task Screen</Text>
    </View>
  );
}
