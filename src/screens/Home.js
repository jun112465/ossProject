import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import CustomButton from '../components/CustomButton'

// https://yuddomack.tistory.com/entry/6React-Native-Navigation-%EA%B8%B0%EC%B4%88-1%EB%B6%80-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0?category=754156
const Home = ()=>{
  return (
    <View style={styles.container}>
      <View style={styles.header}><Text>header</Text></View>
      <View style={styles.title}><Text>title : 앱 초기화면</Text></View>
      <View style={styles.content}>
        <Image
          // style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
          style={{height:'100%', width:'100%'}}
          source={require('ossProject/images/bg.jpeg')} />
      </View>
      <View style={styles.footer}>
        <CustomButton 
          buttonColor={'#000'}
          title={'로그인'}
          titleColor={'#fff'}
          onPress={()=>alert('로그인 버튼')}
        />
        <CustomButton
          buttonColor={'#444'}
          title={'회원가입'}
          titleColor={'#fff'}
          onPress={() => alert('회원가입 버튼')}
        />
      </View>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: 'black',
  },
  header: {
    width:'100%',
    height:'9%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9a9a',
  },
  title: {
    width:'100%',
    height:'18%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9aa9ff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d6ca1a',
  },
  footer: {
    width:'100%',
    height:'20%',
    backgroundColor: '#1ad657',
    padding: 15,
  },
});
export default Home;