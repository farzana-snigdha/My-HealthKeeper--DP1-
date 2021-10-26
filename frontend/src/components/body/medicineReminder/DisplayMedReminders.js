import React from "react";
import "../../../static/Styling/medicineReminder.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, IconButton, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MedModal from "./MedModal";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Modal from "react-modal";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from '../../../static/Styling/featureButton.css'
import { COLORS } from "../../themeColors";
import MedDoses from "./MedDoses";
import InputMedReminder from "./InputMedReminder";

function DisplayMedReminders() {
  const token = useSelector((state) => state.token);
  const [ongoingMedReminderList, setOngoingMedReminderList] = useState([]);
  const [doneMedReminderList, setDoneMedReminderList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [missedList, setMissedList] = useState([]);
  const [targetVisible, setTargetVisible] = useState(false);
  const viewtargetInfo = () => {
    setTargetVisible((prev) => !prev);
  };

  const showOngoingMedicineList = async () => {
    await axios
      .get("http://localhost:5000/CurrentMedReminder", {
        headers: { Authorization: token },
      })
      .then((res) => setOngoingMedReminderList(res.data));
  };

  const showCompleteMedicineList = async () => {
    await axios
      .get("http://localhost:5000/CompleteMedReminder", {
        headers: { Authorization: token },
      })
      .then((res) => setDoneMedReminderList(res.data));
  };

  useEffect(async () => {
    showOngoingMedicineList();
  }, []);

  useEffect(async () => {
    showCompleteMedicineList();
  }, []);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const getmissedMed = async (id) => {
    await axios
      .get("http://localhost:5000/medDoseMissed/" + id, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setMissedList(res.data);
        console.log(id);
      });
  };

  const deleteReminder = async (id) => {
    await axios
      .delete("http://localhost:5000/medReminder/delete/" + id, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data);
      });

    const removedMed = [...ongoingMedReminderList].filter(
      (el) => el._id !== id
    );
    setOngoingMedReminderList(removedMed);
  };
  return (
    
    
    <div className="reminder"
    style={{
      backgroundImage: "url(/img/med5.jpg)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "50vh",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
  }}>
       <Container  style={{display: 'flex', flexDirection: 'column' ,margin:0,maxWidth:1900,padding:0,marginRight:0}} >
    <div style={{backgroundColor:'black', color:'black'}} >{ShowHeader('#ffffff')}</div>
    
    
    <pre></pre>
    <pre></pre> <pre></pre> <pre></pre> <pre></pre>
    <pre></pre>
    <Row className='body_feature_row' >
      
      <Col style={{display: 'flex', flexDirection: 'column'}}>
      {" "}
      &nbsp;
      <div className="med_header_content">
        {/* <p>All your medicine scheduled in one place!</p> */}
      </div>
      <MedDoses />


      <div className="ongoing_med_body">
        <div className="overlay_med"></div>
        <div className="med_ongoing_header">
          <h3>Ongoing Medicines</h3>
        </div>
        <div className="ongoing_med_box">
          {ongoingMedReminderList.map((medicines) => (
            <div variant="outlined" className="ongoing_med_card">
              <h2>{medicines.medname}</h2>
              <p>Description: {medicines.descriptionmed}</p>
              <p>Starting Date: {medicines.startdate.substring(0, 10)}</p>
              <p>Ending Date: {medicines.enddate.substring(0, 10)}</p>
              <IconButton
                className="btn"
                data-toggle="tooltip"
                title="View Your Missed Medicine"
                onClick={() => {
                  openModal();
                  getmissedMed(medicines._id);
                }}
              >
                <VisibilityIcon />
              </IconButton>
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              <IconButton
                className="btn"
                data-toggle="tooltip"
                title="Delete the Medicine"
                onClick={() => deleteReminder(medicines._id)}
              >
                <DeleteIcon />
              </IconButton>
              {console.log('missedList ',missedList)}
              <MedModal
                showModal={showModal}
                setShowModal={setShowModal}
                list={missedList}
              />
            </div>
          ))}
        </div>
        <div className="add_med">
        <div className="add_new_button" onClick={viewtargetInfo}>Add New Medicine</div>
          {targetVisible ? (<div> 
            <InputMedReminder isVisible={() => viewtargetInfo()} /></div>
          ) : ("")}
        </div>
      </div>

      <div className="done_med_body">
        <div className="med_done_header">
          <h3>Completed Medicines</h3>
        </div>
        <div className="done_med_box">
        {doneMedReminderList.map((medicines) => (
          <div className="done_med_card">
            <h2>{medicines.medname}</h2>
            <p>Description: {medicines.descriptionmed}</p>
            <p>Starting Date: {medicines.startdate.substring(0, 10)}</p>
            <p>Ending Date: {medicines.enddate.substring(0, 10)}</p>
            {/* <IconButton
                className="btn"
                data-toggle="tooltip"
                title="View Your Missed Medicine"
                onClick={() => {
                  openModal();
                  getmissedMed(medicines._id);
                }}
              >
                <VisibilityIcon />
              </IconButton> */}
          </div>
        ))}
        </div>
        
      </div>
      </Col>
      <Col className='body_feature_column' style={{ position:'fixed' }} sm={2}>
        
        {ShowFeatureButtons()}</Col>
    </Row>
  </Container>
    </div>
  );
}

export default DisplayMedReminders;