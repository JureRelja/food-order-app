import React from "react";
import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const itemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (itemIndex >= 0) {
      const updatedItems = [...state.items];
      const updatedItem = {
        ...updatedItems[itemIndex],
        amount: updatedItems[itemIndex].amount + action.item.amount,
      };
      updatedItems[itemIndex] = updatedItem;
      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    } else {
      return {
        items: state.items.concat(action.item),
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    }
  } else if (action.type === "REMOVE") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    let updatedItems = [...state.items];

    if (state.items[itemIndex].amount > 1) {
      const updatedItem = {
        ...updatedItems[itemIndex],
        amount: updatedItems[itemIndex].amount - 1,
      };
      updatedItems[itemIndex] = updatedItem;
    } else {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }
    return {
      items: updatedItems,
      totalAmount: state.totalAmount - state.items[itemIndex].price,
    };
  } else if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
    console.log(cartState);
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
