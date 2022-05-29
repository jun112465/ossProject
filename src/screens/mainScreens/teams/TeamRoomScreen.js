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
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const TeamRoom = ({route, navigation})=>{
    const userId = route.params.userId;
    const teamId = route.params.teamId;
    const teamName = route.params.teamName
    // loading
    const [firstLoading, setFirstLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    // 캘린더 관련
    const [month, setMonth] = useState(0)
    const [year, setYear] = useState(0)
    const [first, setFirst] = useState(true)
    const [selectedDate, setSelectedDate] = useState();
    const [schedules, setSchedules] = useState();
    const [selectedSchedule, setSelectedSchedule] = useState()

    // 모달 관련 state
    const [inviteModal, setInviteModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [msgModal, setMsgModal] = useState(false)

    // 메뉴 관련
    const [teamMembers, setTeamMembers] = useState()
    const [input, setInput] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const [left,setLeft] = useState(0)
    const [selectedMember, setSelectedMember] = useState()

    useEffect(()=>{
        // 메뉴 보이게 하기 위한 조건문
        if(showMenu) setLeft(170)
        else setLeft(0)

        let firstFunc = async () => {
            console.log("teamRoomScreen : firstFunc")
            let json = await getSchedules()
            setSchedules(json)

            json = await getTeamMembers()
            setTeamMembers(json)

            setFirstLoading(!firstLoading)
        }
        if(firstLoading){
            console.log("firstLoad")
            firstFunc()
        }

        if(loading){
            setEmptyMonth(year, month)
            setLoading(!loading)
        }
        // setEmptyMonth(year, month)

    }, [showMenu, schedules])
    // input, showMenu

    
    const getProfileImage = async ()=>{
         let profile = await getKakaoProfile()
         console.log("profile image url : " + profile.profileImageUrl)
    }

    const getSchedules = async ()=>{
        const response = await fetch(`http:/localhost:8080/schedule/get?team_id=${teamId}`)
        const data = await response.json()
        // setSchedules(data.schedules)
        return data
    }

    const addSchedule = async (date)=>{
        console.log(selectedDate)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'teamId' : teamId, 
                'userId' : userId, 
                'content' : input,
                'date' : selectedDate
            })
        };
        await fetch('http:/localhost:8080/schedule/add', requestOptions)
        let json = await getSchedules()
        setLoading(!loading)
        setSchedules(json)
    }

    const getTeamMembers = async ()=>{
        const response = await fetch(`http:/localhost:8080/team/get_members?team_id=${teamId}`)
        // const response = await fetch(`http://localhost:8080/team/get_members?team_id=3`)
        const json = await response.json();
        console.log(json.userList)
        return json.userList
    }

    const sendInvitation = async ()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'from' : userId,
                'to' : input,
                'content' : `${teamName} 으로 초대됐습니다. 아래 링크를 통해 팀에 참가할 수 있습니다`,
                'type' : "inviteLink",
                'teamId' : teamId,
                'teamName' : teamName
            })
        };
        console.log(requestOptions)
        fetch(`http://localhost:8080/message/send`, requestOptions)  
    }

    const sendMessage = async (type)=>{
        console.log(input)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'from': userId,
                'to': selectedMember,
                'content': input,
                'type': type,
                'teamId': '',
                'teamName':'' 
            })
        };
        console.log(requestOptions)
        await fetch(`http://localhost:8080/message/send`, requestOptions)
    }

    const deleteSchedule = async ()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id : selectedSchedule
            })
        };
        console.log(requestOptions)
        await fetch(`http://localhost:8080/schedule/delete`, requestOptions)
        let json = await getSchedules()
        setLoading(!loading)
        setSchedules(json)
    }

    //선택 month의 모든 요일별 빈 아이템 목록 생성
    const setEmptyMonth = async (year, month) => {
        let daysOfMonth = new Date(year, month, 0).getDate()
        let tmp = {}
        for (let i = 1; i <= daysOfMonth; i++) {
            key = year + "-" + (month).toString().padStart(2, '0') + "-" + i.toString().padStart(2, '0')
            tmp[key] = []
        }
        for (let key in schedules) {
            tmp[key] = schedules[key]
        }
        await setSchedules(tmp)
    }

    // 일정 아이템들 렌더링 함수
    const renderScheduleItem = (item) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    console.log(item)
                    setSelectedSchedule(item.id)
                    setDeleteModal(!deleteModal)
                }
                }>
                <View style={{justifyContent:"flex-start", alignItems:"flex-start"}}> 
                    <Text style={{fontSize:12, fontWeight:"bold", textAlign:"left"}}>{item.userId}</Text>
                    <Text>{item.content}</Text>
                </View>
           </TouchableOpacity>
        );
    }

    // 일정 추가 모달 렌더링 함수
    const renderModal = (date) => {
        setModalVisible(!modalVisible)
    }


    const renderTeamMemberItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={()=>{
                    setSelectedMember(item.id)
                    setMsgModal(!msgModal)
                }}>
                <View style={{
                    borderColor: 'black',
                    margin: 10,
                    borderRadius: 20,
                    top: 20,
                    flexDirection: "row" ,
                    alignItems: "center",
                    justifyContent: "flex-start"
                }}>
                    <Icon style={{ fontSize: 30, textAlign: "center", marginRight: 5 }} name={"github"} />
                    <Text style={{ fontSize: 20, textAlignVertical: "center" }}>{item.nickname}</Text>
                </View>
                <View style={{margin: 10}}>
                    <Text>{item.id}</Text>
                </View>
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
                    items={schedules}
                    renderItem={renderScheduleItem}
                    loadItemsForMonth={async date => {
                        // 처음에 1회만 실행
                        if (first) {
                            setMonth(date.month + 1)
                            setEmptyMonth(date.year, date.month + 1)
                            setFirst(!first)
                        }
                        setYear(date.year)
                        setMonth(date.month + 1)
                        setEmptyMonth(date.year, date.month + 1)

                    }}
                    onDayPress={(date) => {
                        if (month != date.month) {
                            setMonth(date.month)
                            setEmptyMonth(date.year, date.month)
                        }
                    }}
                    onDayLongPress={(date) => {
                        setSelectedDate(date.dateString)
                        setYear(date.year)
                        setMonth(date.month)
                        setModalVisible(!modalVisible)
                    }}
                    showClosingKnob={true}
                />

                {/* 멤버에게 메세지 보내기 모달 */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={msgModal}
                    onRequestClose={() => {
                        setMsgModal(!msgModal)
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Send Message</Text>
                            <TextInput
                                numberOfLines={4}
                                multiline
                                editable
                                style={{height:100}}
                                placeholder="전송할 내용을 입력하세요"
                                onChangeText={setInput}
                                value={input}
                            />
                            <View style={{ flexDirection: "row" }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        sendMessage("message")
                                        setMsgModal(!msgModal)
                                    }}
                                >
                                    <Text style={styles.textStyle}>input</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setMsgModal(!msgModal)}
                                >
                                    <Text style={styles.textStyle}>cancel</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </Modal>

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
                                        sendInvitation()
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
                            onPress={() => {
                                deleteSchedule()
                                setDeleteModal(!deleteModal)
                            }}
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
        borderColor: 'black',
        borderWidth: 1,
        margin: 5,
        borderRadius: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1,
        padding: 10
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
