import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function TaskDetails({navigation}) {
  return (
    <View>
      <Text>{navigation.getParam('title')}</Text>
      <Text>{navigation.getParam('target')}</Text>
    </View>
  );
}
