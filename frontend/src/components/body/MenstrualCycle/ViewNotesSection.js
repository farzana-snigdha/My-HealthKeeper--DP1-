import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, TextField } from "@material-ui/core";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core";

import "../../../static/Styling/mensDemo.css";

export default function ViewNotesSection () {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

 
  const useStyles = makeStyles((theme) => ({
    textfield_input: {
      width: "40%",
      marginLeft: "30%",
      marginTop:'5px',
      marginBottom: "2%",
    },
    notchedOutline: {
      borderWidth: "1px",
      borderColor:"#CA4D62 !important ",
    },
  }));
  const classes = useStyles();
  const [eventDate, setEvetDate] = useState('');
  const [isNotesAvailable, setisNotesAvailable] = useState(false);
  const [menstrualNotesData, setmenstrualNotesData] = useState([]);

  const viewNotes = async (e) => {
    const selectedEventdate=e.target.value
    setEvetDate(e.target.value)
    e.preventDefault();
    console.log("view notes ", selectedEventdate)
    await axios
      .get("http://localhost:5000/user/cycleTracker-display-notes", {
        headers: { Authorization: token, dates: selectedEventdate },
      })
      .then((response) => {
        console.log("n ", response.data.length);
        if (!response.data.length == 0) {
          setisNotesAvailable(true);
          setmenstrualNotesData(response.data);
        } else if(response.data.length == 0){
          setisNotesAvailable(false);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(demo);
    // handleClose();
    // if (isViewEnabled) {
    //   setisViewEnabled(false);
    // } else setisViewEnabled(true);
  };
console.log("ece " ,isNotesAvailable)
  return (
    <>
      <div>
        <h5 style={{color:'#CA4D62',fontSize:25, marginLeft: "30%", marginTop: "3%",marginBottom:'.5%' }}>
                {" "}
                Select a date to view your <i>THOUGHTS</i>{" "}
              </h5>
        <TextField
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline
          }
        }}
          className={classes.textfield_input}
          variant="outlined"
          required
          // fullWidth
          id="startdate"
          // label="Start Date"
          name="startdate"
          onChange={viewNotes}
          value={eventDate}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {
          <div className="notes_body">
           
            {isNotesAvailable ? (
              
              <div className="notes_data">
                {menstrualNotesData.map((note) => (
                  <div className="notes_card">
                    <p>Flow: {note.flow}</p>
                    <p>Mood: {note.mood}</p>
                    <p>Symptoms: {note.symptoms}</p>
                  </div>
                ))}
              </div>
            ) : (
              // 
              ''
            )}
          </div>
       }
      </div>
    </>
  );
};

