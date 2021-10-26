import React from "react";
import "../../../static/Styling/medicineReminder.css";

const MedProps = (props) => (
  // console.log(props.medicine);
  <div>
    <h2>{props.medicine.medname}</h2>
    <p>{props.medicine.descriptionmed}</p>
    <p>Start Date : {props.medicine.startdate.substring(0, 10)}</p>
    <p>End Date : {props.medicine.enddate.substring(0, 10)}</p>
  </div>
);

export default MedProps;
