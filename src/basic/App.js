import 'react-native-gesture-handler';
import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import LoginController from './LoginController';

import Navigator from '../routes/Drawer';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  // componentDidMount() {
  //   firebase
  //     .auth()
  //     .signInAnonymously()
  //     .then(() => {
  //       this.setState({
  //         isAuthenticated: true,
  //       });
  //     });
  // }

  render() {
  //   if (!this.state.isAuthenticated) {
  //     return null;
  //   }
  //
  //   return <Navigator />;
    return <LoginController/>;
  }
}