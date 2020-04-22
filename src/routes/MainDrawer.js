import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import HomeStack from './HomeStack';
import UserInfoStack from './UserInfoStack';
import SummaryStack from './SummaryStack';
import LibraryStack from './LibraryStack';
import SettingStack from './SettingStack';

const MainDrawer = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  // User: {
  //   screen: UserInfoStack,
  // },
  Summary: {
    screen: SummaryStack,
  },
  // Library: {
  //   screen: LibraryStack,
  // },
  Setting: {
    screen: SettingStack,
  },
});

export default MainDrawer;
