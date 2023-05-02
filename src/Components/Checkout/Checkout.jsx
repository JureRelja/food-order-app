import classes from "./Checkout.module.css";
import useInput from "../../Hooks/use-input";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
    inputClasses: nameInputClasses,
  } = useInput(
    (value) => value.trim() !== "",
    classes.control,
    classes.invalid
  );

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
    inputClasses: streetInputClasses,
  } = useInput(
    (value) => value.trim() !== "",
    classes.control,
    classes.invalid
  );

  const {
    value: enteredPostalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput,
    inputClasses: postalCodeInputClasses,
  } = useInput(
    (value) => value.trim() !== "",
    classes.control,
    classes.invalid
  );

  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
    inputClasses: cityInputClasses,
  } = useInput(
    (value) => value.trim() !== "",
    classes.control,
    classes.invalid
  );

  const formIsValid =
    nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && <p className={classes.error}>Name is required</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetInputHasError && (
          <p className={classes.error}>Street is required</p>
        )}
      </div>
      <div className={postalCodeInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeInputHasError && (
          <p className={classes.error}>Postal Code is required</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityInputHasError && <p className={classes.error}>City is required</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
