import React from "react";

const VehicleField = (props) => {
  return (
    <React.Fragment>
      <label htmlFor="vehicle">
        Van welk type voertuig wilt u voertuiginformatie opzoeken?
      </label>
      <select
        id="vehicle"
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
        <option value=""></option>
        {props.data.map((item, index) => (
          <option key={index} value={item.vehicle.type}>
            {item.vehicle.type}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

export default VehicleField;
