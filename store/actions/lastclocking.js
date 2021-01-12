import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import ENV from '../../env';

export const SET_LAST_CLOCKING = 'SET_LAST_CLOCKING';

const setLastClocking = (ctype, cdatetime) => {
  return dispatch => {
    try {
      dispatch(
        {
          type: SET_LAST_CLOCKING, lastClockingData: {
            cType: ctype,
            cDatetime: cdatetime
          }
        })
    } catch (err) {
      throw err;
    }
  }
}

export const fetchLastClocking = () => {
  console.log('fetchLastClocking')
  return async dispatch => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token } = transformedData;

      const response = await axios.get(`${ENV.serverUrl}/lastclocking`,
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );

      dispatch(
        setLastClocking(
          response.data.rec[0].ctype,
          response.data.rec[0].cdatetime
        )
      );
    } catch (err) {
      throw err;
    }
  }
}