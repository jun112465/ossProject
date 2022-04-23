import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MessageList from "./MessageList"
import Message from "./Message"
//대학교 목록 - 게시판 - 게시글 화면을 볼 수 있게 해주는 스택네비게이터
const MessageStack = createNativeStackNavigator();
const App = ()=>{
    return (
        <MessageStack.Navigator>
            <MessageStack.Screen name="MessageList" component={MessageList} />
            <MessageStack.Screen name="Message" component={Message} />
        </MessageStack.Navigator>
    )
}

export default App;