import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

import HeaderMenuButton from '../components/UI/HeaderMenuButton';
import HeaderLogoutButton from '../components/UI/HeaderLogoutButton';
import Loader from '../components/UI/Loader';
import MapButton from '../components/UI/MapButton';
import MapPreview from '../components/MapPreview';

import Colors from '../constants/Colors';
import DisplayDate from '../constants/DisplayDateFormat';
import ENV from '../env';

const AttendanceScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [toggleMap, setToggleMap] = useState(false);
  const [dateSelected, setDateSelected] = useState();
  const [attendances, setAttendances] = useState([]);
  const [currentLimit, setCurentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('AttendanceScreen focused');

      setDateSelected(Date.now());
      setIsLoading(true);
      fetchAttendanceHandler(moment().format('YYYY-MM-DD'));
    });

    return unsubscribe;
  }, [props.navigation]);

  const fetchAttendanceHandler = useCallback(async (dtString) => {
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

      let fd = [];

      for (let i = 0; i < response.data.rec.length; i++) {
        let formatedDt;
        if (response.data.rec[i].cdatetime) {
          formatedDt = moment(response.data.rec[i].cdatetime).format(`${DisplayDate.default} hh:mm:ss a`);
        }

        let formatedType;
        if (response.data.rec[i].ctype === 1) {
          formatedType = 'IN';
        } else {
          formatedType = 'OUT';
        }

        fd.push(
          {
            dateTime: formatedDt,
            clockingType: formatedType,
            reason: response.data.rec[i].reasondesc,
            location: {
              address: response.data.rec[i].clocation,
              coords: {
                latitude: parseFloat(response.data.rec[i].lat),
                longitude: parseFloat(response.data.rec[i].lon)
              }
            }
          }
        )
      }

      setAttendances(attendances => attendances.concat(fd));
      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, [fetchAttendanceHandler, currentPage]);

  const fetchMore = async () => {
    console.log('fetchMore')
    setIsLoading(true);
    setCurrentPage(currentPage + 1);
    fetchAttendanceHandler();
  }

  const prevDateHandler = () => {
    let prevDate = moment(dateSelected).subtract(1, 'days');
    setDateSelected(prevDate);
    setAttendances([]);
    setIsLoading(true);
    fetchAttendanceHandler(moment(prevDate).format('YYYY-MM-DD'));
  }

  const nextDateHandler = () => {
    let nextDate = moment(dateSelected).add(1, 'days');
    setDateSelected(nextDate);
    setAttendances([]);
    setIsLoading(true);
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

  const LocationInfo = ({ location }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ paddingRight: 20 }}>
          <MapButton onMapIconClick={() => setToggleMap(v => !v)} />
          <MapPreview
            location={location}
            trueFalse={toggleMap}
            onToggleMap={() => setToggleMap(v => !v)}
          />
        </View>
        <View style={{ width: '90%' }}>
          <Text style={styles.text}>{location.address}</Text>
        </View>
      </View>
    );
}

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexGrow: 1 }}>
        <View style={styles.itemContainer}>
          <View style={styles.item}>
            <View style={{ paddingBottom: 10}}>
              <Text style={styles.label}>{item.dateTime}</Text>
              {
                item.reason ?
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>Reason: </Text>
                    <Text style={styles.text}>{ item.reason }</Text>
                  </View> : null
              }
            </View>
            {
              item.location.coords.latitude && item.location.coords.latitude ?
                <LocationInfo location={item.location} /> : null
            }
          </View>
          
          <View style={item.clockingType == 'IN' ? styles.inAvatar : styles.outAvatar}>
            <Text style={styles.label}>{item.clockingType}</Text>
          </View>
        </View>  
      </View>
    );
  } 

  const renderFooter = () => (
    isLoading ? <View style={{ paddingVertical: 20, }}>
      <Loader label='Loading...' size='large' loading={isLoading} />
    </View> : null
  );

  return (
    <View style={styles.container}>
      <DateSelector />
      <View style={{ width: '98%', height: '90%'}}>
        <FlatList
          data={attendances}
          keyExtractor={(item, index) => index.toString()}
            renderItem={attendances ? renderItem : (
                <View><Text>No data</Text></View>
            )}
          ListFooterComponent={renderFooter}
          onEndReached={fetchMore}
          onEndReachedThreshold={0}
          initialNumToRender={currentLimit}
        />
      </View>
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
    alignItems: 'center',
    backgroundColor: 'white'
  },
  dateAction: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 15
  },
  text: {
    fontFamily: 'open-sans'
  },
  label: {
    fontFamily: 'open-sans-bold'
  },
  buttonContainer: {
    paddingHorizontal: 50

  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    marginBottom: 5
  },
  item: {
    flexDirection: 'column',
    flex: 2,
    paddingRight: 50
  },  
  inAvatar: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 70/2,
    backgroundColor: '#00d800',
  },
  outAvatar: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 70/2,
    backgroundColor: '#ffe039'
  },
});

export default AttendanceScreen;
