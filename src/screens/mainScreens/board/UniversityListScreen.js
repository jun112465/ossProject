import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, TouchableOpacity, ActivityIndicator} from 'react-native';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        schoolName: "세종대",
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        schoolName: "건국대",
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        schoolName: "##대",
    },
];



//대학교 목록을 화면에 출력해준다
const Screen = ({navigation}) => {
    const Item = ({ schoolName }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => { navigation.navigate('Board')}}>
                <Text style={styles.title}>{schoolName}</Text>
            </TouchableOpacity>
        </View>
    );
    const renderItem = ({ item}) => (
        <Item schoolName={item.schoolName} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, padding: 24 }}>
                <FlatList
                    data={DATA}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 14,
    }
});

export default Screen;