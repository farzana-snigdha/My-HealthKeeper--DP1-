import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import { Link } from "@material-ui/core";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import HealingIcon from "@material-ui/icons/Healing";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
      <font  className="sidebar-options-color" >
          <FitnessCenterIcon />
        </font>
      </ListItemIcon>
      <Link to="/general-health-dashboard" component={NavLink}>
      <font  className="sidebar-options-color" >
          <ListItemText primary="General Health Information" />
        </font>
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <font  className="sidebar-options-color" >
          <FastfoodIcon />
        </font>
      </ListItemIcon>
      <Link to="/diet-plans" component={NavLink}>
      <font  className="sidebar-options-color" >
          <ListItemText primary="Diet Plan" />
        </font>
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <font  className="sidebar-options-color" >
          <LocalHospitalIcon />
        </font>
      </ListItemIcon>
      <Link to="/specialized-health-information" component={NavLink}>
      <font  className="sidebar-options-color" >
        <ListItemText primary="Specialized Health Information" />
        </font>
      </Link>
     
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <font  className="sidebar-options-color" >
          <AssessmentIcon />
        </font>
      </ListItemIcon>
      <Link to="/" component={NavLink}>
      <font  className="sidebar-options-color" >
        <ListItemText primary="Reports" />
        </font>
      </Link>
     
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <font  className="sidebar-options-color" >
          <HealingIcon />
        </font>
      </ListItemIcon>
      <Link to="/disease-prediction" component={NavLink}>
      <font  className="sidebar-options-color" >
        <ListItemText primary="Disease Prediction" />
        </font>
      </Link>
      
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <font  className="sidebar-options-color" >
          <AddAlertIcon />
        </font>
      </ListItemIcon>
      <Link to="/display-medicine-reminderList" component={NavLink}>
      <font  className="sidebar-options-color" >
          <ListItemText primary="Medicine Reminder" />
        </font>
      </Link>
    </ListItem>
   
  </div>
);
