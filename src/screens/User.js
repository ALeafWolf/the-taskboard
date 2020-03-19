import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

function User({navigation}) {
  return (
    <View>
      <Text>User Information</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default User;
