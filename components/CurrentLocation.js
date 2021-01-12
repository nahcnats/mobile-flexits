import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';

import Card from '../components/UI/Card';
import MapButton from '../components/UI/MapButton';

const CurrentLocation = props => {
  const [address, setAddress] = useState();
  const locationCoords = useSelector(state => state.location.location);

  const getAddress = async () => {
    const response = await Location.reverseGeocodeAsync({
      latitude: locationCoords.coords.latitude,
      longitude: locationCoords.coords.longitude,
    });

    let district = response[0].district ? `{response[0].district},` : '';

    let formatedAddress = `${response[0].name}, ${response[0].street}, ${district} ${response[0].postalCode} `;
    formatedAddress += `${response[0].city}, ${response[0].region}, ${response[0].country}`;

    setAddress(formatedAddress);
  }

  const CurrentAddress = () => {
    getAddress();

    return (
      <View>
        <View>
          <Text style={styles.label}>Your current location address is: </Text>
        </View>
        {
          address ?
          <View style={styles.addressContainer}>
            <Text style={styles.text}>{address}</Text>
            <MapButton />
          </View>
          :
          <View style={styles.addressContainer}>
            <Text style={styles.text}>No address found!</Text>
          </View>
        }
      </View>
    );
  }

  return (
    <CurrentAddress />
  );
}

const styles = StyleSheet.create({
  locationContainer: {
    width: '90%',
    maxHeight: 400,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  label: {
    fontFamily: 'open-sans-bold',
  },
  text: {
    fontFamily: 'open-sans',
  },
  coordsContainer: {
    paddingBottom: 10
  },
  coords: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 2
  },
  addressContainer: {
    maxWidth: '90%',
    flexDirection: 'row'
  }
});

export default CurrentLocation;
