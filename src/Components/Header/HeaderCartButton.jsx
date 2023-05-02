import React from "react";
import style from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../Store/cart-context";

function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const { items, totalAmount } = cartCtx;

  const [btnBump, setBtnBump] = useState(false);

  //Count noumber of items in the cart
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  let btnClasses = `${style.button} ${btnBump ? style.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnBump(true);
    const timer = setTimeout(() => {
      setBtnBump(false);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [totalAmount]);

  return (
    <>
      <button className={btnClasses} onClick={() => props.cartOpenHandler()}>
        <span className={style.icon}>
          <CartIcon />
        </span>
        <span>Cart</span>
        <span className={style.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
}

export default HeaderCartButton;
