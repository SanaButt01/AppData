// actions.js
import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from "./ACTIONTYPES";

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
      type: 'INCREASE_QUANTITY',
      id: itemId
    };
  }
  
  export function decreaseQuantity(itemId) {
    return {
      type: 'DECREASE_QUANTITY',
      id: itemId
    };
  }
  
