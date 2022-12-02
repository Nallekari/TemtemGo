import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, FlatList, StatusBar, Image, Pressable  } from 'react-native';
import { Button, ListItem } from '@rneui/base';
import  AsyncStorage  from  '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';




export default function MyCollection({ navigation }) {

  const [savedData, setSavedData] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      updateData();
      return () => {
      };
    }, [])
  );


  useEffect(() => {
    const findData = async () => {
      try {
        setSavedData([]);
        const keys = await AsyncStorage.getAllKeys();
        if (keys !== null) {
          await AsyncStorage.multiGet(keys).then(key => {
            key.forEach(data => {
              const parsed = JSON.parse(data[1])
              setSavedData(savedData => [...savedData, parsed])
            })
          });
        }
      } catch (e) {
        Alert.alert('Error getting data')
      }
    }
    findData();
  }, []);
  
  const updateData = async () => {
    try {
      setSavedData([]);
      const keys = await AsyncStorage.getAllKeys();
      if (keys !== null) {
        await AsyncStorage.multiGet(keys).then(key => {
          key.forEach(data => {
            const parsed = JSON.parse(data[1])
            setSavedData(savedData => [...savedData, parsed])
          })
        });
      }
    } catch (e) {
      Alert.alert('Error getting data')
    }
  }
  
  const clearData = () => {
    Alert.alert(
      "Clear My Collection",
      "Are you sure you want to empty your collection? This can't be undone",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>  clearStorage()}
      ]
    );
  }
  const clearStorage = () => {
    AsyncStorage.clear()
    updateData();
  }

  const checkInfo = (number) => {
    fetch(`https://temtem-api.mael.tech/api/temtems/${number}`)
    .then(response => response.json())
      .then(responseJson => {
      navigation.navigate('Tem Info', { data: responseJson, string: 'MyCollection' });
    })
    .catch(error => {
      Alert.alert('Error', error.message);
    });
  }

    return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <FlatList 
            style={{width: '85%' }}
            data={savedData}
            keyExtractor={(item, index) => index.toString()} 
            renderItem={({ item }) =>
            <Pressable onPress={() => checkInfo(item.number)}>
              <ListItem containerStyle={{backgroundColor: '#523351'}} style={{padding: 3}}>
                <ListItem.Content style={{ backgroundColor: '#f5deb3', padding:15, flexDirection:'row' }}>
                  <ListItem.Content style={{ padding:10}}>
                    <ListItem.Title >Name: {item.name}</ListItem.Title>
                    <ListItem.Subtitle>Number: {item.number}</ListItem.Subtitle>
                    <ListItem.Subtitle>Type: {item.types[0]}</ListItem.Subtitle>
                    <ListItem.Subtitle>           {item.types[1]}</ListItem.Subtitle>
                  </ListItem.Content>
                  <Image 
                    source={{ uri: item.icon }}
                    style={{ backgroundColor: '#f5deb3',width: 100, height: 100, resizeMode: 'contain'  }}>
                  </Image>
                </ListItem.Content>
              </ListItem>
            </Pressable>
            }
            />
          <Button onPress={clearData} title=" CLEAR ALL " buttonStyle={{backgroundColor:'#58181F', borderRadius:20}}></Button>
        </View>
      );
    
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#83fdff',
            alignItems: 'center',
        justifyContent: 'center',
            padding: 5,
        },
});