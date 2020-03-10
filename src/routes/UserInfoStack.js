import {createStackNavigator} from 'react-navigation-stack';
import User from '../screens/User';

const screens = {
  User: {
    screen: User,
    navigationOptions: {
      title: 'User Information',
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
