import React from 'react';
import { View, Modal, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const MapPreview = props => {
  const toggleMap = () => {
    props.onToggleMap();
  }

  const mapRegion = {
    latitude: props.location.coords.latitude,
    longitude: props.location.coords.longitude,
    latitudeDelta: 0.001922,
    longitudeDelta: 0.001421,
  }

  return (
    <Modal
      animationType={'fade'}
      visible={props.trueFalse}
      onRequestClose={() => { return null; }}
    >
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={mapRegion}
          style={styles.map}
        >
          <Marker coordinate={mapRegion} />
        </MapView>
        <View style={styles.buttonContainer}>
          <Button title='Close' color={Colors.primary} onPress={toggleMap} />
        </View>
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    paddingBottom: 60
  }
});

export default MapPreview;
