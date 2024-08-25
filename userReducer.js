import { SET_USER_PROFILE, LOGOUT_USER } from './ACTIONTYPES';

const initialState = {
  userId: null,
  profile: null, // You can keep profile if you need it
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        userId: action.payload.userId, // Extract userId from profile
        profile: action.payload, // Keep profile if needed
      };
    case LOGOUT_USER:
      return {
        ...state,
        userId: null,
        profile: null, // Clear profile data
      };
    default:
      return state;
  }
};
