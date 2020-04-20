import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from 'react-native';
import {Fab, Icon, Label, Container} from 'native-base';
import firestore from '@react-native-firebase/firestore';


function Home({navigation}) {

    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    //load data from firestore
    const ref = firestore().collection('tasks');

    const addHandler = () => {
        navigation.navigate('AddNewTask');
    };

    useEffect(() => {
        return ref.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const {title, createdDate} = doc.data();
                list.push({
                    id: doc.id,
                    title,
                    createdDate,
                });
            });
            setTasks(list);
            if (loading) {
                setLoading(false);
            }
        });
    }, []);

    //if still loading the data
    if (loading) {
        return null;
    }

    return (
        <Container>
            <FlatList
                style={style.container}
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TaskDetails', item)}>
                        <Label>{item.title}</Label>
                    </TouchableOpacity>
                )}
            />
            <Fab
                position="bottomRight"
                onPress={addHandler}>
                <Icon name="add"/>
            </Fab>
        </Container>
    );
}

const style = StyleSheet.create({
    container: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        margin: 20
    },
});

export default Home;
