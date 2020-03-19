import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

export default function Header({navigation, title}) {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={style.header}>
      <Icon
        style={style.icon}
        name="menu"
        type="material"
        onPress={openDrawer}
      />
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
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#a3a9ad',
  },
  icon: {
    position: 'absolute',
    left: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#000',
    margin: 10,
  },
});
