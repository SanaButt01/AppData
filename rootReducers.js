// rootReducer.js
import { combineReducers } from "redux";
import { reducer as cartReducer } from "./REDUCERS"; // Existing cart reducer
import { userReducer } from "./userReducer"; // Import the new user reducer

export default combineReducers({
  cart: cartReducer,
  user: userReducer, // Add user reducer to combined reducers
});
