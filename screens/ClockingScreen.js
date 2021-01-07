import React from 'react';
import { Text, View, StyleSheet, Platform, Button, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ClockingButtons from '../components/UI/ClockingButtons';
import HeaderMenuButton from '../components/UI/HeaderMenuButton';
import HeaderLogoutButton from '../components/UI/HeaderLogoutButton';
import CurrentLocation from '../components/CurrentLocation';

const ClockingScreen = props => {
  useFocusEffect(() => {
    console.log('ClockingScreen focused');
  }, [props.navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CurrentLocation style={styles.currentLocation} />
      {/* <Button title='Reason' onPress={ () => props.navigation.navigate('Reason') }/> */}
      <ClockingButtons prevIndicator={1} />
    </ScrollView>
  );
}

// TODO: Add reload / refresh function

export const clockingScreenOptions = navData => {
  return {
    headerTitle: 'Clocking',
    headerLeft: () => (
      <HeaderMenuButton onToggleMenu={() => { navData.navigation.toggleDrawer() }} />
    ),
    headerRight: () => (
      <HeaderLogoutButton />
    ),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white'
  },
});

export default ClockingScreen;
