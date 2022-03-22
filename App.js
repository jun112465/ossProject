import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs(size, color) {
  return (
      <Tab.Navigator
          screenOptions={{ headerShown: false }}
      >
          <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                  tabBarIcon: ({ size, color }) => (<Icon name={"glass"} color={color} size={size} />)
              }}
          />

          <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                  tabBarIcon: ({ size, color }) => (<Icon name={"music"} color={color} size={size} />)
              }}
          />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  );
}
