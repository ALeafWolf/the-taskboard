import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import AddNewTask from '../screens/AddNewTask';
import TaskDetails from '../screens/TaskDetails';
import {createAppContainer} from 'react-navigation';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'The Taskboard',
    },
  },
  AddNewTask: {
    screen: AddNewTask,
    navigationOptions: {
      title: 'Add New Task',
    },
  },
  TaskDetails: {
    screen: TaskDetails,
    navigationOptions: {
      title: 'Task Details',
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {backgroundColor: '#eee', height: 60},
  },
});

export default createAppContainer(HomeStack);
