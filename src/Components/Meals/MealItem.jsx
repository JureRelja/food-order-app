import React from "react";
import style from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import cartContext from "../Store/cart-context";
import { useContext } from "react";

function MealItem(props) {
  const price = `$${props.meal.price.toFixed(2)}`;

  const cartCtx = useContext(cartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount: amount,
      price: props.meal.price,
    });
  };

  return (
    <li className={style.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={style.description}>{props.meal.description}</div>
        <div className={style.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
