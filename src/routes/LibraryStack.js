import {createStackNavigator} from 'react-navigation-stack';
import LibraryHome from '../screens/LibraryHome';
import Header from '../common/DrawerHeader';
import React from 'react';

const screens = {
  Library: {
    screen: LibraryHome,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <Header title="Task Library" navigation={navigation} />
        ),
      };
    },
  },
};

const LibraryStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {backgroundColor: '#eee', height: 60},
  },
});

export default LibraryStack;
