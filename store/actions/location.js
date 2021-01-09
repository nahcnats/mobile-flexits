export const SET_LOCATION = 'SET_LOCATION';

export const setLocation = (coords) => {
  return async dispatch => {
    try {
      dispatch({ type: SET_LOCATION, location: coords });
    } catch (err) {
      throw err;
    }
  }
}