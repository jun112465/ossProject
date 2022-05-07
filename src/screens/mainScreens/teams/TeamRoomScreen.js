import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { TouchableOpacity } from "react-native-gesture-handler";

const TeamRoom = ({route, navigation})=>{

    console.log(route)
    return (
        <SafeAreaView style={{justifyContent: 'center',
        alignItems: 'center'}}>
            <Text style={{padding: 32, alignContent:"center", fontSize:24}}>{route.params.teamName}</Text>
            <Calendar
            markingType={'period'}
            markedDates={{
                // '2022-05-16': {selected: true, marked: true, selectedColor: 'blue'},
                // '2022-05-17': {marked: true},
                // '2022-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                // '2022-05-19': {disabled: true, disableTouchEvent: true}

                '2022-05-20': {textColor: 'green'},
                '2022-05-22': {startingDay: true, color: 'green'},
                '2022-05-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                '2022-05-04': {startingDay: true, color: 'green', endingDay: true},

                '2022-05-15': {marked: true, dotColor: '#50cebb'},
                '2022-05-16': {marked: true, dotColor: '#50cebb'},
                '2022-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
                '2022-05-22': {color: '#70d7c7', textColor: 'white'},
                '2022-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
                '2022-05-24': {color: '#70d7c7', textColor: 'white'},
                '2022-05-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
              }}
            style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 350,
                width: 400,
              }}
            />

            <View style={{
                backgroundColor: 'skyblue',
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            }}>
                <TouchableOpacity>
                    <Text style={{
                        fontSize: 20
                    }}>일정 등록</Text>
                </TouchableOpacity>
            </View>
            

        </SafeAreaView>
    )
}

export default TeamRoom;
