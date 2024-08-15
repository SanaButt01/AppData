// userReducer.js
import { SET_USER_PROFILE } from './ACTIONTYPES';

const initialState = {
  profile: null, // Initial state with no user profile
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.payload, // Update the user profile
      };
    default:
      return state;
  }
};
