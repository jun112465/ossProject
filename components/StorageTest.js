import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, AsyncStorageStatic } from 'react-native';

const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
}

const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
}
  

const StorageTest = () => (
  <SafeAreaView style={styles.container}>
      <Button
        title="store data"
        onPress={()=>storeData("test1")}
      />

      <Text>
          {getData()}
      </Text>
 
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});

export default StorageTest;