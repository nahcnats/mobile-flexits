import React from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MapButton = props => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.onMapIconClick}
    >
      <Ionicons
        name={Platform.OS === 'android' ? 'md-location-sharp' : 'ios-location-sharp'}
        size={36} color='red'
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 5
  }
});

export default MapButton;
