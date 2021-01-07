import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Card from '../components/UI/Card';
import MapButton from '../components/UI/MapButton';

const CurrentAddress = () => {
  return (
    <View style={styles.addressContainer}>
      <Text style={styles.text}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe minus commodi veniam at, in sint rem enim labore est nobis!</Text>
      <MapButton />
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

const CurrentLocation = props => {
  return (
    <Card style={styles.locationContainer}>
      <View>
        <Text style={styles.label}>Your current location is: </Text>
      </View>
      <View>
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
  addressContainer: {
    maxWidth: '90%',
    flexDirection: 'row'
  }
});

export default CurrentLocation;
