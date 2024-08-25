import { ADD_TO_CART, REMOVE_FROM_CART,CLEAR_CART } from "./ACTIONTYPES";


const initialState = [];

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.find(item => item.title === action.data.title);
      if (existingItem) {
        // If item exists, increase the quantity
        return state.map(item =>
          item.title === action.data.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity starting at 1
        return [...state, { ...action.data, quantity: 1 }];
      }
    case REMOVE_FROM_CART:
      return state.filter(item => item.title !== action.id);
    case 'INCREASE_QUANTITY':
      return state.map(item => {
        if (item.title === action.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    case 'DECREASE_QUANTITY':
      return state.flatMap(item => {
        if (item.title === action.id) {
          // If quantity is 1, remove the item instead of decreasing the quantity
          if (item.quantity === 1) {
            return [];
          } else {
            // Decrease quantity if more than 1
            return [{ ...item, quantity: item.quantity - 1 }];
          }
        } else {
          // Return all other items as is
          return [item];
        }
      });
      
      case CLEAR_CART:
        return [];

    default:
      return state;
  }
};
