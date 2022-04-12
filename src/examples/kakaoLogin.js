import React, {useState, useEffect} from "react"
import {View, Text, Button, StyleSheet} from "react-native"
import {KakaoOAuthToken, login, getProfile as getKakaoProfile} from "@react-native-seoul/kakao-login"

export default ()=>{

  const [result, setResult] = useState("nothing")

  const signInWithKakao = async ()=> {
    const token = await login();
    setResult(JSON.stringify(token));
    console.log(result)
  };
  const getProfile = async ()=>{
    const profile = await getKakaoProfile();
    setResult(JSON.stringify(profile));
    console.log(result)
  };

  useEffect(()=>{
    console.log("Screen loaded")
    console.log(result)
    console.log(login)
    console.log(KakaoOAuthToken)
  })

  return (
    <View style={{padding:40, justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontSize:30, padding: 20}}>정보 출력</Text>
      <Text style={{fontSize:15}}>{result}</Text>
      <Button
      title="login"
      onPress={()=>{signInWithKakao()}}/>
      <Button
      title="get Profile"
      onPress={()=>{getProfile()}} />
    </View>
  )
}
