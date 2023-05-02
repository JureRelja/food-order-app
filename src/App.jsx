import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./Components/Store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const cartCloseHandler = () => {
    setCartIsShown(false);
  };

  const cartOpenHandler = () => {
    setCartIsShown(true);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart cartCloseHandler={cartCloseHandler} />}
      <Header cartOpenHandler={cartOpenHandler} />
      <Meals />
    </CartProvider>
  );
}

export default App;
