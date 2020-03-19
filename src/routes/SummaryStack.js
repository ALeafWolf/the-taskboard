import {createStackNavigator} from 'react-navigation-stack';
import Summary from '../screens/Summary';
import Header from '../common/DrawerHeader';
import React from 'react';

const screens = {
  Summary: {
    screen: Summary,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <Header title="Task Summary" navigation={navigation} />
        ),
      };
    },
  },
};

const SummaryStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {backgroundColor: '#eee', height: 60},
  },
});

export default SummaryStack;
