import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux';

import MapButton from '../components/UI/MapButton';

// Import redux action
import * as locationActions from '../store/actions/location';

const CurrentLocation = props => {
  const [address, setAddress] = useState();
  const locationCoords = useSelector(state => state.location.location);

  const dispatch = useDispatch();

  const getAddress = async () => {
    try {
      const response = await Location.reverseGeocodeAsync({
        latitude: locationCoords.coords.latitude,
        longitude: locationCoords.coords.longitude,
      });

      let district = response[0].district ? `{response[0].district},` : '';

      let formatedAddress = `${response[0].name}, ${response[0].street}, ${district} ${response[0].postalCode} `;
      formatedAddress += `${response[0].city}, ${response[0].region}, ${response[0].country}`;

      setAddress(formatedAddress);
      dispatch(locationActions.setAddress(formatedAddress)); 
    } catch (err) {
      throw err;
    }
  }

  const CurrentAddress = () => {
    getAddress();

    return (
      <View style={styles.locationContainer}>
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
    paddingTop: 10
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
