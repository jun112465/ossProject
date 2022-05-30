import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './SettingsScreen'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TeamStack from './teams/TeamStack'
import MessageList from './MessageList'

const Tab = createBottomTabNavigator();
export default function MainRouter({route, navigation}) {
    useEffect(()=>{
        // 객체타입과 스트링을 +로 콘솔에 찍게되면 제대로 출력이 안된다.
        // 반드시 ,를 이용해 출력하도록 하자.
        console.log("MainRouter Props :", route.params)
    })
    return (
        // 하단 네비게이터
        <Tab.Navigator 
            screenOptions={{headerShown:false}}
        >
            {/* 팀 스택 네비게이션 */}
            <Tab.Screen
                name="TeamStack"
                children={()=><TeamStack 
                    userId={route.params.userId} 
                    navigation={navigation}
                />}
                options={{
                    tabBarIcon: ({ size, color }) => (<Icon name={"group"} color={color} size={size} />),
                }}
            />
            {/* 메세지 리스트 화면 */}
            <Tab.Screen
                name="MessageList"
                children={()=><MessageList 
                    userId={route.params.userId} 
                    navigation={navigation}
                />}
                options={{
                    tabBarIcon: ({ size, color }) => (<Icon name={"envelope"} color={color} size={size} />),
                }} />
            {/* 설정 화면 */}
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({size, color}) => (<Icon name={"user"} color={color} size={size}/>)
                }} />
        </Tab.Navigator>
    );
}