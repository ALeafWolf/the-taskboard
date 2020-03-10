import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

function User({navigation}) {
  const title = 'User Info Page';
  return (
    <View>
      <View style={style.container}>
        <Text>{title}</Text>
      </View>
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
