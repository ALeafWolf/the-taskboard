import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import UserInfo from '../screens/User';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'The Taskboard',
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {backgroundColor: '#eee', height: 60},
  },
});

export default HomeStack;
