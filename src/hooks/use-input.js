import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const valueResetHandler = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    valueIsValid,
    hasError,
    valueChangeHandler,
    valueResetHandler,
    inputBlurHandler,
  };
};

export default useInput;
