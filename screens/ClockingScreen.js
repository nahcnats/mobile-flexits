import React from 'react';
import { Text, View, StyleSheet, Platform, Button, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ClockingButtons from '../components/UI/ClockingButtons';
import HeaderMenuButton from '../components/UI/HeaderMenuButton';
import HeaderLogoutButton from '../components/UI/HeaderLogoutButton';
import CurrentLocation from '../components/CurrentLocation';
import Greeting from '../components/Greeting';

const ClockingScreen = props => {
  useFocusEffect(() => {
    console.log('ClockingScreen focused');
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Greeting />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CurrentLocation style={styles.currentLocation} />
        {/* <Button title='Reason' onPress={ () => props.navigation.navigate('Reason') }/> */}
        <ClockingButtons prevIndicator={1} />
      </ScrollView>
    </View>
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
    backgroundColor: 'white'
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default ClockingScreen;
