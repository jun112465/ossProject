import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, TouchableOpacity, ActivityIndicator} from 'react-native';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: "Nostrud est nostrud nostrud exercitation. Proident laborum anim non aliqua aliquip ipsum sint minim dolor laboris fugiat. Minim duis officia voluptate proident et laboris aliquip id elit dolore irure laborum incididunt. Non qui pariatur commodo commodo quis laboris. Exercitation ut exercitation in nulla elit magna non. Do id laborum et et ullamco elit adipisicing voluptate ad dolor excepteur. Nostrud laboris anim est id amet." 
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: "Laboris aliquip consequat ea veniam irure incididunt. Ea ullamco qui sit magna deserunt ea consequat occaecat. Fugiat officia eu ex adipisicing consectetur anim amet. Pariatur anim deserunt exercitation aliqua labore. Ut irure qui irure velit commodo nisi est enim et ea.",
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: "Pariatur ad dolore tempor cupidatat deserunt aliqua. Nulla non qui anim ea et exercitation deserunt. Commodo dolor qui anim qui veniam non ad. Pariatur laborum deserunt incididunt sunt est consequat eu tempor mollit reprehenderit adipisicing ex veniam. Quis minim esse veniam reprehenderit enim mollit sit culpa.",
    },
];

const Item = ({title }) => (
    <View style={styles.item}>
        <TouchableOpacity onPress={() => { alert('Hi') }}>
            <Text style={styles.title}>제목</Text>
            <Text style={styles.content}>{title}</Text>
        </TouchableOpacity>
    </View>
);


const BoardScreen = ({route,navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch('https://reactnative.dev/movies.json');
            // const response = await fetch('http://localhost:8080/test');
            const json = await response.json();
            console.log("getJson : ", json)
            setData(json.movies);
            // setData([json]); // <- json은 리스트 형식이어야 한다
            // console.log("getMovies", json.movies)
            // console.log("data : ", data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);


    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>{route.params.schoolName} 게시판</Text>
            </View>
            <View style={{ flex: 1, padding: 24 }}>
                {isLoading ? <ActivityIndicator /> : (
                    <FlatList
                        data={data}
                        keyExtractor={({ id }, index) => id}
                        renderItem={renderItem}
                        // renderItem={({ item }) => (
                        //     <Text>{item.title}, {item.releaseYear}</Text>
                        // )}
                    />
                )}
            </View>
            {/* <Text>Hello Axios!!</Text>
            
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            /> */}
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

export default BoardScreen;