// import * as React from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorageScreen from './src/examples/AsyncStorageScreen';
//화면목록
import Home from './src/screens/Home'
import MainRouter from './src/screens/mainScreens/MainRouter';

import kakaoLogin from './src/screens/KakaoLogin';

//이동할 수 있는 화면들의 스택
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown: false}}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home',}}
        />
        <Stack.Screen
          name="MainRouter"
          component={MainRouter}
          options={{ title: "Main" }}
        />
        <Stack.Screen
          name="Login"
          component={kakaoLogin}
          options={{ title: 'Welcome'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// // https://yuddomack.tistory.com/entry/6React-Native-Navigation-%EA%B8%B0%EC%B4%88-1%EB%B6%80-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0?category=754156

export default App;