import { SET_CLOCKING } from '../actions/clocking';

const intialState = {
  clockingData: [],
  isFinish: true
}

const clockingReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_CLOCKING: {
      return {
        ...state,
        clockingType: action.clockingType
      }
    }
    default: {
      return state;
    }
  }
} 

export default clockingReducer;