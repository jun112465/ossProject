import React, {useState, useEffect} from "react";
import { 
    Text, SafeAreaView, View, StyleSheet, Modal, Pressable, 
    TextInput, TouchableOpacity, FlatList
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {KakaoOAuthToken, login, getProfile as getKakaoProfile, getAccessToken} from "@react-native-seoul/kakao-login"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { black, white } from "react-native-paper/lib/typescript/src/styles/colors";

const TeamRoom = ({route, navigation})=>{

    // 일정 목록
    const [items, setItems] = useState({
        '2022-05-22': [{ name: 'item 1 - any js object', id:121 }],
        '2022-05-23': [{ name: 'item 2 - any js object', height: 80, id:122 }],
        '2022-05-24': [],
        '2022-05-25': [{ name: 'item 3 - any js object', id:123 }, { name: 'any js object', id:124 }]
    })
    // 팀원 목록
    const [teamMembers, setTeamMembers] = useState([
        {
            id : '18011646',
            nickname : 'nickname1'
        },
        {
            id : '12345678',
            nickname : 'nickname2'
        },
        {
            id : '56781234',
            nickname : 'nickname3'
        }
    ])
    
    // 캘린더 관련
    const [month, setMonth] = useState(0)
    const [first, setFirst] = useState(true)
    const [selectedDate, setSelectedDate] = useState();

    // 모달 관련 state
    const [inviteModal, setInviteModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    // 메뉴 관련
    const [input, setInput] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const [left,setLeft] = useState(0)

    useEffect(()=>{
        // 메뉴 보이게 하기 위한 조건문
        if(showMenu) setLeft(170)
        else setLeft(0)

        // console.log(teamMembers)
        console.log({route})
    }, [input, showMenu])

    //선택 month의 모든 요일별 빈 아이템 목록 생성
    const setEmptyMonth = (year,month)=>{
        let daysOfMonth = new Date(year, month, 0).getDate()
        let tmp = {}
        for (let i = 1; i <= daysOfMonth; i++) {
            key = year + "-" + (month).toString().padStart(2, '0') + "-" + i.toString().padStart(2, '0')
            tmp[key] = []
        }
        for(let key in items){
            tmp[key] = items[key]
        }
        setItems(tmp)
    }

    // 일정 아이템들 렌더링 함수
    const renderScheduleItem = (item) => {
        return (
            <TouchableOpacity 
                style={styles.itemContainer}
                onPress={() => {
                    console.log("deleete")
                    setDeleteModal(!deleteModal)
                }
            }>
                <Text>{item.name}</Text>
                {/* <Text>{`🍪`}</Text> */}
            </TouchableOpacity>
        );
    }

    // 일정 추가 모달 렌더링 함수
    const renderModal = (date) => {
        setSelectedDate(date)
        setModalVisible(!modalVisible)
    }

    const addSchedule = ()=>{
        console.log(selectedDate)
        tmp = {...items}
        tmp[selectedDate].push({name:input})
        setItems(tmp)
    }

    const getProfileImage = async ()=>{
         let profile = await getKakaoProfile()
         console.log("profile image url : " + profile.profileImageUrl)
    }

    const getSchedules = async ()=>{
        let userId = await AsyncStorage.getItem("userId")
        console.log(userId)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'teamId' : teamId })
        };
        fetch('http:/localhost:8080/team/schedules', requestOptions)
            .then(response => response.json())
    }

    const addSchedule2 = async ()=>{
        let userId = await AsyncStorage.getItem("userId")
        console.log(userId)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'teamId' : teamId, 
                'userId' : userId, 
                'content' : content
            })
        };
        // fetch('http:/localhost:8080/team/schedules', requestOptions)
        //     .then(response => response.json())
    }

    const getTeamMembers = ()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'teamId' : teamId, 
            })
        };

        //반환형식
        // {
        //     {
        //         nickname : "user1"
        //     }, 
        //     {
        //         nickname : "user2"
        //     },
        //     {
        //         nickname : "user3"
        //     } ....
        // }
    }


    const renderTeamMemberItem = ({item})=>{
        return (
            <TouchableOpacity
            style={{
                borderColor: 'black',
                margin : 10,
                borderRadius: 20,
                top: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Icon style={{fontSize: 30, textAlign:"center", marginRight:5}}name={"github"}/>
                <Text style={{fontSize: 20, textAlignVertical:"center"}}>{item.nickname}</Text>
            </TouchableOpacity>
        )
    }

    return (

        <SafeAreaView style={styles.safe}>
            {/* 메뉴창 */}
            <View style={{
                flex:1,width:left,
            }}>

                <View style={{margin: 10}}>
                    <Text style={{ marginHorizontal: 10, fontSize: 16, fontWeight: "bold" }}>- TeamName</Text>
                    <Text style={{ fontSize: 30, padding: 10, borderBottomWidth: 1 }}>
                        {route.params.teamName}
                    </Text>
                </View>

                <View style={{margin: 10}}>
                    <Text style={{ marginHorizontal: 10, fontSize: 16, fontWeight: "bold" }}>- Add</Text>
                    <TouchableOpacity
                        style={{
                            padding: 20,
                            margin: 10,
                            borderRadius: 20,
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                        onPress={() => setInviteModal(!inviteModal)}
                    >
                        <Icon name={"user-plus"} style={{ fontSize: 30, marginRight: 5 }} />
                        <Text style={{ fontSize: 15 }}>팀원 초대</Text>
                    </TouchableOpacity>
                </View>

                <View style={{margin:10, flex: 1}}>
                    <Text style={{ marginHorizontal: 10, fontSize: 16, fontWeight: "bold" }}>- Members</Text>
                    <FlatList
                        style={{ flex: 1, borderBottomWidth: 1, borderColor: 'white' }}
                        data={teamMembers}
                        renderItem={renderTeamMemberItem}
                        keyExtractor={item => item.id}
                    />
                </View>

            </View>

            {/* 캘린더 */}
            <View style={{flex:1, position: 'absolute', top:50, bottom:0, left:left, right:0}}>
                <TouchableOpacity
                    style={{ width: 50, alignItems: "flex-end" }}
                    onPress={async () => {
                        console.log("pressed")
                        setShowMenu(!showMenu)
                    }}
                >
                    <Icon
                        size={25}
                        style={{ marginLeft: 10, marginBottom: 10 }}
                        name={'navicon'}
                        color={"black"} />
                </TouchableOpacity>
                <Agenda
                    styles={{ flex: 4 }}
                    items={items}
                    renderItem={renderScheduleItem}
                    loadItemsForMonth={async date => {
                        // 처음에 1회만 실행
                        if (first) {
                            setMonth(date.month + 1)
                            setEmptyMonth(date.year, date.month + 1)
                            setFirst(!first)
                        }
                    }}
                    onDayPress={(date) => {
                        if (month != date.month) {
                            setMonth(date.month)
                            setEmptyMonth(date.year, date.month)
                        }
                    }}
                    onDayLongPress={(day) => {
                        renderModal(day.dateString)
                    }}
                    showClosingKnob={true}
                />

                {/* 팀원 초대 모달 */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={inviteModal}
                    onRequestClose={() => {
                        setInviteModal(!inviteModal);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>
                            <TextInput
                                multiline
                                editable
                                style={styles.input}
                                placeholder="초대할 팀원의 ID를 입력하세요"
                                onChangeText={setInput}
                                value={input}
                            />
                            <View style={{ flexDirection: "row" }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setInviteModal(!inviteModal)
                                    }}
                                >
                                    <Text style={styles.textStyle}>input</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setInviteModal(!inviteModal)}
                                >
                                    <Text style={styles.textStyle}>cancel</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </Modal>
                


                {/* 일정 삭제 모달 */}
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
                            <Text style={styles.textStyle}>일정삭제</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setDeleteModal(!deleteModal)}
                        >
                            <Text style={styles.textStyle}>취소</Text>
                        </Pressable>
                    </View>
                </Modal>

                {/* 일정 등록 모달 */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>
                            <TextInput
                                multiline
                                editable
                                style={styles.input}
                                placeholder="일정을 등록하세요"
                                onChangeText={setInput}
                                value={input}
                            />
                            <View style={{ flexDirection: "row" }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        console.log(input)
                                        addSchedule()
                                        setModalVisible(!modalVisible)
                                    }}
                                >
                                    <Text style={styles.textStyle}>input</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "skyblue"
    },
    itemContainer: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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

  
export default TeamRoom;
