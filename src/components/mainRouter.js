import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BoardScreen from '../screens/mainScreens/BoardScreen';
import SettingsScreen from '../screens/mainScreens/SettingsScreen'
import TeamListScreen from '../screens/mainScreens/TeamListScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function MainRouter(size, color) {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false}}>
            <Tab.Screen
                name="Board"
                component={BoardScreen}
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