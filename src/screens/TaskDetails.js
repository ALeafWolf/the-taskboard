import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Fab, CheckBox, Button, Label, List, ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';


export default class TaskDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam('id'),
            ref: this.props.navigation.getParam('ref').doc(this.props.navigation.getParam('id')),
            fab: false,
            fields: ['title', 'createdDate', 'isLimitedTime', 'isCompleted', 'subTasks', 'isSubCompleted'],
            detail: {},
            sub: []
        }
    }

    editHandler = () => {
        this.props.navigation.navigate('EditTask', {ref: this.state.ref});
    };

    getData = () => {
        return this.state.ref.onSnapshot(documentSnapshot => {
            let o = {};
            let data = documentSnapshot.data();
            for(let i = 0; i < this.state.fields.length; i++){
                let field = this.state.fields[i];
                o[field] = data[field];
                if(field == 'isSubCompleted'){
                    this.setState({sub: data[field]});
                }
            }
            this.setState({
                detail: o
            });
        })
    };

    subTaskStateChange = (index) => {
        let arr = [...this.state.sub]
        arr[index] = !arr[index];
        this.setState({
            sub: arr
        });
    }

    saveChange = () => {
        this.state.ref.update({
            isSubCompleted: this.state.sub,
        }).then(() => {alert("Update success!")}).catch((err) => alert("ERROR: " + err));
    }


    componentDidMount(){
        this.getData();
    }


    render(){
        // let subTaskList;
        // let subTask = this.state.detail.subTasks;
        // let subCheck = this.state.sub;
        // console.log(subTask);
        // for(let i = 0; i < this.state.sub.length; i++){
        //     subTaskList += <ListItem>
        //         <CheckBox checked={subCheck[i]} onPress={() => this.subTaskStateChange(i)}/>
        //         {/*<Label></Label>*/}
        //     </ListItem>
        // }


        return (<View style={style.container}>
            <Text>{this.state.detail.title}</Text>
            <Text>Created at: {this.state.detail.createdDate}</Text>
            {/*<List keyExtractor={(item => item.toString())}>*/}
            {/*    {subTaskList}*/}
            {/*</List>*/}
            <FlatList
                data={this.state.detail.subTasks}
                keyExtractor={((item, index) => index.toString())}
                renderItem={({item, index}) => (
                    <ListItem>
                        <CheckBox checked={this.state.sub[index]} onPress={() => this.subTaskStateChange(index)}/>
                        <Label>{item}</Label>
                    </ListItem>
                )}
            />
            <Fab
                active={this.state.fab}
                direction='up'
                onPress={() => this.setState({fab: !this.state.fab})}
                position={'bottomRight'}>
                <Icon name="menu"/>
                <Button
                    style={{ backgroundColor: '#34A34F' }}
                    onPress={this.saveChange}>
                    <Icon name="check-outline" color="#FFF"/>
                </Button>
                <Button
                    style={{ backgroundColor: '#3B5998' }}
                    onPress={this.editHandler}>
                    <Icon name="pencil-outline" color="#FFF"/>
                </Button>
            </Fab>
        </View>);
    }

};
const style = StyleSheet.create({
    container: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
    },
});
