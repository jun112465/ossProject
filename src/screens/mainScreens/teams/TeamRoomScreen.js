import React, {useState, useEffect} from "react";
import { Text, SafeAreaView, View, StyleSheet, Modal, Pressable, TextInput, TouchableOpacity, FlatList} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Icon from 'react-native-vector-icons/FontAwesome';
import {KakaoOAuthToken, login, getProfile as getKakaoProfile, getAccessToken} from "@react-native-seoul/kakao-login"

const TeamRoom = ({route, navigation})=>{

    const [items, setItems] = useState({
        '2022-05-22': [{ name: 'item 1 - any js object', id:121 }],
        '2022-05-23': [{ name: 'item 2 - any js object', height: 80, id:122 }],
        '2022-05-24': [],
        '2022-05-25': [{ name: 'item 3 - any js object', id:123 }, { name: 'any js object', id:124 }]
    })
    const [month, setMonth] = useState(0)
    const [first, setFirst] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [input, setInput] = useState("")

    const [showMenu, setShowMenu] = useState(false)
    const [left,setLeft] = useState(0)

    useEffect(()=>{
        if(showMenu) setLeft(170)
        else setLeft(0)

    }, [input, showMenu])

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


    const renderItem = (item) => {
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
      };

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

    const getProfileImage = ()=>{

    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={{marginTop:50, justifyContent:"flex-start"}}>
                <Text>weoijfwefoij</Text>
                
            </View>
            <View style={{flexGrow:1, position:"absolute", top:50, bottom:0, left:left, right:0}}>
            <TouchableOpacity
                style={{width:50, alignItems:"flex-end"}}
                onPress={async ()=>{
                    console.log("pressed")
                    setShowMenu(!showMenu)
                }}
            >
                <Icon 
                size={25}
                style={{marginLeft:10, marginBottom:10}}
                name={'navicon'} 
                color={"black"}/>
            </TouchableOpacity>
            <Agenda
                styles={{flex:4}}
                items={items}
                renderItem={renderItem}
                loadItemsForMonth={async date=>{
                    // 처음에 1회만 실행
                    if(first){
                        setMonth(date.month+1)
                        setEmptyMonth(date.year, date.month+1)
                        setFirst(!first)
                    }
                }}
                onDayPress={(date)=>{
                    if(month != date.month){
                        setMonth(date.month)
                        setEmptyMonth(date.year, date.month)
                    }
                }}
                onDayLongPress={(day)=>{
                    renderModal(day.dateString)
                }}
                showClosingKnob={true}
            />

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
                <View style={{marginTop:"165%", marginBottom:"10%"}}>
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
