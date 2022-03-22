//to use JSX
import React, {useState} from 'react';
//to use components
import { Text, View, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const Greeting = (props) => {
    return (
        <View style={styles.center}>
            <Text>Hello {props.name}</Text>
        </View>
    )
}

const LotsOfGreetings = ()=>{
    return (
        <View style={[styles.center, {top:50}]}>
            <Greeting name='JunYeob'/>
            <Greeting name='JunSung'/>
            <Greeting name='YoonSung'/>
        </View>
    )
}

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
    </View>
  )
}

const App = ()=>{
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text>You clicked {count} times</Text>
            <Button 
                onPress={()=>setCount(count + 1)}
                title="click me!"
            />
        </View>
    )
}
// export default LotsOfGreetings;
export default App;