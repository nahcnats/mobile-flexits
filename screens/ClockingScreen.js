import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import ClockingButtons from '../components/UI/ClockingButtons';
import HeaderMenuButton from '../components/UI/HeaderMenuButton';
import HeaderLogoutButton from '../components/UI/HeaderLogoutButton';
import LoaderModal from '../components/UI/LoaderModal';
import Loader from '../components/UI/Loader';
import Card from '../components/UI/Card';
import CurrentLocation from '../components/CurrentLocation';
import Greeting from '../components/Greeting';

// Import redux actions
import * as locationActions from '../store/actions/location';

import ENV from '../env';

const ClockingScreen = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLocation, setIsLocation] = useState(false);
  const [lastClockingData, setLastClockingData] = useState();
  const token = useSelector(state => state.auth.token);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = props.navigation.addListener('focus', () => {
      console.log('ClockingScreen focused')
      getLastClockingHandler();
      getLocationHandler();
    });

    return unsubcribe;
    
  }, [props.navigation]);

  const getLastClockingHandler = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios(`${ENV.serverUrl}/lastclocking`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.status == 200) {
        setLastClockingData({ cType: response.data.rec[0].ctype, cDatetime: response.data.rec[0].cdatetime })
      }
      
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    
  }, [getLastClockingHandler, lastClockingData]);
  
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
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    setIsLocation(false);

    try {
      const location = await Location.getCurrentPositionAsync({ timeout: 500 });

      dispatch(locationActions.setLocation(location));
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
  
  const LastClockingInfo = () => {
    return (
      <View>
        <View>
          <Text style={styles.label}>Your previous clocking was: </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text>{moment(lastClockingData.cDatetime).format('MMM D, YYYY h:mm a')}</Text>
          <Text style={styles.label}>{ lastClockingData.cType === 1 ? '(IN)' : '(OUT)' }</Text>
        </View>
      </View>
    );
  }

  const clockingButtonHandler = (clockingTypeValue) => {
    props.navigation.navigate('ReasonStack', {
      screen: 'Reason',
      params: {clockingType: clockingTypeValue}
    });
  }

  return (
    <View style={styles.container}>
      <LoaderModal loading={isLoading} label='Fetching data...' />
      <Greeting />
      {
        !isLoading ?
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Card style={styles.cardContainer}>
              <LastClockingInfo />
              {
                isLocation ?
                  <CurrentLocation style={styles.currentLocation} navigation={props.navigation} />
                : <Loader loading={true} size='small' label='Fetching Location...' />
              }
            </Card>
            <ClockingButtons indicator={lastClockingData.cType === 1 ? 2 : 1} onSelected={clockingButtonHandler.bind(this)} />
          </ScrollView>: null
      }
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'open-sans'
  },
  label: {
    fontFamily: 'open-sans-bold'
  },
  cardContainer: {
    width: '90%',
    maxHeight: 400,
    paddingVertical: 25,
    paddingHorizontal: 25
  },
});

export default ClockingScreen;
