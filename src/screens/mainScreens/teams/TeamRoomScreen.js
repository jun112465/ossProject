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
