import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/menstrualCycle.css";
import "../../../static/Styling/mensDemo.css";
import { useSelector } from "react-redux";
import axios from "axios";
import DatePicker from "react-datepicker";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddNotesModal from "./AddNotesModal";
import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";
import ShowBasicMensData from "./BasicMensDataDemo";
import UserMenstrualCircleInfo from "./UserMenstrualCircleInfo";
import ViewNotesSection from "./ViewNotesSection";

export default function MenstrualDemo() {
  const auth = useSelector((state) => state.auth);
  
  const [isViewEnabled, setisViewEnabled] = useState(false);

  useEffect(() => {
    // getInitialData();
  }, []);

  const [demo, setDemo] = useState("");
  const [showNotesModal, setShowNotesModal] = useState(false);

  const Demo = (ar) => {
    setDemo(ar);
  };

  const handleDateClick = (arg) => {
    setShowNotesModal(true);
    Demo(arg.dateStr);
    setisViewEnabled(true);
  };

  return (
    <div>
      <div
        className="reminder"
        style={{
          backgroundImage: "url(/img/mens1.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "60vh",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            maxWidth: 1900,
            padding: 0,
            marginRight: 0,
          }}
        >
          <div style={{ backgroundColor: "black", color: "black" }}>
            {ShowHeader(COLORS.menstrualBackground)}
          </div>

          <Row className="body_feature_row">
            <Col style={{ display: "flex", flexDirection: "column" }}>
              {" "}
              &nbsp;
              <div className="mens_header_content">
                <pre></pre>
                {/* <span style={{color:'white',fontSize:43,fontWeight:550}}><i>TRACK YOUR PERIODS LIKE A PRO</i></span> */}
              </div>
              <div className="mens_info">
                {UserMenstrualCircleInfo()}
              </div>
              <div className="mens_calendar_body">
                <div className="mens_overlay"></div>
                <div className="mens">
                  <div className="mens_body">
                  {ShowBasicMensData()}
                    <div className="mens_cal">
                      <div className="cal_body">
                        <FullCalendar
                          plugins={[dayGridPlugin, interactionPlugin]}
                          initialView="dayGridMonth"
                          editable={false}
                          dateClick={handleDateClick}
                          contentHeight="auto"
                          events={[
                            {
                              date: "2021-09-01",
                              backgroundColor: "red",
                              display: "background",
                            },
                            {
                              date: "2021-09-02",
                              backgroundColor: "red",
                              display: "background",
                            },
                            {
                              date: "2021-09-03",
                              backgroundColor: "red",
                              display: "background",
                            },
                            {
                              date: "2021-09-04",
                              backgroundColor: "red",
                              display: "background",
                            },
                            {
                              date: "2021-09-05",
                              backgroundColor: "red",
                              display: "background",
                            },
                            {
                              date: "2021-10-04",
                              backgroundColor: "red",
                              display: "background",
                            },
                            {
                              date: "2021-10-05",
                              backgroundColor: "red",
                              display: "background",
                            },
                            {
                              date: "2021-10-06",
                              backgroundColor: "red",
                              display: "background",
                            },
                            {
                              date: "2021-10-07",
                              backgroundColor: "red",
                              display: "background",
                            },
                            {
                              date: "2021-10-08",
                              backgroundColor: "red",
                              display: "background",
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mens_journal_body">
                {/* <div className="mens_overlay"></div> */}
                <div className="med_ongoing_header">
                  <h2 style={{ color: "#CA4D62" }}>Your Journal at a Glance</h2>
                </div>
                <div className="mens_journal_body">
                  {ViewNotesSection()}
              </div>
              </div>
              
            </Col>
            <Col
              className="body_feature_column"
              style={{ position: "fixed", marginTop: 100 }}
              sm={2}
            >
              {ShowFeatureButtons()}
            </Col>
          </Row>

          <AddNotesModal
            demo={demo}
            showNotesModal={showNotesModal}
            setShowNotesModal={setShowNotesModal}
            setisViewEnabled={setisViewEnabled}
            isViewEnabled={isViewEnabled}
          />
          
        </Container>
      </div>
    </div>
  );
}