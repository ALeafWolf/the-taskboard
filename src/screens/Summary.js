import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {CardItem, Card, Content, Container, Left, Right} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export default class Summary extends Component{
    constructor(props) {
        super(props);
        this.state = {
            total: 100,
            completed: 100,
            rate: 1.0,
            name: 'user'
        }
    };

    getUser = async (uid) => {
        return firestore().collection(uid).doc('profile').onSnapshot(documentSnapshot => {
            this.setState({
                user: documentSnapshot.get('name')
            });
        });
    }

    getData = async (uid) => {
        return firestore().collection(uid).doc('summary').onSnapshot(documentSnapshot => {
            this.setState({
                total: documentSnapshot.get('total'),
                completed: documentSnapshot.get('completed'),
                rate: (documentSnapshot.get('completed')/documentSnapshot.get('total')).toFixed(2)
            });
        });
    };

    componentDidMount(): void {
        this.getUser(auth().currentUser.uid).then(() => {console.log("user loaded!\n")});
        this.getData(auth().currentUser.uid).then(() => {console.log("data loaded!\n")});
    }


    render(){
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header bordered>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.user}'s Summary</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Complete Task: </Text>
                            </Left>
                            <Text>{this.state.completed}</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Complete rate: </Text>
                            </Left>
                            <Text>{this.state.rate * 100}%</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
};
