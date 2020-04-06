import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from '../screens/Login';
import MainDrawer from '../routes/MainDrawer';

const LoginStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        }
    }
});

const MainStack = createSwitchNavigator({
    Login: {
        screen: LoginStack
    },
    MainDrawer: {
        screen: MainDrawer
    }
});

export default createAppContainer(MainStack);

