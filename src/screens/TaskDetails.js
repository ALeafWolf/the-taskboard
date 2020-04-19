import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Fab, CheckBox, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';


export default function TaskDetails({navigation}){
    const ref =  firestore().collection('tasks').doc(navigation.getParam('id'));
    let [detail, setDetail] = useState({});
    let [loaded, setLoaded] = useState(false);
    let [fab, setFab] = useState(false);
    let [sub, setSub] = useState([]);
    const fields = ['title', 'createdDate', 'isLimitedTime', 'isCompleted', 'subTasks', 'isSubCompleted'];

    const editHandler = () => {
        this.props.navigation.navigate('EditTask', this.state.id);
    };

    const getData = () => {
        return ref.onSnapshot(documentSnapshot => {
            let o = {};
            let data = documentSnapshot.data();
            for(let i = 0; i < fields.length; i++){
                let field = fields[i];
                o[field] = data[field];
                if(field == 'isSubCompleted'){
                    setSub(data[field]);
                }
            }
            setDetail(o);
            setLoaded(true);
        })
    };

    const subTaskStateChange = (index) => {
        sub[index] = !sub[index];
        console.log(sub[index]);
    }

    const saveChange = () => {
        ref.update({
            isSubCompleted: sub,
        }).then(console.log("Update success!"));
    }

    useEffect(() => {
        if(!loaded){
            return getData();
        }
    }, []);


    return (<View style={style.container}>
        <Text>{detail.title}</Text>
        <Text>Created at: {detail.createdDate}</Text>
        <FlatList
            data={detail.subTasks}
            keyExtractor={((item, index) => index.toString())}
            renderItem={({item, index}) => (
                <View>
                    <CheckBox checked={sub[index]} onPress={() => subTaskStateChange(index)}/>
                    <Text>{item}</Text>
                </View>

            )}
        />
        <Fab
            active={fab}
            direction='up'
            onPress={() => setFab(!fab)}
            position={'bottomRight'}>
            <Icon name="menu"/>
            <Button
                style={{ backgroundColor: '#34A34F' }}>
                <Icon name="check-outline" color="#FFF"/>
            </Button>
            <Button
                style={{ backgroundColor: '#3B5998' }}
                onPress={editHandler}>
                <Icon name="pencil-outline" color="#FFF"/>
            </Button>
        </Fab>
    </View>);
};
const style = StyleSheet.create({
    container: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
    },
});
