import React from "react";
import style from "./InputField.module.css";

const InputField = React.forwardRef((props, ref) => {
  return (
    <div className={style.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props.input} ref={ref} />
    </div>
  );
});

export default InputField;
