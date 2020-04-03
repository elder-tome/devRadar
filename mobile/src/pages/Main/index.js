import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync  } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';

import styles from './styles';

function Main(){

  const [ devs, setDevs ] = useState([]);
  const [ currentRegion, setCurrentRegion ] = useState(null);
  const [ techs, setTechs ] = useState('');

  const navigation = useNavigation();
  
  useEffect(() => {
    async function loadInitialPosition(){
      const { granted } = await requestPermissionsAsync();

      if(granted){
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        });

      }
    }

    loadInitialPosition();

  }, []);

  function handleRegionChanged(region){
    setCurrentRegion(region);
  }

  async function loadDevs(){
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search',{
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setDevs(response.data);
  }

  if(!currentRegion){
    return null;
  }

  return (
    <>
      <MapView style={styles.map} onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion}>
        {devs.map(dev => (

          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1]
            }}>
            <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
            <Callout onPress={() => navigation.navigate('Profile', { github_username: dev.github_username })}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                {/* <Text style={styles.devBio}>.</Text> */}
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>

        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder='Buscar por tecnologias…'
          placeholderTextColor='#999'
          autoCapitalize='words'
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity style={ styles.loadButton } onPress={loadDevs}>
          <MaterialIcons name='my-location' size={20} color='#fff'/>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Main;