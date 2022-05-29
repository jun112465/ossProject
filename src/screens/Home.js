import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import CustomButton from '../components/CustomButton'
import Icon from 'react-native-vector-icons/Ionicons'
import { white } from 'react-native-paper/lib/typescript/src/styles/colors'

// https://yuddomack.tistory.com/entry/6React-Native-Navigation-%EA%B8%B0%EC%B4%88-1%EB%B6%80-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0?category=754156
const Home = ({navigation})=>{
  useEffect(()=>{
  })

  // //로그인 상태면 바로 메인 라우터로 넘어가기
  // if(getValue){
  //   console.log("AccessToken detected")
  //   // navigation.navigate("MainRouter")
  // }else{
  //   console.log("No AccessToken")
  // }

  // AsyncStorage.getItem("userId", console.log)

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontSize:30, fontWeight:'800', color:'white'}}>Group Calendar</Text>
      </View>
      <View style={styles.content}>
        <Icon name="calendar-outline" size={180}></Icon>
        <Text>Sejong University</Text>
        <Text>OpenSource Project</Text>
        <Text>Team 4</Text>
        <Text>정준엽</Text>
        <Text>박정우</Text>
      </View>
      <View style={styles.footer}>
        {/* <CustomButton
          buttonColor={'#000'}
          title={'메인화면'}
          titleColor={'#fff'}
          onPress={() => navigation.navigate('MainRouter')}
        /> */}
        <CustomButton 
          buttonColor={'#000'}
          title={'KAKAO로 로그인'}
          titleColor={'#fff'}
          onPress={() => navigation.navigate('Login', {
            color: "red"
          })}
        />
      </View>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: 'white',
  },
  header: {
    width:'100%',
    height:'15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    width:'100%',
    height:'10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9aa9ff',
    borderWidth: 10,
    borderColor:'white',
    borderRadius: 100 ,
    marginTop: 50 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footer: {
    width:'100%',
    height:'20%',
    backgroundColor: 'white',
    padding: 15,
  },
});
export default Home;