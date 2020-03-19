import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function Summary({navigation}) {
  return (
    <View>
      <Text>Task Summary</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Summary;
