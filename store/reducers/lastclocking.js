import { SET_LAST_CLOCKING } from '../actions/lastclocking';

const initialState = {
  lastClockingData: {},
};

const lastClockingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAST_CLOCKING: {
      return {
        ...state,
        lastClockingData: action.response
      }
    }
    default:
      return state;
  }
}

export default lastClockingReducer;