import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
    CheckBox,
    Container,
    Text,
    Content,
    Form,
    Item,
    List,
    ListItem,
    Input,
    Label,
    Button,
    Fab,
    View,
    Icon,
    Body,
    Toast,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';

export default class AddNewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLimitedTime: false,
            task: {
                title: '',
            },
            fabActive: false,
            subIndex: 0,
            subTasks: [],
        };
    }

    toggleTimeLimit = () => {
        this.setState({isLimitedTime: !this.state.isLimitedTime});
        console.log(this.state.isLimitedTime);
    };

    addInput = () => {
        // let s = Object.assign({}, this.state.subTasks);
        // s[this.state.subIndex] = '';
        // this.setState({
        //     subTasks: s,
        //     subIndex: this.state.subIndex + 1
        // });
        let s = [...this.state.subTasks];
        s.push("");
        this.setState({subTasks:s, subIndex: this.state.subIndex + 1});
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

    removeInput = (index) => {
        // let s = Object.assign({}, this.state.subTasks);
        // delete s[index];
        // this.setState({subTasks: s});
        // console.log("Removed subtask: " + index);
        let s = [...this.state.subTasks];
        s.splice(index, 1);
        this.setState({subTasks:s, subIndex: this.state.subIndex - 1});
    };

    saveTask = () => {
        let date = new Date();
        var createdDate = date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let sub = new Array(this.state.subIndex);
        sub.fill(false);
        this.props.navigation.getParam('ref').add({
            title: this.state.task.title,
            createdDate: createdDate,
            isLimitedTime: this.state.isLimitedTime,
            subTasks: this.state.subTasks,
            isCompleted: false,
            isSubCompleted: sub,
        }).then(() => {
            alert("Task saved!");
            // Toast.show({
            //     text: 'Task Saved!',
            //     buttonText: 'ok',
            //     duration: 3000,
            //     type: 'success',
            // });
        }).then(this.props.navigation.navigate("Home")).catch(err => {console.log(err)});
    };

    render() {
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
                                   value={this.state.task.title}
                                   onChangeText={(title) => {
                                       const task = Object.assign({}, this.state.task, {title: title});
                                       this.setState({task});
                                   }}
                            />
                        </Item>
                        <ListItem>
                            <CheckBox checked={this.state.isLimitedTime} onPress={this.toggleTimeLimit} color="green"/>
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
                        onPress={this.saveTask}>
                        <Icon name="md-save"/>
                    </Fab>
                </View>
            </Container>
        );
    };

};

// const style = StyleSheet.create({
//     container: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         flex: 1,
//     },
// });
