import {createStackNavigator} from 'react-navigation-stack';
import Setting from '../screens/Setting';
import Header from '../common/DrawerHeader';
import React from 'react';

const screens = {
  Setting: {
    screen: Setting,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => <Header title="Setting" navigation={navigation} />,
      };
    },
  },
};

const SettingStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {backgroundColor: '#eee', height: 60},
  },
});

export default SettingStack;
