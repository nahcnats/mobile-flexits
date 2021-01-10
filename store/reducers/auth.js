import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  fullname: null
}

const authReducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    case AUTHENTICATE: {
      console.log('this..')
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
      console.log("action.type", action.type, 'default')
      return state;
    }    
  }
}

  export default authReducer;