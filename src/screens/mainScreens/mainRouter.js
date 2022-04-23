import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './SettingsScreen'
import Icon from 'react-native-vector-icons/FontAwesome';

import BoardStack from './board/BoardStack';
import TeamStack from './teams/TeamStack'
import MessageStack from './message/MessageStack'

const Tab = createBottomTabNavigator();

export default function MainRouter(size, color) {
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