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

    let formatedAddress = `${response[0].name}, ${response[0].street}, ${response[0].district}, ${response[0].postalCode}, `;
    formatedAddress += `${response[0].city}, ${response[0].region}, ${response[0].country}`;

    setAddress(formatedAddress);
  }

  const CurrentCoords = () => {
    return (
      <View style={styles.coordsContainer}>
        <View style={styles.coords}>
          <Text style={styles.label}>Longitude</Text>
          <Text style={styles.text}>{locationCoords.coords.longitude}</Text>
        </View>
        <View style={styles.coords}>
          <Text style={styles.label}>Latitude</Text>
          <Text style={styles.text}>{locationCoords.coords.latitude}</Text>
        </View>
      </View>
    )
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

  const PrevClockingInfo = () => {
    return (
      <View style={styles.prevInfoContainer}>
        <Text style={styles.label}>Your previous clocking was: </Text>
        <View style={styles.prevInfo}>
          <Text style={styles.text}>Jan 7, 2021 10:00am</Text>
          <Text style={styles.label}>(IN)</Text>
        </View>
      </View>
    );
  }

  return (
    <Card style={styles.locationContainer}>
      <View>
        {locationCoords ? <CurrentCoords /> : null}
        <CurrentAddress />
      </View>
      <View>
        <PrevClockingInfo />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  locationContainer: {
    width: '90%',
    maxHeight: 400,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  prevInfoContainer: {
    marginTop: 10
  },
  prevInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
