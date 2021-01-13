import axios from 'axios';

import ENV from '../../env';
import Clocking from '../../models/clocking';

export const SET_CLOCKING = 'SET_CLOCKING';
export const ADD_CLOCKING = 'ADD_CLOCKING';

export const setClocking = (selectedValue) => {
  return async dispatch => {
    try {
      // dispatch({ type: SET_CLOCKING_SELECT, clockingType: selectedValue });  
    } catch (err) {
      throw err;
    }
  }
}

export const addClocking = (clockingType, reasonId, lat, lng, address, token) => {
  return async dispatch => {
    try {
      const payload = {
        ctype: clockingType,
        reasonid: reasonId,
        lat: lat,
        lon: lng,
        clocation: address
      }

      await axios.post(`${ENV.serverUrl}/clocking`,
        payload,
        { headers: { "Authorization": `Bearer ${token}` } }
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}