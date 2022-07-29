import React from "react";

const LicenseField = (props) => {
  return (
    <React.Fragment>
      <label htmlFor="license">
        Vul het kenteken van uw{" "}
        {props.enteredVehicle
          ? props.enteredVehicle.toLocaleLowerCase()
          : "voertuig"}{" "}
        in.
      </label>
      <input
        id="license"
        type="text"
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder="Bijvoorbeeld AA-BB-12"
        value={props.value}
        style={{background: "rgb(255, 165, 0, 0.75)", height: '30px', fontSize: '20px', fontWeight: '700', borderColor: 'orangered'}}
      />
    </React.Fragment>
  );
};

export default LicenseField;
