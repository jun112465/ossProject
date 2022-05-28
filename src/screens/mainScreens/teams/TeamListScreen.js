import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, 
    Text, StatusBar, Button, TouchableOpacity, 
    Modal, TextInput, Pressable} from 'react-native';
import { create } from 'react-test-renderer';
import TeamRoom from './TeamRoomScreen';

const TeamListScreen = ({route, navigation}) => {
    const [teamList, setTeamList] = useState()
    const [createTeamModal, setCreateTeamModal] = useState(false)
    const [input, setInput] = useState()
    const [first, setFirst] = useState(true)

    useEffect(()=>{
        let a = async ()=>{
            let json = await getTeamList()
            console.log(json)
            setTeamList(json)
        }
        if(first) {
            a()
            setFirst(false)
        }
    }, [teamList])
    
    async function getTeamList(){
        let data = await fetch(`http:/localhost:8080/team/get?user_id=${userId}`)
        let json = await data.json()
        return json.teamList
    }

    const createTeam = async (teamName) => {
        await fetch(`http:/localhost:8080/team/add?team_name=${teamName}&user_id=${userId}`)
        let json = await getTeamList()
        setTeamList(json)
    }

    const deleteTeam = (teamId) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'teamId': teamId,
            })
        };
        fetch('http:/localhost:8080/schedules/add', requestOptions)
            .then(response => response.json())
    }

    const Item = ({title, id}) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => { navigation.navigate("TeamRoom", {
                teamName : title,
                teamId : id,
                userId : userId,
            })}}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{title}</Text>
            </TouchableOpacity>

        </View>
    );
    const renderItem = ({ item }) => (
        <Item title={item.teamName} id={item.teamId}/>
    );

    

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.item}>
                <TouchableOpacity onPress={()=>setCreateTeamModal(!createTeamModal)}>
                    <Text style={styles.title}>CREATE TEAM</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={createTeamModal}
                onRequestClose={() => {
                    setCreateTeamModal(!createTeamModal)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <TextInput
                            multiline
                            editable
                            style={styles.input}
                            placeholder="생성할 팀명을 입력하시오"
                            onChangeText={setInput}
                            value={input}
                        />
                        <View style={{ flexDirection: "row" }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    createTeam(input)
                                    setCreateTeamModal(!createTeamModal)
                                }}
                            >
                                <Text style={styles.textStyle}>input</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setCreateTeamModal(!createTeamModal)}
                            >
                                <Text style={styles.textStyle}>cancel</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>

            <FlatList
                style={{flex:1, margin: 7}}
                data={teamList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: 'lightgrey',
        borderRadius: 30,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        padding: 10,
      },

});

export default TeamListScreen;




