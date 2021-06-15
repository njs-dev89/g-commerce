import React, { createContext, useReducer } from "react";

const cartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      return [action.payload, ...state];
    }
    case "REMOVE_FROM_CART": {
      return state.filter((item) => item.id !== action.payload);
    }
    case "INCREMENT_ITEM": {
      return state.map((item) => {
        if (item.id === action.payload) {
          item.quantity = item.quantity === 6 ? 6 : item.quantity + 1;
          item.totalPrice = item.quantity * item.unitPrice;
        }
        return item;
      });
    }
    case "DECREMENT_ITEM": {
      return state.map((item) => {
        if (item.id === action.payload) {
          item.quantity = item.quantity === 1 ? 1 : item.quantity - 1;
          item.totalPrice = item.quantity * item.unitPrice;
        }
        return item;
      });
    }
    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <cartContext.Provider value={[cart, dispatch]}>
      {children}
    </cartContext.Provider>
  );
};

export default cartContext;
