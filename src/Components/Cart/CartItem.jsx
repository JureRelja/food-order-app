import React from "react";
import style from "./CartItem.module.css";

function CartItem(props) {
  const price = `$${props.item.price.toFixed(2)}`;

  return (
    <div className={style["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={style.summary}>
          <span className={style.price}>{price}</span>
          <span className={style.amount}>{props.item.amount}</span>
        </div>
      </div>
      <div className={style.actions}>
        <button onClick={() => props.onRemove(props.item.id)}>-</button>
        <button onClick={() => props.onAdd(props.item)}>+</button>
      </div>
    </div>
  );
}

export default CartItem;
