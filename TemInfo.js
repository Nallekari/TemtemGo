
import React, { useState, useEffect } from 'react';
import {Alert, StyleSheet, Text, View, Image, Button } from 'react-native';
import  AsyncStorage  from  '@react-native-async-storage/async-storage';


export default function TemInfo({route, navigation}) {
  const { data } = route.params;
  const [temAmount, setTemAmount] = useState('');
  
  useEffect(() => {
    const findData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        setTemAmount(keys.length + 1);
      } catch (e) {
        Alert.alert('Error getting data new');
      }
    }
    findData();
  }, []);

  function saveMyTem() {
    const trySave = async () =>{
      try {
        console.log(temAmount);
        setTemAmount(temAmount + 1);
        await AsyncStorage.setItem(String(temAmount), JSON.stringify({number: data.number, name: data.name, types: data.types, icon: data.portraitWikiUrl}));
        navigation.navigate('My Collection')
      }
      catch (error) {
        Alert.alert('Error catching temtem');
      }
    }
    trySave();
  }

  return (
      <View style={styles.container}>
        <Image source={{uri: data.wikiRenderStaticUrl}} style={{ width: 300, height: 300, resizeMode: 'contain' }}></Image>
        <Text>Name: {data.name}</Text>
        <Text>Number: {data.number}</Text>
        <Text>Types: {data.types}</Text>
        <Text>{data.gameDescription}</Text>
        {route.params.string == 'TemMap' ? <Button title='Add to My Collection' onPress={saveMyTem}></Button> : <Text></Text>}
        {route.params.string == 'MyCollection' ?
          <View>
            <Text style={{ fontWeight:'bold'}}>Statistics</Text>
            <Text>Hp: {data.stats.hp}</Text>
            <Text>Stamina: {data.stats.sta}</Text>
            <Text>Speed: {data.stats.spd}</Text>
            <Text>Attack: {data.stats.atk}</Text>
            <Text>Defence: {data.stats.def}</Text>
            <Text>Special Attack: {data.stats.spatk}</Text>
            <Text>Special Defence: {data.stats.spdef}</Text>
            <Text>Total: {data.stats.total}</Text>
          </View>
          :
          <Text></Text>
        }
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5deb3',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        marginTop: 50
    },
})