import React from "react";
import style from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../Store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "../Checkout/Checkout";
import axios from "axios";

function Cart(props) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(null);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const addItemToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      item={item}
      key={item.id}
      onAdd={addItemToCartHandler}
      onRemove={removeItemFromCartHandler}
    />
  ));

  const orderHandler = () => {
    if (!isCheckingOut && cartCtx.items.length > 0) {
      setIsCheckingOut(true);
      return;
    }
  };

  const cancelHandler = () => {
    setIsCheckingOut(false);
  };

  const onConfirmHandler = async (userData) => {
    setIsSubmitting(true);
    const order = {
      user: userData,
      orderedItems: cartCtx.items,
    };

    try {
      const request = await axios.post(
        "https://react-testing-e8f2f-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        order,
        { "Content-Type": "application/json" }
      );
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (error) {
      setDidSubmit(false);
    }
  };

  const cartModalContent = (
    <>
      <div className={style["cart-items"]}>{cartItems}</div>
      <div className={style.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onCancel={cancelHandler} onConfirm={onConfirmHandler} />
      )}
      {isSubmitting && !didSubmit && <p>Sending order data...</p>}
      {didSubmit && <p>Successfully sent the order!</p>}
      {!isCheckingOut && (
        <div className={style.actions}>
          <button
            className={style["button--alt"]}
            onClick={() => props.cartCloseHandler()}
          >
            Close
          </button>
          <button className={style.button} onClick={orderHandler}>
            Order
          </button>
        </div>
      )}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={style.actions}>
        <button
          className={style["button--alt"]}
          onClick={() => props.cartCloseHandler()}
        >
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal cartCloseHandler={props.cartCloseHandler}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
