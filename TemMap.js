
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import googleMapStyle from './GoogleMapStyle.json';
import * as Location from 'expo-location';



export default function TemMap({navigation}) {
    

    const [location, setLocation] = useState([null]); // State where location is saved
    const [lat, setLat] = useState(60.201373);
    const [lng, setLng] = useState(24.934041);
    const [number, setNumber] = useState(Math.floor(Math.random() * 163) + 1);
    const [temtem, setTemtem] = useState([]);
    const [randLong, setRandLong] = useState(24.934+Math.floor((Math.random() * 20) + 1) / 10000);
    const [randLat, setRandLat] = useState(60.2 + Math.floor((Math.random() * 20) + 1) / 10000);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLat(location.coords.latitude);
      setLng(location.coords.longitude);
      setLocation(location);
    })();
  }, []);


    const initial = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
      };
    
      const coordinates = {
        latitude: lat,
        longitude: lng
      };

    
    useEffect(() => {
      setNumber(Math.floor(Math.random() * 163) + 1);
      fetch(`https://temtem-api.mael.tech/api/temtems/${number}`)
        .then(response => response.json())
        .then(responseJson => {
          setTemtem(responseJson);
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    }, []);

    const checkTem = () => {
    navigation.navigate('Tem Info', {data: temtem, string: 'TemMap'})
  }
  
  const findTems = () => {
    setNumber(Math.floor(Math.random() * 163) + 1);
    setRandLat(lat+Math.floor((Math.random() * 15) + 1) / 10000);
    setRandLong(lng+Math.floor((Math.random() * 15) + 1) / 10000)
      fetch(`https://temtem-api.mael.tech/api/temtems/${number}`)
        .then(response => response.json())
        .then(responseJson => {
          setTemtem(responseJson);
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    }
  
  
    return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
          region={initial}
          customMapStyle={googleMapStyle}>
            <Marker
              coordinate={coordinates}
              title='My Position'/>
            <Marker
            coordinate={{
              latitude: randLat,
              longitude: randLong,
            }}
            onPress={checkTem}
            >
            <Image source={{ uri: temtem.wikiRenderStaticUrl }} style={{ width: 55, height: 55 }} resizeMode='contain'></Image>
            </Marker>
          </MapView>
          <View style={{ width: "100%" }}>
                <Button onPress={() => {findTems()}} title="Find Temtems"></Button>
          </View>
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
      padding: 30,
      flex: 1,
      backgroundColor: '#f5deb3',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    map: {
      flex: 1,
      width: "100%",
      height: "100%",
    }
});

