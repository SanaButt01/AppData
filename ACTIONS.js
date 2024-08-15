// actions.js
import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, SET_USER_PROFILE } from "./ACTIONTYPES";

export function addtocart(item) {
    return {
        type: ADD_TO_CART,
        data: item
    };
}

export function removeFromCart(itemId) {
    return {
        type: REMOVE_FROM_CART,
        id: itemId
    };
}

export function increaseQuantity(itemId) {
    return {
        type: INCREASE_QUANTITY, // Use the constant for action type
        id: itemId
    };
}

export function decreaseQuantity(itemId) {
    return {
        type: DECREASE_QUANTITY, // Use the constant for action type
        id: itemId
    };
}

export function setUserProfile(profile) {
    return {
        type: SET_USER_PROFILE,
        payload: profile
    };
}
