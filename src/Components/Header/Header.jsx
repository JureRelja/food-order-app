import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import style from "./Header.module.css";

import mealsImage from "../../assets/meals.jpg";

function Header(props) {
  return (
    <>
      <div className={style.header}>
        <h1>Food order app</h1>
        <HeaderCartButton cartOpenHandler={props.cartOpenHandler} />
      </div>
      <div className={style["main-image"]}>
        <img src={mealsImage} alt="food" />
      </div>
    </>
  );
}

export default Header;
