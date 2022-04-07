import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TeamList from './TeamListScreen';
//대학교 목록 - 게시판 - 게시글 화면을 볼 수 있게 해주는 스택네비게이터
const TeamStack = createNativeStackNavigator();
const App = ()=>{
    return (
        <TeamStack.Navigator>
            <TeamStack.Screen name="TeamList" component={TeamList} />
        </TeamStack.Navigator>
    )
}

export default App;