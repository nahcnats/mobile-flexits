import { add } from "react-native-reanimated";

export const SET_LOCATION = 'SET_LOCATION';
export const SET_ADDRESS = 'SET_ADDRESS';

export const setLocation = (coords) => {
  return async dispatch => {
    try {
      dispatch({ type: SET_LOCATION, location: coords });
    } catch (err) {
      throw err;
    }
  }
}

export const setAddress = (address) => {
  return async dispatch => {
    try {
      dispatch({ type: SET_ADDRESS, address: address });
    } catch (err) {
      throw err;
    }
  }
}