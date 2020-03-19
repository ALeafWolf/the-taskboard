import {createStackNavigator} from 'react-navigation-stack';
import User from '../screens/User';
import Header from '../common/DrawerHeader';
import React from 'react';

const screens = {
  User: {
    screen: User,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <Header title="User Information" navigation={navigation} />
        ),
      };
    },
  },
};

const UserInfoStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {backgroundColor: '#eee', height: 60},
  },
});

export default UserInfoStack;
