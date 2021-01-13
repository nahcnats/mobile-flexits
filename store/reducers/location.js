import { SET_LOCATION, SET_ADDRESS } from '../actions/location';

const initialState = {
  location: {},
  address: null
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION: {
      return {
        ...state,
        location: action.location
      }
    }
    case SET_ADDRESS: {
      return {
        ...state,
        address: action.address
      }
    }
    default:
      return state;
  }
}

export default locationReducer;