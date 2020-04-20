import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Body, Button, CheckBox, Container, Content, Fab, Form, Icon, Input, Item, Label, ListItem} from 'native-base';

export default class EditTask extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam('id'),
            ref: firestore().collection('tasks').doc(this.props.navigation.getParam('id')),
            fields: ['title', 'createdDate', 'isLimitedTime', 'isCompleted', 'subTasks', 'isSubCompleted'],
            detail: {},
            load: false,
            subTasks: [],
            subIndex: 0
        }
    }

    getData = () => {
        return this.state.ref.onSnapshot(documentSnapshot => {
            let data = documentSnapshot.data();
            this.setState({
                detail: {
                    title: data.title,
                    isLimitedTime: data.isLimitedTime,
                    isCompleted: data.isCompleted,
                    isSubCompleted: data.isSubCompleted
                },
                subTasks: data.subTasks,
                subIndex: data.subTasks.length,
            });
        })
    };

    saveData = () => {
        let subBool = new Array(this.state.subIndex);
        subBool.fill(false);
        this.state.ref.update({
            title: this.state.detail.title,
            subTasks: this.state.subTasks,
            isSubCompleted: subBool,
        }).then(() => {
            console.log("Update success!");
            this.props.navigation.navigate('TaskDetails', this.state.id);
        }).catch((err) => console.log("ERROR: " + err));
    };

    addInput = () => {
        let s = [...this.state.subTasks];
        s.push("");
        this.setState({subTasks:s, subIndex: this.state.subIndex + 1});
    };

    removeInput = (index) => {
        let s = [...this.state.subTasks];
        s.splice(index, 1);
        this.setState({subTasks:s, subIndex: this.state.subIndex - 1});
    };

    editInput = (text, index) => {
        // console.log(text + " " + index);
        // let s = Object.assign({}, this.state.subTasks);
        // s[index] = text;
        // this.setState({subTasks: s});
        let s = [...this.state.subTasks];
        s[index] = text;
        this.setState({subTasks:s});
    }

    componentDidMount(){
        this.getData();
    }


    render(){
        let subtasks = this.state.subTasks.map((s, i) => {
            return <Item key={i}>
                <Button danger iconLeft transparent onPress={() => this.removeInput(i)}>
                    <Icon name="md-remove-circle"/>
                </Button>
                <Input value={s} onChangeText={(text) => this.editInput(text, i)} />
            </Item>
        });
        return (
            <Container>
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>Task Title</Label>
                            <Input label={'title'}
                                   value={this.state.detail.title}
                                   onChangeText={(title) => {
                                       const detail = Object.assign({}, this.state.detail, {title: title});
                                       this.setState({detail: detail});
                                   }}
                            />
                        </Item>
                        <ListItem>
                            <CheckBox checked={this.state.detail.isLimitedTime} onPress={()=>{}} color="green"/>
                            <Body><Text>enable time limit</Text></Body>
                        </ListItem>
                        <Item>
                        </Item>
                        <Item>
                            <Label>Sub task</Label>
                            <Button iconLeft transparent onPress={this.addInput}>
                                <Icon name="md-add-circle"/>
                            </Button>
                        </Item>
                        {subtasks}
                    </Form>
                </Content>
                <View>
                    <Fab
                        style={{backgroundColor: '#34A34F'}}
                        position="bottomRight"
                        onPress={this.saveData}>
                        <Icon name="md-save"/>
                    </Fab>
                </View>
            </Container>
        );
    };

};
