import React, {useState, useEffect} from "react"
import {View, Text, Button, StyleSheet} from "react-native"
import {KakaoOAuthToken, login, getProfile as getKakaoProfile, getAccessToken} from "@react-native-seoul/kakao-login"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({navigation})=>{
  const [result, setResult] = useState("")

  let profile = null

  const saveValue = (access, refresh)=>{
    console.log(access)
    console.log(refresh)
    AsyncStorage.setItem("accessToken", access)
    AsyncStorage.setItem("refreshToken", refresh)
  }

  const signInWithKakao = async ()=> {
    let token = await login();
    accessToken = token.accessToken
    refreshToken = token.refreshToken
    saveValue(accessToken, refreshToken);
  };

  const getProfile = async ()=>{
    profile = await getKakaoProfile();
    // setResult(JSON.stringify(profile))
    // 1. setState함수는 비동기 함수다
    // 2. 호출후에 useEffect가 실행된다
    // await setResult(JSON.stringify(profile))
  };

  const sendData = async ()=>{
    // console.log("sendData : 3")
    id = profile.id
    nickname = profile.nickname
    console.log(id, nickname)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'id':id, 'nickname':nickname })
    };
    fetch('http:/localhost:8080/kakao', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
    // try {
    //   const response = await fetch(
    //     'http://localhost:8080/kakao', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ 'id': id, 'nickname': nickname })
    //     }
    //   );
    //   const json = response.json();
    //   console.log(json)
    // } catch (error) {
    //   throw error
    // }
  };

  useEffect(()=>{
    async function loginFunc(){
      await signInWithKakao();
      await getProfile();
      await sendData()
      navigation.navigate("Home")
    }
    loginFunc()
  })

  return (
    <View style={{padding:40, justifyContent: "center", alignItems: "center"}}>
      <Text>TESTING</Text>
      <Text style={{fontSize:30}}></Text>
      <Text style={{fontSize:30}}></Text>
      <Text style={{fontSize:30, padding: 20}}>정보 출력</Text>
      <Text style={{fontSize:15}}>{result}</Text>
      <Button
      title="login"
      onPress={()=>{signInWithKakao()}}/>
      <Button
      title="get Profile"
      onPress={()=>{getProfile()}} />
      <Button
        title="send Profile"
        onPress={() => {sendData()}} />
    </View>
  )
}
