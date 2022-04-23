import react from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Calendar, CalendarList,Agenda, LocaleConfig} from 'react-native-calendars';

const Room = ()=>{

    return (
        <SafeAreaView>
            <Text>Room A</Text>
            <View>
                <Calendar/>
            </View>
        </SafeAreaView>
    )
}