import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import { Avatar } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {GoogleSignin} from '@react-native-community/google-signin';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

export default class Setting extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ref: firestore().collection(auth().currentUser.uid).doc('profile'),
            name: '',
            img: 'https://firebasestorage.googleapis.com/v0/b/the-taskboard.appspot.com/o/no_image.png?alt=media&token=736eaec1-6e8e-4f87-86d9-19057d998f35',
            email: ''
        }
    }

    getData = () => {
        return this.state.ref.onSnapshot(documentSnapshot => {
            let data = documentSnapshot.data();
            this.setState({
                name: data.name,
                img: data.img,
                email: data.email
            });
        })
    };

    editPhoto = () => {
        let option = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(option, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = response.path;
                console.log(source);
                //upload image to storage on firebase with uri
                let path = auth().currentUser.uid + "/image/avatar.jpg";
                this.uploadImage(path, source).then(() => {
                }).catch((err) => {console.log(err)});
                this.getImage().then((url) => {this.setState({img: url})})
            }
        });
    }

    _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            console.log('log out');
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.error(error);
        }
    };

    uploadImage = async (path, img) => {
        await storage().ref(path).putFile(img);
    }

    getImage = async (path) => {
        let url = await storage().ref(path).getDownloadURL();
        // console.log(url);
        return url;
    }

    componentDidMount(){
        // this.getImage().then((url) => {this.setState({img: url})});
        this.getData();
    }

    render(){
        return (
            <Card>
                <CardItem button onPress={this.editPhoto}>
                    <Left>
                        <Thumbnail style={{width: 100, height: 100}} source={{uri: this.state.img}} />
                    </Left>
                    <Right>
                        <Text>{this.state.name}</Text>
                    </Right>
                </CardItem>
                <CardItem><Text>{this.state.email}</Text></CardItem>
                <CardItem button onPress={this._signOut}><Text>Sign out</Text></CardItem>
            </Card>
        );
    }

}

const style = StyleSheet.create({
    container: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});


