import React, {useState, useEffect, useCallback} from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useDispatch, useSelector } from 'react-redux';

import ClockingButtons from '../components/UI/ClockingButtons';
import HeaderMenuButton from '../components/UI/HeaderMenuButton';
import HeaderLogoutButton from '../components/UI/HeaderLogoutButton';
import LoaderInline from '../components/UI/LoaderInline';
import Card from '../components/UI/Card';
import CurrentLocation from '../components/CurrentLocation';
import PrevClocking from '../components/PrevClocking';
import Greeting from '../components/Greeting';

// Import redux actions
import * as locationActions from '../store/actions/location';
import * as lastClockingActions from '../store/actions/lastclocking';

const ClockingScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLocation, setIsLocation] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  
  useFocusEffect(() => {
    console.log('ClockingScreen mounted');
    
    const unsubcribeLastClocking = getLastClockingHandler();
    const unsubscribeLocation = getLocationHandler();
      
    return () => {
      console.log('ClockingScreen umounted')
      unsubcribeLastClocking;
      unsubscribeLocation;
    }
  }, [props.navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'OK' }]);
    }
  }, [error]);

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
    setError(null);
    console.log('getLocationHandler');

    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({ timeout: 500 });

      dispatch(locationActions.setLocation(location));
      console.log('ran location')
      setIsLocation(true);

    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later',
        [{ text: 'OK' }]
      );
      setIsLocation(false);
    }
  }, [getLocationHandler, dispatch]); 

  const getLastClockingHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      dispatch(lastClockingActions.fetchLastClocking());
      console.log('ran last')
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  },[getLastClockingHandler, dispatch, isLoading]);

  return (
    <View style={styles.container}>
      <Greeting />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.cardContainer}>
          {
            isLocation ?
              <CurrentLocation style={styles.currentLocation} navigation={props.navigation} />
            : <LoaderInline loading={!isLocation} label='Location' />
          }
          {
            !isLoading ? <PrevClocking /> : <LoaderInline loading={isLoading} label='Previous clocking info' />
          }
        </Card>
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
  cardContainer: {
    width: '90%',
    maxHeight: 400,
    paddingVertical: 25,
    paddingHorizontal: 25
  },
});

export default ClockingScreen;
