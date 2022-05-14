import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, TouchableOpacity } from 'react-native';
import TeamRoom from './TeamRoomScreen';
// import { Button } from 'react-native-paper';

const DATA = [
    {
        teamId: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        teamName: "세계사" 
    },
    {
        teamId: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        teamName: "캡스톤",
    },
    {
        teamId: '58694a0f-3da1-471f-bd96-145571e29d72',
        teamName: "문쓰발",
    },
];





const TeamListScreen = ({navigation}) => {
    const [teamList, setTeamList] = useState([])
    useEffect(()=>{
        getTeamList()
    })

    const getTeamList = async () => {
        id = await AsyncStorage.getItem("userId")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'id': id })
        };
        await fetch('http:/localhost:8080/team/teamlist', requestOptions)
            .then(response => response.json())
            .then(data => {
                tmp = []
                for(let d in data){
                    console.log(d)
                }
            })
    }
    


    const Item = ({title}) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => { navigation.navigate("TeamRoom", {
                teamName : title,
            })}}>
                <Text style={styles.title}>단톡방 입장</Text>
                <Text style={styles.content}>{title}</Text>
            </TouchableOpacity>

        </View>
    );
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={{flex:1}}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            
            <Text
                style={{flex:1, padding:20, fontSize: 20}}>
                방장이 만들어 놓은 팀플방에 팀원들을 초대해서 각자의 일정이나 
                자료를 기입할 수 있는 또 하나의 게시판
            </Text>
      
        </SafeAreaView>

        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: 'coral',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 14,
    }
});

export default TeamListScreen;




