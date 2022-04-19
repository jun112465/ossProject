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

    //영화 5개 불러오는 예제 데이터
    const getMovies = async () => {
        try {
            const response = await fetch('https://reactnative.dev/movies.json');
            const json = await response.json();
            setData(json.movies);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // 게시글 100개 불러오는 예제 데이터
    // 무한 스크롤 적용 예정
    const getPosts = async()=>{
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const json = await response.json();
            // 데이터 20개만 일단 설정해주기
            setData(json.slice(0,20)); 
            console.log(json[0]);
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false);
            console.log("data fetched");
        }

    }

    useEffect(() => {
        // getMovies();
        getPosts();
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
                        // keyExtractor가 뭔지 알아보기
                        // keyExtractor={({ id }, index) => id}
                        renderItem={renderItem}
                    />
                )}
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

export default BoardScreen;