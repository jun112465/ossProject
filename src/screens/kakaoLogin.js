import React, {useState, useEffect} from "react"
import {View, Text, Button, StyleSheet} from "react-native"
import {KakaoOAuthToken, login, getProfile as getKakaoProfile, getAccessToken} from "@react-native-seoul/kakao-login"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({navigation})=>{
  const [result, setResult] = useState("")

  // user의 프로필 정보 
  let profile = null

  // asyncStorage에 저장
  const saveValue = (access, refresh)=>{
    console.log(access)
    console.log(refresh)
    AsyncStorage.setItem("accessToken", access)
    AsyncStorage.setItem("refreshToken", refresh)
  }

  // 카카오에 로그인 후 토큰 요청
  const signInWithKakao = async ()=> {
    let token = await login();
    accessToken = token.accessToken
    refreshToken = token.refreshToken
    saveValue(accessToken, refreshToken);
  };

  // 토큰을 기반으로 프로필 정보 불러오기
  const getProfile = async ()=>{
    profile = await getKakaoProfile();
    // setResult(JSON.stringify(profile))
    // 1. setState함수는 비동기 함수다
    // 2. 호출후에 useEffect가 실행된다
    // await setResult(JSON.stringify(profile))
  };

  //서버에 회원 정보 전송
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
      .then(data => console.log(data))
      .then(d=>{
        navigation.navigate("MainRouter")
      })
  };

  // 렌더링 후 실행
  useEffect(()=>{
    // 비동기 실행을 위해 함수를 따로 만들었음
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
