import React, {useState, useEffect} from "react"
import {View, Text, Button, StyleSheet} from "react-native"
import {KakaoOAuthToken, login, getProfile as getKakaoProfile, getAccessToken} from "@react-native-seoul/kakao-login"

export default ()=>{

  const [result, setResult] = useState("nothing")
  const [name, setName] = useState("name")

  const signInWithKakao = async ()=> {
    const token = await login();
    setResult(JSON.stringify(token));
    console.log(result)
  };
  const getProfile = async ()=>{
    const profile = await getKakaoProfile();
    setName(profile.nickname)
    setResult(JSON.stringify(profile));
    console.log(result)
    console.log((await getAccessToken()).accessToken)
  };

  const getMoviesFromApiAsync = async () => {
    try {
      const response = await fetch(
        'https://reactnative.dev/movies.json'
      );
      const json = await response.json();
      console.log(json.mivies)
      return json.movies;
    } catch (error) {
      console.error(error);
    }
  };

  const sendProfileInfo = async ()=>{
    try{
      const response = await fetch(
        "http://localhost:8080/kakao"
      );
      const json = await response.json();
      console.log(json)
    }catch(e){
      console.error(e)
    }
  };

  const sendData = ()=>{
    return fetch('http://localhost:8080/kakao', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    }).then((response)=>console.log(response));
  }

  useEffect(()=>{
    console.log("Screen loaded")
  })

  return (
    <View style={{padding:40, justifyContent: "center", alignItems: "center"}}>
      <Text>TESTING</Text>
      <Text style={{fontSize:30}}>{name}</Text>
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
