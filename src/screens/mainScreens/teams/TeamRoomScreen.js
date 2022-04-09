import React from "react";
import { Text, SafeAreaView } from "react-native";

const TeamRoom = ({route, navigation})=>{

    console.log(route)
    return (
        <SafeAreaView style={{justifyContent: 'center',
        alignItems: 'center'}}>
            <Text style={{padding: 32, alignContent:"center", fontSize:24}}>{route.params.teamName}</Text>
        </SafeAreaView>
    )
}

export default TeamRoom;