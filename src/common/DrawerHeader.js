import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Header({navigation, title}) {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={style.header}>
      <Text style={style.icon} onPress={openDrawer}>
        ?
      </Text>
      <View>
        <Text style={style.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#a3a9ad',
  },
  icon: {
    left: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#000',
  },
});
