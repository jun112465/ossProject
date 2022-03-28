import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const CustomButton = (props)=>{
    _props = {
        title: 'untitled',
        buttonColor: "#000",
        titleColor: "#fff",
        onPress: ()=>null,
    }
    for(el in props){
        _props[el] = props[el]
    }
    props = _props

    return (
        <TouchableOpacity 
            style={[
                styles.button,
                {backgroundColor: props.buttonColor}
            ]}
            onPress={props.onPress}
        >
            <Text style={[
                styles.title,
                {color: props.titleColor}
            ]}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    //   margin:15,
    //   marginTop: 0,
      marginBottom: 5,
      borderRadius: 15,
    },
    title: {
      fontSize: 15,
    },
  });

export default CustomButton;