import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function LibraryHome({navigation}) {
  return (
    <View>
      <Text>Task Library</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LibraryHome;
