import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { LogBox } from 'react-native';

import ENV from '../../env';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;
LogBox.ignoreLogs([
  "Setting a timer for a long period of time",
  "Require cycles are allowed", 
  // name of the error/warning here, or a regex here
]);

export const authenticate = (userId, fullname, token, expiryTime) => {
  return dispatch => {
    try {
      dispatch(setLogoutTimer(expiryTime));
      dispatch({ type: AUTHENTICATE, userId: userId, fullname: fullname, token: token });  
    } catch (err) {
      console.log(err);
    }
    
  }
}

export const login = (userId, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${ENV.serverUrl}/login`, {
        username: userId,
        password: password
      });

      /* return 
        Object {
          "email": null,
          "exp": 1610372898,
          "fullname": "Stanley Chan",
          "iat": 1610286498,
          "role": "user",
          "username": "stanley",
        }
      */

      const decoded = jwt_decode(response.data.accessToken);

      const expirationDate = new Date(parseInt(decoded.exp) * 1000);

      dispatch(
        authenticate(
          decoded.username,
          decoded.fullname,
          response.data.accessToken,
          parseInt(decoded.exp * 1000)
        )
      );

      saveDataToStorage(response.data.accessToken, decoded.username, decoded.fullname, expirationDate);
    } catch (err) {
      throw new Error(err.response.data.errors);
    }
  }
}

export const logout = () => {
  clearLogoutTimer();  
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT }
}

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
}

const setLogoutTimer = (expirationTime) => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  }
}

const saveDataToStorage = (token, userId, fullname, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    fullname: fullname,
    expiryDate: expirationDate.toISOString()
  }));
}