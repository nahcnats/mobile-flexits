import { SET_LOCATION } from '../actions/location';

const initialState = {
  location: {},
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.location
      };
    default:
      return state;
  }
}

export default locationReducer;