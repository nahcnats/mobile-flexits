import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MapButton from '../components/UI/MapButton';
import MapPreview from '../components/MapPreview';

import ENV from '../env';

const CurrentLocation = props => {
  const [address, setAddress] = useState();
  const [toggleMap, setToggleMap] = useState(false);
  const locationCoords = useSelector(state => state.location.location);

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = useCallback(async () => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationCoords.coords.latitude},${locationCoords.coords.longitude}&key=${ENV.googleApiKey}`);
    const resData = await response.json();
    setAddress(resData.results[0].formatted_address);
  }, [getAddress]);

  const CurrentAddress = () => {
    return (
      <View style={styles.locationContainer}>
        <View>
          <Text style={styles.label}>Your current location address is: </Text>
        </View>
        {
          address ?
          <View style={styles.addressContainer}>
            <Text style={styles.text}>{address}</Text>
              <MapButton
                onMapIconClick={() => setToggleMap(v => !v)} />
              <MapPreview
                location={locationCoords}
                trueFalse={toggleMap}
                onToggleMap={() => setToggleMap(v => !v)}
              />
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
