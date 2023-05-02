import React from "react";
import style from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className={style.backdrop}
      onClick={() => props.cartCloseHandler()}
    ></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={style.modal}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
};

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop cartCloseHandler={props.cartCloseHandler} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("backdrop")
      )}
    </>
  );
}

export default Modal;
