import { configureStore } from "@reduxjs/toolkit";
import rootReducers from './rootReducers';
const Store=configureStore({
    reducer:rootReducers
});
export default Store;

