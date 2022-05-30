import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import CustomButton from '../components/CustomButton'
import Icon from 'react-native-vector-icons/Ionicons'
import { white } from 'react-native-paper/lib/typescript/src/styles/colors'

// https://yuddomack.tistory.com/entry/6React-Native-Navigation-%EA%B8%B0%EC%B4%88-1%EB%B6%80-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0?category=754156
const Home = ({navigation})=>{
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontSize:30, fontWeight:'800', color:'blue'}}>Group Calendar</Text>
      </View>

      <View style={styles.content}>
        <Icon name="calendar-outline" size={300} color={'darkblue'} borderWidth={10}></Icon>
        <Text style={styles.text}>Sejong University</Text>
        <Text style={styles.text}>OpenSource Project</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>Team 4</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>정준엽</Text>
        <Text style={styles.text}>박정우</Text>
        <Text style={styles.text}>심우열</Text>
      </View>

      <View style={styles.footer}>
        <CustomButton 
          buttonColor={'#9aa9ff'}
          title={'KAKAO로 로그인'}
          titleColor={'blue'}
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
    backgroundColor: 'lightgrey',
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
    borderColor:'lightgrey',
    borderRadius: 20,
    padding: 15,
    marginTop: 50 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  footer: {
    width:'100%',
    height:'15%',
    backgroundColor: 'lightgrey',
    padding: 15,
  },
  text: {
    fontWeight: 'bold'
  }
});

export default Home;