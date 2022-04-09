import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UniversityList from './UniversityListScreen';
import BoardScreen from './BoardScreen';

//대학교 목록 - 게시판 - 게시글 화면을 볼 수 있게 해주는 스택네비게이터
const BoardStack = createNativeStackNavigator();
const App = ()=>{
    return (
        <BoardStack.Navigator>
            <BoardStack.Screen name="UnivList" component={UniversityList} />
            <BoardStack.Screen name="Board" component={BoardScreen} />
        </BoardStack.Navigator>
    )
}

export default App;