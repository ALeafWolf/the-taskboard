import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Spinner, Container} from 'native-base';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



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
            console.log('login success');

            //create the profile for new user
            let uid = auth().currentUser.uid;
            let ref = (await firestore().collection(uid).doc('profile').get()).exists;
            // console.log(ref);
            if(!ref){
                this.initProfile(firestore().collection(uid).doc('profile'));
            };
            //create summary for new user
            ref = (await firestore().collection(uid).doc('summary').get()).exists;
            if(!ref){
                this.initSummary(firestore().collection(uid).doc('summary'));
            };

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
    };

    initSummary = (ref) => {
        ref.set({
            total: 0,
            completed: 0,
        }).then(() => {
            console.log('Initialize user summary success');
        }).catch((err) => {console.error(err)});
    }

    render() {
        return (
            <View style={style.container}>
                {!this.state.loggedIn ?
                    (
                        <View style={style.container}>
                            <View style={style.row}>
                                <Text style={style.title}>The Taskboard</Text>
                                <Icon name={'bulletin-board'} size={25}/>
                            </View>
                            <View style={style.row}>
                                <GoogleSigninButton
                                    style={{width: 192, height: 48}}
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Dark}
                                    onPress={this._signIn}/>
                            </View>
                        </View>
                        ) :
                    (
                        <View style={style.container}>
                            <Text style={style.title}>Please Wait</Text>
                            <Spinner color={'blue'} />
                        </View>
                    )}

            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'monospace'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
    }
});
