import React from "react";

const SubtypeField = (props) => {
  return (
    <React.Fragment>
      <label htmlFor="subtype">
        Welk type {props.enteredVehicle.toLocaleLowerCase()} hebt u?
      </label>
      <select id="subtype" onChange={props.onChange} onBlur={props.onBlur}>
        <option value=""></option>
        {props.data
          .filter((item) => item.vehicle.type === props.enteredVehicle)
          .map((item) =>
            item.vehicle.subtypes.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))
          )}
      </select>
    </React.Fragment>
  );
};

export default SubtypeField;
