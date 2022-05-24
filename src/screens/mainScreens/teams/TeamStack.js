import React,{useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Button} from 'react-native'

import TeamList from './TeamListScreen';
import TeamRoom from './TeamRoomScreen'
//대학교 목록 - 게시판 - 게시글 화면을 볼 수 있게 해주는 스택네비게이터
const TeamStack = createNativeStackNavigator();
const App = ({userId, navigation})=>{

    useEffect(()=>{
        console.log("TeamStack :", userId);
    })
    return (
        <TeamStack.Navigator
            screenOptions={{headerShown:false}}
        >
            <TeamStack.Screen 
            name="TeamList" 
            component={TeamList} 
            />
            <TeamStack.Screen 
            name="TeamRoom" 
            component={TeamRoom} 
            options={{headerShown:false}}
            />
        </TeamStack.Navigator>
    )
}

export default App;