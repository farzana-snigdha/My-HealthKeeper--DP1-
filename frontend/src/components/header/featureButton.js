import React, { useState } from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import HealingIcon from "@material-ui/icons/Healing";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import { Button, Link, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import featureButton from "../../static/Styling/featureButton.css";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

export const ShowFeatureButtons = () => {
  const auth = useSelector((state) => state.auth);
  // const classes = useStyles();
  const { user, isLogged } = auth;
  const [isGenShown, setIsGenShown] = useState(false);
  const [isSPShown, setIsSPShown] = useState(false);
  const [isDietShown, setIsDietShown] = useState(false);
  const [isDPShown, setIsDPShown] = useState(false);
  const [isRepShown, setIsRepShown] = useState(false);
  const [isMedShown, setIsMedShown] = useState(false);
  const [isMensShown, setIsMensShown] = useState(false);

  const genderOfTheUser = () => {
    if (user.gender == "Female") {
      return (
        <Grid item className="item">
          <Link
            style={{ textDecoration: "none" }}
            className="sidebar-icon-link"
            to="/menstrual-cycle_demo"
            component={NavLink}
          >
            {" "}
            <Button
              className="menstrualButton"
              // data-toggle="tooltip"
              // title="Menstrual Cycle"
              onMouseEnter={() => setIsMensShown(true)}
              onMouseLeave={() => setIsMensShown(false)}
            >
              {isMensShown ? (
                <h7 className="featureText_design">Menstruation Tracker</h7>
              ) : (
                <BubbleChartIcon />
              )}
            </Button>
          </Link>
        </Grid>
      );
    }
  };

  return (
    <div className="div">
      <Grid item className="item">
        <Link
          style={{ textDecoration: "none" }}
          className="sidebar-icon-link"
          to="/general-health-dashboard"
          component={NavLink}
        >
          {" "}
          <Button
            className="genHealthButton"
            // data-toggle="tooltip"
            // title="General Health Information"
            onMouseEnter={() => setIsGenShown(true)}
            onMouseLeave={() => setIsGenShown(false)}
          >
            {isGenShown ? (
              <h7 className="featureText_design">Basic Health Tracker</h7>
            ) : (
              <FitnessCenterIcon />
            )}
          </Button>
        </Link>
      </Grid>
      <Grid item className="item">
        <Link
          style={{ textDecoration: "none" }}
          className="sidebar-icon-link"
          to="/specialized-health-information"
          component={NavLink}
        >
          {" "}
          <Button
            className="spHealthButton"
            // data-toggle="tooltip"
            // title="Specialized Health Information"
            onMouseEnter={() => setIsSPShown(true)}
            onMouseLeave={() => setIsSPShown(false)}
          >
            {isSPShown ? (
              <h7 className="featureText_design">Health Journal</h7>
            ) : (
              <i style={{fontSize:20}}class="fas fa-book-medical"></i>
            )}
          </Button>
        </Link>
      </Grid>
      <Grid item className="item">
        <Link
          style={{ textDecoration: "none" }}
          className="sidebar-icon-link"
          to="/display-medicine-reminderList"
          component={NavLink}
        >
          <Button
            className="medicineReminderButton"
            // data-toggle="tooltip"
            // title="Medicine Reminder"
            onMouseEnter={() => setIsMedShown(true)}
            onMouseLeave={() => setIsMedShown(false)}
          >
            {isMedShown ? (
              <h7 className="featureText_design">Medicine Reminder</h7>
            ) : (
              <AddAlertIcon />
            )}
          </Button>
        </Link>
      </Grid>
      
      <Grid item className="item">
        <Link
          style={{ textDecoration: "none" }}
          className="sidebar-icon-link"
          to="/diet-plans"
          component={NavLink}
        >
          {" "}
          <Button
            className="dietButton"
            // data-toggle="tooltip"
            // title="Diet Plan"
            onMouseEnter={() => setIsDietShown(true)}
            onMouseLeave={() => setIsDietShown(false)}
          >
            {isDietShown ? (
              <h7 className="featureText_design">Diet Plan</h7>
            ) : (
              <FastfoodIcon />
            )}
          </Button>
        </Link>
      </Grid>

      

      <Grid item className="item">
        <Link
          style={{ textDecoration: "none" }}
          className="sidebar-icon-link"
          to="/report-analysis"
          component={NavLink}
        >
          <Button
            className="reportButton"
            // data-toggle="tooltip"
            // title="Reports"
            onMouseEnter={() => setIsRepShown(true)}
            onMouseLeave={() => setIsRepShown(false)}
          >
            {isRepShown ? (
              <h7 className="featureText_design">Analyze Report</h7>
            ) : (
              <AssessmentIcon />
            )}
          </Button>{" "}
        </Link>
      </Grid>

      <Grid item className="item">
        <Link
          style={{ textDecoration: "none" }}
          className="sidebar-icon-link"
          to="/disease-prediction"
          component={NavLink}
        >
          {" "}
          <Button
            className="diseasePredictButton"
            // data-toggle="tooltip"
            // title="Disease Prediction"
            onMouseEnter={() => setIsDPShown(true)}
            onMouseLeave={() => setIsDPShown(false)}
          >
            {isDPShown ? (
              <h7 className="featureText_design">Disease Prediction</h7>
            ) : (
              <HealingIcon />
            )}
          </Button>
        </Link>
      </Grid>

     
      {genderOfTheUser()}
    </div>
  );
};
