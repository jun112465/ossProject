import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, 
    Text, StatusBar, Button, TouchableOpacity, 
    ActivityIndicator, Linking, Modal, Pressable} from 'react-native';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SlideOutDown } from 'react-native-reanimated';

const MessageList = ({userId, navigation}) => {
    const [loading, setLoading] = useState(true) 
    const [deleteModal, setDeleteModal] = useState(false)
    const [msg, setMsg] = useState()
    const [selectedMsg, setSelectedMsg] = useState()

    useEffect(()=>{
        if(loading){
            const a = async () => {
                let data = await getMessages()
                console.log("messageList :", data)
                setMsg(data)
            }
            a()
            setLoading(false)
        }
    }, [msg])

    //영화 5개 불러오는 예제 데이터
    const getMessages = async () => {
        const resp = await fetch(`http://localhost:8080/message/get?user_id=${userId}`);
        const json = await resp.json();
        console.log(json)
        return json.msgList
    }

    const deleteMessage = async ()=>{
        console.log("deleteMsg : ", selectedMsg)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id : selectedMsg
            })
        };
        await fetch('http:/localhost:8080/message/delete', requestOptions)
        let json = await getMessages()
        setLoading(!loading)
        setMsg(json)
    }

    const touchMessage = (id)=>{
        setSelectedMsg(id)
        setDeleteModal(!deleteModal)
    }

    const Item = ({item}) => {
        // 일반 메세지 
        if (item.type == "message") return (
            <View style={styles.item}>
                <TouchableOpacity onPress={()=>{
                        touchMessage(item.msgId)
                    }}>
                    <Text style={styles.title}>From. {item.from}</Text>
                    <Text style={styles.content}>{item.content}</Text>
                </TouchableOpacity>
            </View>
        )
        // 초대 링크
        else return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => {
                    console.log(item)
                    touchMessage(item.id)
                }}>
                    <Text style={styles.title}>From. {item.from}</Text>
                    <Text style={styles.content}>{item.teamName} 팀으로 초대되었습니다. 아래 링크를 클릭 시 팀에 참여합니다.</Text>
                    <View style={{flexDirection:'row'}}>
                        <Icon style={{ fontSize: 30, margin: 10 }} name={"group"} />
                        <Text style={{ fontSize: 30, color: 'green', marginTop: 10 }}
                            onPress={() => {
                                let url = `http://localhost:8080/team/invite_code?team_id=${item.teamId}&user_id=${userId}`
                                console.log(url)
                                Linking.openURL(url)
                                // navigation.navigate("TeamStack")
                            }}>
                           linkToTeam 
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}>
                <FlatList
                    style={{ flex: 1 }}
                    data={msg}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            

            {/* 메세지 삭제 모달 */}
            <View style={{flex:1}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={deleteModal}
                    onRequestClose={() => {
                        setDeleteModal(!deleteModal)
                    }}
                >
                    <View style={{ marginTop: "165%", marginBottom: "10%" }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                deleteMessage()
                                setDeleteModal(!deleteModal)
                            }}
                        >
                            <Text style={styles.textStyle}>메세지 삭제</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setDeleteModal(!deleteModal)
                            }}
                        >
                            <Text style={styles.textStyle}>취소</Text>
                        </Pressable>
                    </View>
                </Modal>
            </View>

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
});

export default MessageList;