import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './SettingsScreen'
import TeamListScreen from './TeamListScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

import BoardStackScreen from './board/BoardStackScreen';

const Tab = createBottomTabNavigator();

export default function MainRouter(size, color) {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false}}>
            <Tab.Screen
                name="BoardStack"
                // component={BoardScreen}
                component={BoardStackScreen}
                options={{
                    tabBarIcon: ({size,color}) => (<Icon name={"home"} color={color} size={size}/>)
                }} />
            <Tab.Screen
                name="TeamList"
                component={TeamListScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (<Icon name={"group"} color={color} size={size} />)
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