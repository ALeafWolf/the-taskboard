import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Spinner} from 'native-base';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            userInfo: null,
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
            this.setState({userInfo: userInfo, loggedIn: true});
            // create a new firebase credential with the token
            const credential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
            // login with credential
            const firebaseUserCredential = await auth().signInWithCredential(credential);
            console.log('\nlogin success');
            //create the profile for new user
            let uid = auth().currentUser.uid;
            if(firestore().collection(uid).doc('profile').exists === false){
                this.initProfile(firestore().collection(uid).doc('profile'));
            }
            //navigate to the home page of app
            this.props.navigation.navigate('MainDrawer');
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

    initProfile = (ref) => {
        let user = auth().currentUser;
        ref.set({
            name: user.displayName,
            img: user.photoURL,
            email: user.email
        }).then(() => {
            console.log('Initialize user profile success');
        }).catch((err) => {console.error(err)});
    }

    // getCurrentUserInfo = async () => {
    //     try {
    //         const userInfo = await GoogleSignin.signInSilently();
    //         this.setState({userInfo: userInfo});
    //         this.props.navigation.navigate('MainDrawer');
    //         console.log('sign in silently success');
    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_REQUIRED) {
    //             // user has not signed in yet
    //             this.setState({loggedIn: false});
    //         } else {
    //             // some other error
    //             this.setState({loggedIn: false});
    //         }
    //     }
    // };

    // _signOut = async () => {
    //     try {
    //         await GoogleSignin.revokeAccess();
    //         await GoogleSignin.signOut();
    //         this.setState({userInfo: null, loggedIn: true});
    //         console.log('log out');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    render() {
        let screen = this.state.screen;
        return (
            <View style={style.container}>
                {!this.state.loggedIn ?
                    (
                        <View>
                            <Text>The Taskboard</Text>
                            <GoogleSigninButton
                                style={{width: 192, height: 48}}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={this._signIn}/>
                        </View>
                        ) :
                    (
                        <View>
                            <Text>Please Wait</Text>
                            <Spinner color={'blue'} />
                        </View>
                    )}

            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'center',
    },
});
