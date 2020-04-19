import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Fab, CheckBox, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';


export default class TaskDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ref: firestore().collection('tasks').doc(this.props.navigation.getParam('id')),
            fab: false,
            fields: ['title', 'createdDate', 'isLimitedTime', 'isCompleted', 'subTasks', 'isSubCompleted'],
            detail: {},
            load: false,
            sub: []
        }
    }
    // const ref =  ;
    // let [detail, setDetail] = useState({});
    // let [loaded, setLoaded] = useState(false);
    // let [fab, setFab] = useState(false);
    // let [sub, setSub] = useState([]);
    // const fields = ;

    editHandler = () => {
        this.props.navigation.navigate('EditTask', this.state.id);
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
                detail: o,
                loaded: true
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
        }).then(console.log("Update success!"));
    }

    componentDidMount(){
        this.getData();
    }


    render(){
        let subTasks;
        if(this.state.sub.length != 0){
            console.log(this.state.sub);
            subTasks = <FlatList
                data={this.state.detail.subTasks}
                keyExtractor={((item, index) => index.toString())}
                renderItem={({item, index}) => (
                    <View>
                        <CheckBox checked={this.state.sub[index]} onPress={() => this.subTaskStateChange(index)}/>
                        <Text>{item}</Text>
                    </View>

                )}
            />;
        }else{
            subTasks = <View><Text>owo</Text></View>;
        }


        return (<View style={style.container}>
            <Text>{this.state.detail.title}</Text>
            <Text>Created at: {this.state.detail.createdDate}</Text>
            {subTasks}
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
