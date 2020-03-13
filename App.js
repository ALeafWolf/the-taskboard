import 'react-native-gesture-handler';
import React, {Component} from 'react';

// import Navigator from './src/routes/Drawer';
import Navigator from './src/routes/HomeStack';

class App extends Component {
  render() {
    return <Navigator />;
  }
}

export default App;
