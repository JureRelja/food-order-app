import React from "react";
import style from "./MealItemForm.module.css";
import InputField from "../UI/InputField";
import { useRef, useState } from "react";

function MealItemForm(props) {
  const amountInputRef = useRef();

  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  const input = {
    type: "number",
    min: "1",
    max: "5",
    defaultValue: "1",
    id: "amount_" + props.id,
    step: "1",
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      <InputField label="amount" input={input} ref={amountInputRef} />
      <button className={style.button}>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
}

export default MealItemForm;
