import React from "react";

const ReportCodeField = (props) => {
  return (
    <React.Fragment>
      <label htmlFor="reportCode">
        Vul de meldcode voor het voertuig{" "}
        {props.license.value &&
          props.license.isValid &&
          " met kenteken " + props.license.value}{" "}
        in.
      </label>
      <input
        id="reportCode"
        type="number"
        min="1000"
        max="9999"
        placeholder="Bijvoorbeeld 1234"
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </React.Fragment>
  );
};

export default ReportCodeField;
