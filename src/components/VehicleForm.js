import { useState } from "react";
import useInput from "../hooks/use-input";
import { KentekenCheck } from "rdw-kenteken-check/src/kenteken-check-nl-class";

// I prefer to keep components as lean as possible,
// so I have created multiple 'field components' in ./form-fields folder.
// These are all imported in this component.
// This way, form fields could also easily be added or removed to the general form.
import VehicleField from "./form-fields/VehicleField";
import SubtypeField from "./form-fields/SubtypeField";
import LicenseField from "./form-fields/LicenseField";
import ReportCodeField from "./form-fields/ReportCodeField";

import defaultImage from "../assets/centraalbeheer.png";
import carImage from "../assets/auto.jpg";
import motorImage from "../assets/motor.jpg";
import scooterImage from "../assets/scooter.jpg";

import classes from "./VehicleForm.module.css";

const VehicleForm = (props) => {
  // State that triggers when user submits the form.
  // If the form does not pass validation, submission will not continue
  // submitWarning will be set to true, this will render an 
  // error message below the button
  const [submitWarning, setSubmitWarning] = useState(false);

  // Using custom useInput hook I have created in an earlier project for storing the value,
  // directly passing function in useInput(() => {}) for data validation, and
  // the hook also handles with value and blur changes (valueChangeHandler & inputBlurHandler).
  // This way valueChangeHandlers + blurHandler do not have to be written (and are re-usable).
  const {
    value: enteredVehicle,
    valueChangeHandler: vehicleChangeHandler,
    inputBlurHandler: vehicleBlurHandler,
    valueIsValid: vehicleIsValid,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredSubtype,
    valueChangeHandler: subtypeChangeHandler,
    inputBlurHandler: subtypeBlurHandler,
    valueIsValid: subtypeIsValid,
  } = useInput((value) => {
    if (enteredVehicle !== "Scooter") {
      return value.trim() !== "";
    } else {
      return true;
    }
  });
  const {
    value: enteredReportCode,
    valueChangeHandler: reportCodeChangeHandler,
    inputBlurHandler: reportCodeBlurHandler,
    valueIsValid: reportCodeIsValid,
    hasError: reportCodeHasError,
  } = useInput((value) => value >= 1000 && value <= 9999);

  // For license check a third party package was added, so I did not use the (above) custom hook.
  // instead I used the regular react useState hook.
  // On every keystroke, the licenseChangeHandler function changes the value in useState hook (license.state)
  // When user leaves license field, licenseBlurHandler function checks if the entered license value is correct
  // if yes: license is set to correct format (incl. dashes on correct place), state change license.isValid = true
  // if no: license.isValid is set to false, this will then render an 'error message' on the screen below the input field.
  const [license, setLicense] = useState({ value: "", isValid: true });

  const licenseChangeHandler = (e) => {
    setLicense({ value: e.target.value, isValid: true });
  };

  const licenseBlurHandler = (e) => {
    const formattedLicense = new KentekenCheck(e.target.value).formatLicense();
    formattedLicense === "XX-XX-XX"
      ? setLicense({ value: e.target.value, isValid: false })
      : setLicense({ value: formattedLicense, isValid: true });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    
    const formIsValid =
      vehicleIsValid && subtypeIsValid && license.isValid && reportCodeIsValid;

    if (formIsValid) {
      setSubmitWarning(false);
      console.log(enteredVehicle);
      console.log(enteredSubtype);
      console.log(license.value);
      console.log(enteredReportCode);
    } else {
      setSubmitWarning(true);
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <h2>Voertuiginformatie opzoeken</h2>
        <div className={classes.control}>
          <VehicleField
            onChange={vehicleChangeHandler}
            onBlur={vehicleBlurHandler}
            data={props.data}
          />
        </div>
        {enteredVehicle === "Auto" || enteredVehicle === "Motor" ? (
          <div className={classes.control}>
            <SubtypeField
              enteredVehicle={enteredVehicle}
              data={props.data}
              onChange={subtypeChangeHandler}
              onBlur={subtypeBlurHandler}
            />
          </div>
        ) : null}
        <div className={classes.control}>
          <LicenseField
            enteredVehicle={enteredVehicle}
            onChange={licenseChangeHandler}
            onBlur={licenseBlurHandler}
            value={license.value}
          />
          {!license.isValid && (
            <p className={classes.error}>
              <b>Oeps, het ingevoerde kenteken is niet geldig</b> <br />
              Gebruik het volgende formaat: AA-12-BB.
            </p>
          )}
        </div>
        <div className={classes.control}>
          <ReportCodeField
            license={license}
            onChange={reportCodeChangeHandler}
            onBlur={reportCodeBlurHandler}
          />
          {reportCodeHasError && (
            <p className={classes.error}>
              <b>Oeps, de ingevoerde meldcode is niet geldig</b> <br />
              Gebruik het volgende formaat: 1234.
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button className="button" type="submit">
            Verzenden
          </button>
          {submitWarning && <p className={classes.warning}>Vul alle waardes correct in.</p>}
        </div>
      </form>
      <div className={classes.image}>
        {!enteredVehicle && <img src={defaultImage} />}
        {enteredVehicle === "Auto" && <img src={carImage} />}
        {enteredVehicle === "Motor" && <img src={motorImage} />}
        {enteredVehicle === "Scooter" && <img src={scooterImage} />}
      </div>
    </div>
  );
};

export default VehicleForm;
