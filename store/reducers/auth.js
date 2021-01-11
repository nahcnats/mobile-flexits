import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  fullname: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        ...state,
        userId: action.userId,
        fullname: action.fullname,
        token: action.token
      }
    }
    case LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }    
  }
}

  export default authReducer;