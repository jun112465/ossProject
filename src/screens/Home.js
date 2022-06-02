import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import CustomButton from '../components/CustomButton'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { white } from 'react-native-paper/lib/typescript/src/styles/colors'

// https://yuddomack.tistory.com/entry/6React-Native-Navigation-%EA%B8%B0%EC%B4%88-1%EB%B6%80-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0?category=754156
const Home = ({navigation})=>{
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon style={{marginTop:200, marginBottom:20}} name="calendar-day" size={80} color={'black'} borderWidth={10}></Icon>
        <Text style={{fontSize:30, fontWeight:'800', color:'black'}}>Group Calendar</Text>
        {/* <Text style={styles.text}>Sejong University</Text>
        <Text style={styles.text}>OpenSource Project</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>Team 4</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>정준엽</Text>
        <Text style={styles.text}>박정우</Text>
        <Text style={styles.text}>심우열</Text>
         */}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{backgroundColor:'skyblue', height:50, borderColor:'black', borderWidth:0, borderRadius:50, justifyContent:'center'}}
          onPress={() => {
            navigation.navigate('Login')
          }}
        >
          <Text style={{textAlign:'center', textAlignVertical:'center', fontSize:20, fontWeight:'700', color:'black'}}>kakao login</Text>
        </TouchableOpacity>
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
    backgroundColor: 'skyblue',
    borderWidth: 10,
    borderColor:'black',
    borderRadius: 20,
    padding: 15,
    marginTop: 50 
  },
  content: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footer: {
    // width:'100%',
    // height:'25%',
    flex:1,
    backgroundColor: 'white',
    padding: 15,
    marginBottom:200
  },
  text: {
    fontWeight: 'bold'
  }
});

export default Home;