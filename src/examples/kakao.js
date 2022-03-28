import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

//카카오톡 프로필 창 디자인
const App = ()=>{
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.content}>

        <View style={styles.elem}>
          <View style={styles.userInfo}>
            <View style={styles.profile} />
            <Text style={styles.name}>윾또막</Text>
          </View>
          <View style={styles.userComment}>
            <Text>대화명을 입력하세요</Text>
          </View>
        </View>

        <View style={styles.elem}>
          <View style={styles.userInfo}>
            <View style={styles.profile} />
            <Text style={styles.name}>저커버그</Text>
          </View>
          <View style={styles.userComment}>
            <Text>정말 맥주라도 한 잔 사는게 어떻겠니?</Text>
          </View>
        </View>

      </View>
      <View style={styles.footer} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height:60,
    backgroundColor:'green',
  },
  footer: {
    height:60,
    backgroundColor:'red',
  },
  content: {
    flex:1,
  },

  elem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor:'#eee',
    borderBottomWidth:0.5,
    padding: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userComment: {
    padding:8,
    backgroundColor:'yellow',
    borderRadius:5,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'yellow',
  },
  name: {
    paddingLeft: 10,
  }
})

export default App;

