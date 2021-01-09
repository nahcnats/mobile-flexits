import React, {useState, useEffect, useCallback} from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useDispatch } from 'react-redux';

import ClockingButtons from '../components/UI/ClockingButtons';
import HeaderMenuButton from '../components/UI/HeaderMenuButton';
import HeaderLogoutButton from '../components/UI/HeaderLogoutButton';
import CurrentLocation from '../components/CurrentLocation';
import Greeting from '../components/Greeting';

// Import redux actions
import * as locationActions from '../store/actions/location';

const ClockingScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [locationCoords, setLocationCoords] = useState({});

  const dispatch = useDispatch();
  
  useFocusEffect(() => {
    console.log('ClockingScreen mounted');
    
    const unsubscribeLocation = getLocationHandler();
      
    return () => {
      console.log('ClockingScreen umounted')
      unsubscribeLocation;
    }
  }, [props.navigation]);

  const fetchUserLastClockingHandler = useCallback(async () => {
    if (!isLoading) {
      console.log('fetchUserLastClockingHandler');  
    }
    // console.log('fetchUserLastClockingHandler');
  }, [fetchUserLastClockingHandler]);

  // Fetch initially
  // useEffect(() => {
  //   setIsLoading(true);

  //   fetchUserLastClockingHandler().then(() => setIsLoading(false));
  // }, [fetchUserLastClockingHandler]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  }

  const getLocationHandler = useCallback(async () => {
    console.log('getLocationHandler')
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({ timeout: 500 });

      dispatch(locationActions.setLocation(location));

    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later',
        [{ text: 'OK' }]
      );
    }
    
  }, [getLocationHandler, dispatch]); 

  return (
    <View style={styles.container}>
      <Greeting />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CurrentLocation style={styles.currentLocation} navigation={props.navigation} />
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
