import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

import HeaderMenuButton from '../components/UI/HeaderMenuButton';
import HeaderLogoutButton from '../components/UI/HeaderLogoutButton';

import Colors from '../constants/Colors';
import DisplayDate from '../constants/DisplayDateFormat';
import ENV from '../env';

const AttendanceScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [dateSelected, setDateSelected] = useState();
  const [currentLimit, setCurentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('AttendanceScreen focused');

      setDateSelected(Date.now());
      fetchAttendanceHandler(moment().format('YYYY-MM-DD'));
    });

    return unsubscribe;
  }, [props.navigation]);

  const fetchAttendanceHandler = useCallback(async (dtString) => {
    console.log('fetchAttendanceHandler');
    // setIsLoading(true);

    try {
      const payload = {
        limit: currentLimit,
        page: currentPage,
        dt: dtString,
      }

      const response = await axios.post(`${ENV.serverUrl}/userclocking`,
        payload,
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );

      if (!response.data.rec.length) {
        setIsLoading(false);
        return;
      }

      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, [fetchAttendanceHandler])

  const prevDateHandler = () => {
    let prevDate = moment(dateSelected).subtract(1, 'days');
    setDateSelected(prevDate);
    fetchAttendanceHandler(moment(prevDate).format('YYYY-MM-DD'));
  }

  const nextDateHandler = () => {
    let nextDate = moment(dateSelected).add(1, 'days');
    setDateSelected(nextDate);
    fetchAttendanceHandler(moment(nextDate).format('YYYY-MM-DD'));
  }

  const DateSelector = () => {
    return (
      <View style={styles.dateAction}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={prevDateHandler}>
            <Entypo
              name='chevron-left'
              size={24} color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
        <Text>{moment(dateSelected).format(DisplayDate.default)}</Text>
        <View style={styles.buttonContainer}>
        {
          moment(dateSelected).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? null :
            <TouchableOpacity onPress={nextDateHandler}>
              <Entypo
                name='chevron-right'
                size={24} color={Colors.primary}
              />
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>AttendanceScreen</Text>
      <DateSelector />
    </View>
  );
}

// TODO: Add reload / refresh function

export const attendanceScreenOptions = navData => {
  return {
    headerTitle: 'Your Attandance',
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateAction: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    width: 20
  }
});

export default AttendanceScreen;
