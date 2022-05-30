import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TextInput } from 'react-native';

const App = () => (
  <SafeAreaView style={styles.container}>    
    <Text style={{textAlign:'center', fontSize:30, margin: 20}}>개인정보</Text>

    <View style={{margin:20}}> 
      <View style={{
        flexDirection:"row",
      }}>
        <Text style={styles.infoText}>ID : </Text>
        <Text style={styles.infoText}>{userId}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
        <Text style={styles.infoText}>NICKNAME : </Text>
        <Text style={styles.infoText}>{nickname}</Text>
      </View>
    </View>
    
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoText: {
    fontSize: 30,
    textAlign: 'center'
  }
});

export default App;