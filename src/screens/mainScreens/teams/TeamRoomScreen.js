import React, {useState, useEffect} from "react";
import { Text, SafeAreaView, View, StyleSheet} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { TouchableOpacity } from "react-native-gesture-handler";

const TeamRoom = ({route, navigation})=>{

    const [items, setItems] = useState({
        '2022-05-22': [{ name: 'item 1 - any js object' }],
        '2022-05-23': [{ name: 'item 2 - any js object', height: 80 }],
        '2022-05-24': [],
        '2022-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
    })
    const [month,setMonth] = useState(0)



    const setEmptyMonth = (m)=>{
        let daysOfMonth = new Date(m.year, m.month, 0).getDate()
        tmpItems = {}
        for (let i = 1; i <= daysOfMonth; i++) {
            key = m.year + "-" + m.month.toString().padStart(2, '0') + "-" + i.toString().padStart(2, '0')
            if(key in items) continue
            items[key] = []
        }
    }

    const renderItem = (item) => {
        return (
          <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
            <Text>{`🍪`}</Text>
          </View>
        );
      };

    return (
        <SafeAreaView style={styles.safe}>
            <Agenda
                items={items}
                renderItem={renderItem}
                loadItemsForMonth={m => {
                    setEmptyMonth(m)
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
      flex: 1,
    },
    itemContainer: {
      backgroundColor: 'white',
      margin: 5,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });

export default TeamRoom;
