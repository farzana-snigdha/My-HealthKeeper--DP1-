import React from "react";
import "../../../static/Styling/medicineReminder.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, IconButton, Link } from "@material-ui/core";

const DailyDoses = (props) => {
    return (
        <div className="reminder_card">
          <h2>{props.doses.medname}</h2>
          <p>Time: {props.doses.medtime}</p>
          <p>Taken: {props.doses.isTaken}</p>
        </div>
    )
}

function MedDosesProps () {
    const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const [doseList, setDoseList] = useState([]);

  useEffect(async () => {
    await axios
      .get("http://localhost:5000/medDose", {
        headers: { Authorization: token },
      })
      .then((res) => setDoseList(res.data));
  }, []);

  const confirmReminder = async (id) => {
    await axios.post('http://localhost:5000/medDose/'+id,
    {
      headers: { Authorization: token, userId : user._id },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      const removedConfirmed = [...doseList].filter((el) => el._id !== id);
      setDoseList(removedConfirmed);
  };

  return (
    <div>
      {doseList.map((currentdose) => (
        <DailyDoses doses={currentdose} />
      ))}
    </div>
  );

}

export default MedDosesProps; 