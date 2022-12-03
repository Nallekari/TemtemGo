import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, StatusBar, Image, Pressable  } from 'react-native';
import { Icon, ListItem } from '@rneui/base';
import  AsyncStorage  from  '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


export default function TemtemList({ navigation }) {

  const [temtems, setTemtems] = useState([]);
  const [temInCollection, setTemInCollection] = useState([]);
  
  useFocusEffect(
    React.useCallback(() => {
      findData();
      return () => {
      };
    }, [])
  );

  useEffect(() => {
    fetch(`https://temtem-api.mael.tech/api/temtems/`)
      .then(response => response.json())
      .then(responseJson => {
        setTemtems(responseJson);
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  }, []);
  
  const findData = async () => {
    try {
      setTemInCollection([]);
      const keys = await AsyncStorage.getAllKeys();
      if (keys !== null) {
        await AsyncStorage.multiGet(keys).then(key => {
          key.forEach(data => {
            const parsed = JSON.parse(data[1])
            setTemInCollection(temInCollection => [...temInCollection, parsed.number])
          })
        })
      }
    } catch (e) {
      Alert.alert('Error getting data new')
    }
  }
  
    return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Text style={{fontWeight:'bold', fontSize:30}}>List of all Temtems</Text>
          <FlatList 
            style={{width: '85%' }}
            data={temtems} 
            keyExtractor={(item, index) => index.toString()} 
            renderItem={({ item }) =>
              <Pressable onPress={() => navigation.navigate('Tem Info', {data: item, string: 'TemtemList'})}>
                <ListItem bottomDivider containerStyle={{backgroundColor: '#523351'}} style={{padding: 3}}>
                  <ListItem.Content style={{ backgroundColor: '#f5deb3', padding:15, flexDirection:'row' }}>
                    <ListItem.Content style={{ backgroundColor: '#f5deb3', flexDirection:'column' }}>
                      <ListItem.Title>Name: {item.name}</ListItem.Title>
                      <ListItem.Subtitle>Number: {item.number}</ListItem.Subtitle>
                      <ListItem.Content style={{ backgroundColor: '#f5deb3', flexDirection:'row' }}>
                        <ListItem.Subtitle>Caught: </ListItem.Subtitle>
                        {temInCollection.indexOf(item.number) > -1 ? <Icon name='check' color='green'></Icon> : <Icon name='close' color='red'></Icon>}
                      </ListItem.Content>
                    </ListItem.Content>
                    <ListItem.Content style={{ backgroundColor: '#f5deb3', flexDirection:'column', justifyContent:'flex-end', alignItems:'flex-end' }}>
                      <Image
                        source={{ uri: item.portraitWikiUrl }}
                        style={{ backgroundColor: '#f5deb3', width: 72, height: 72, resizeMode: 'contain' }}>
                      </Image>
                    </ListItem.Content>
                  </ListItem.Content>
                </ListItem>
              </Pressable>
            }
          /> 
        </View>
      );
    
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#83fdff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    
});