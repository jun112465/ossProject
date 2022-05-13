import React, {useEffect} from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './SettingsScreen'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BoardStack from './board/BoardStack';
import TeamStack from './teams/TeamStack'
import MessageStack from './message/MessageStack'

const Tab = createBottomTabNavigator();
export default function MainRouter(size, color) {
    useEffect(()=>{
        console.log("mainRouter Screen")

        let a = async ()=>{
            let item = await AsyncStorage.getItem("accessToken")
            let id = await AsyncStorage.getItem("userId")
            console.log(item)
            console.log(id)
        }
        a()
    })
    return (
        <Tab.Navigator screenOptions={{ headerShown: false}}>
            <Tab.Screen
                name="BoardStack"
                // component={BoardScreen}
                component={BoardStack}
                options={{
                    tabBarIcon: ({size,color}) => (<Icon name={"home"} color={color} size={size}/>)
                }} />
            <Tab.Screen
                name="TeamStack"
                component={TeamStack}
                options={{
                    tabBarIcon: ({ size, color }) => (<Icon name={"group"} color={color} size={size} />)
                }} />
            <Tab.Screen
                name="MessageStack"
                component={MessageStack}
                options={{
                    tabBarIcon: ({ size, color }) => (<Icon name={"envelope"} color={color} size={size} />)
                }} />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({size, color}) => (<Icon name={"user"} color={color} size={size}/>)
                }} />
        </Tab.Navigator>
    );
}