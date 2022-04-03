import React,{useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorageScreen = ()=>{

    const [textInputValue, setTextInputValue] = useState('');
    const [value, setValue] = useState('')

    const saveValue = ()=>{
        if(textInputValue) {
            AsyncStorage.setItem("key", textInputValue);
            setTextInputValue('')
            alert('Data saved')
        }else{
            alert('Please fill data')
        }
    }
    const getValue = ()=>{
        AsyncStorage.getItem("key").then((value)=>{
            setValue(value);
        })
    }
      
    return (
        <SafeAreaView style={{flex: 1,}}>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    AsyncStorage in React Native
                </Text>
                <TextInput
                placeholder='Enter Some Text Here'
                value={textInputValue}
                onChangeText={(data)=>setTextInputValue(data)}
                underlineColorAndroid='transparent'
                style={styles.textInputStyle}
                />
                <TouchableOpacity
                onPress={saveValue}
                style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>
                        Save Value
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity
                onPress={getValue}
                style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>
                        Get Value
                    </Text>

                </TouchableOpacity>
                <Text style={styles.textStyle}>
                    {value}
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
    },
    titleText:{
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    textInputStyle:{
        textAlign:'center',
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: 'blue',
        fontSize: 22,
    },
    buttonStyle: {
        fontSize: 16,
        color: 'white',
        backgroundColor: 'blue',
        padding: 5,
        marginTop: 10,
        minWidth: 250,
        height: 60,
        justifyContent: 'center'
    },
    buttonTextStyle: {
        padding: 5,
        color: 'white',
        textAlign: 'center',
        fontSize: 22,

    },
    textStyle: {
        padding: 5,
        textAlign: 'center',
        fontSize: 22,
    }

})

export default AsyncStorageScreen;