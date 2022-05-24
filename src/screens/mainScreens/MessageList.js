import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, 
    Text, StatusBar, Button, TouchableOpacity, 
    ActivityIndicator, Linking, Modal, Pressable} from 'react-native';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [
    {
        type : 'inviteLink',
        msgId: '5',
        from : 'nickname1',
        content : "www.naver.com", 
        teamId : '123',
        teamName : '오픈소스SW',
    },
    {
        type : 'inviteLink', 
        msgId: '1',
        from : 'nickname2',
        content : "Nostrud est nostrud nostrud exercitation. Proident laborum anim non aliqua aliquip ipsum sint minim dolor laboris fugiat. Minim duis officia voluptate proident et laboris aliquip id elit dolore irure laborum incididunt. Non qui pariatur commodo commodo quis laboris. Exercitation ut exercitation in nulla elit magna non. Do id laborum et et ullamco elit adipisicing voluptate ad dolor excepteur. Nostrud laboris anim est id amet." ,
        teamId : '234',
        teamName : '데이터베이스'
    },
    {
        type : 'message',
        msgId : '3',
        from : 'nickname3',
        content : "Laboris aliquip consequat ea veniam irure incididunt. Ea ullamco qui sit magna deserunt ea consequat occaecat. Fugiat officia eu ex adipisicing consectetur anim amet. Pariatur anim deserunt exercitation aliqua labore. Ut irure qui irure velit commodo nisi est enim et ea.",
    },
    {
        type : 'message',
        msgId : '4',
        from : 'nickname2',
        content : "Pariatur ad dolore tempor cupidatat deserunt aliqua. Nulla non qui anim ea et exercitation deserunt. Commodo dolor qui anim qui veniam non ad. Pariatur laborum deserunt incididunt sunt est consequat eu tempor mollit reprehenderit adipisicing ex veniam. Quis minim esse veniam reprehenderit enim mollit sit culpa.",
    },
];




const MessageList = ({userId, navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const [msg, setMsg] = useState(0)

    //영화 5개 불러오는 예제 데이터
    const getMessages = async () => {
        const resp = await fetch(`http://localhost:8080/message/get?user_id=${userId}`);
        const json = await resp.json();
        console.log(json)
    }

    const deleteMessages = async ()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'userId' : userId,
                'msgId' : msgId
            })
        };
        fetch('http:/localhost:8080/schedules/add', requestOptions)
            .then(response => response.json())
    }

    const sendMessage = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'fromId' : fromId,
                'toId' : toId,
                'content' : content
            })
        };
        fetch('http:/localhost:8080/schedules/add', requestOptions)
            .then(response => response.json())
    }

    const touchMessage = (id)=>{
        setMsg(id)
        setDeleteModal(!deleteModal)
    }

    const Item = ({item}) => {
        // 일반 메세지 
        if (item.type == "message") return (
            <View style={styles.item}>
                <TouchableOpacity onPress={()=>touchMessage(item.msgId)}>
                    <Text style={styles.title}>From. {item.from}</Text>
                    <Text style={styles.content}>{item.content}</Text>
                </TouchableOpacity>
            </View>
        )
        // 초대 링크
        else return (
            <View style={styles.item}>
                <TouchableOpacity onPress={async () => await touchMessage(item.msgId)}>
                    <Text style={styles.title}>From. {item.from}</Text>
                    <Text style={styles.content}>{item.teamName} 팀으로 초대되었습니다. 아래 링크를 클릭 시 팀에 참여합니다.</Text>
                    <View style={{flexDirection:'row'}}>
                        <Icon style={{ fontSize: 30, margin: 10 }} name={"group"} />
                        <Text style={{ fontSize: 30, color: 'green', marginTop: 10 }}
                            onPress={() => {
                                let url = `http://localhost:8080/inviteCode?teamId=${item.teamId}&userId=${userId}`
                                console.log(url)
                                Linking.openURL('http://google.com')
                                navigation.navigate("TeamStack")
                            }}>
                           linkToTeam 
                        </Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
    };

    useEffect(() => {
        // getMovies();
        // getPosts();
        getMessages();
    }, []);


    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={{ flex: 1, padding: 24 }}>
                {isLoading ? <ActivityIndicator /> : (
                    <FlatList
                        data={DATA}
                        // keyExtractor가 뭔지 알아보기
                        keyExtractor={({ id }) => id}
                        renderItem={renderItem}
                    />
                )}
            </View> */}
            <FlatList
                style={{flex:1}}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            {/* 메세지 삭제 모달 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setDeleteModal(!deleteModal)
                }}
            >
                <View style={{ marginTop: "165%", marginBottom: "10%" }}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setDeleteModal(!deleteModal)}
                    >
                        <Text style={styles.textStyle}>메세지 삭제</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setDeleteModal(!deleteModal)}
                    >
                        <Text style={styles.textStyle}>취소</Text>
                    </Pressable>
                </View>
            </Modal>
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