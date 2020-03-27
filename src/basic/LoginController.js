import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

export default class LoginController extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
    };

    componentDidMount() {
        //default options: you get user email and basic profile info
        GoogleSignin.configure({
            webClientId: '951817555664-7j71dfn2pcvv4u20a5qc29g572sfmv7d.apps.googleusercontent.com',
            offlineAccess: true,
        });
    };

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo: userInfo, loggedIn: true });
            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

            console.log("success");
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
                this.setState({loggedIn: false});
            } else {
                // some other error
                this.setState({loggedIn: false});
            }
        }
    };

    _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null }); // Remember to remove the user from your app's state as well
            console.log("log out");
        } catch (error) {
            console.error(error);
        }
    };

    render(){
        return (
            <View>
                <Text>The Taskboard</Text>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn}
                    disabled={this.state.isSigninInProgress} />
                <Button
                    onPress={this._signOut}
                    title="Sign Out"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>

        );
    }
}
