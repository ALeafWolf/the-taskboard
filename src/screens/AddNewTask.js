import React, {Component} from 'react';
import {StyleSheet, Text, TextInput } from 'react-native';
import {CheckBox, Container, Content, Form, Item, Input, Label, Button, Fab, View, Icon} from 'native-base';
import firestore from '@react-native-firebase/firestore'

export default class AddNewTask extends Component{
  constructor(props) {
    super(props);
    this.state = {
        isLimitedTime: false,
        subTasks: [],
        ref: firestore().collection('tasks'),
        task: {
            title: '',
        },
        fabActive: false
    }
  }

  toggleTimeLimit = () => {
      this.setState({isLimitedTime: !this.state.isLimitedTime});
      console.log(this.state.isLimitedTime);
  }

  addInput = () =>{

  }

  removeInput = () =>{

  }

  saveTask = async () => {
      let date = new Date();
      var createdDate =  date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
      console.log(this.state.task.title + "\t" + createdDate);
      await this.state.ref.add({
            title: this.state.task.title,
            createdDate: createdDate,
      });

  }

  render(){
    return (
        <Container>
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Task Title</Label>
                        <Input label={'title'}
                               value={this.state.task.title}
                               onChangeText={(title) => {
                                    const task = Object.assign({}, this.state.task, {title: title});
                                    this.setState({task});
                               }}
                        />
                    </Item>
                    <Item>
                        <Label>enable time limit</Label>
                        <CheckBox checked={this.state.isLimitedTime} onPress={this.toggleTimeLimit} color="green"/>
                    </Item>
                    <Item>

                    </Item>
                    <Item>
                        <Label>Sub task</Label>
                    </Item>
                    <Item>
                        <Button primary onPress={() => this.addInput}>
                            <Icon name="md-add-circle" />
                        </Button>
                    </Item>
                    <Item>
                        <Button danger onPress={() => this.removeInput}>
                            <Icon name="md-remove-circle" />
                        </Button>
                        <Input />
                    </Item>
                </Form>
            </Content>
            <View>
                <Fab
                    style={{ backgroundColor: '#34A34F' }}
                    position="bottomRight"
                    onPress={this.saveTask}>
                    <Icon name="md-save" />
                </Fab>
            </View>
        </Container>
    );
  };

};

const style = StyleSheet.create({
  container: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1
  },
});
