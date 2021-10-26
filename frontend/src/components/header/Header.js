import React,{useEffect,useState} from 'react';
import { Redirect } from "react-router-dom";
import clsx from "clsx";
import { Button, AppBar, Toolbar, Typography, Link,useScrollTrigger } from "@material-ui/core";
import { useCookies } from "react-cookie";
// import useScrollTrigger from '@material/useScrollTrigger';
import PropTypes, { func } from 'prop-types';

import Grid from "@material-ui/core/Grid";
import { ShowFeatureButtons } from "./featureButton";

import BubbleChartIcon from "@material-ui/icons/BubbleChart";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { NavLink } from "react-router-dom";

import Body from "../body/Body";

import { useSelector } from "react-redux";
import axios from "axios";
import featureButton from "../../static/Styling/featureButton.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 20, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },

  
  title: {
    flexGrow: 1,
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },

  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  link: {
    margin: theme.spacing(10, 15),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  image: {
    margin: theme.spacing(1, 1.5),
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  signinTitle: {
    marginRight: "4%",
    opacity: ".95",
    "&:hover": {
      opacity: "1",
    },
  },
  logout: {
    marginLeft: "14px",
  },

  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  authStyle: {
    // color: colors.link-color,
    marginLeft: "20px",
  },
}));


export const ShowHeader=(appBarClr)=> {
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const { user, isLogged } = auth;

  const [cookies, removeCookie] = useCookies(["user"]);

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("UserMenstrualInfo");
      localStorage.removeItem("userID");
      localStorage.removeItem("spUser");
      removeCookie("UserMenstrualInfo");

      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    // console.log(user._id);
    return (
      <div>
        <Link
          to="/profile"
          data-toggle="tooltip"
          title="Profile Settings"
          component={NavLink}
        >
          {/* {<img className={classes.imageIcon} src={user.avatar} alt="" />} */}
          <font className="link-color">{user.name} </font>
        </Link>

        <Link
          className={classes.logout}
          component={NavLink}
          to="/"
          onClick={handleLogout}
        >
          <font className="link-color">
            <i className="fas fa-sign-out-alt"></i>Logout
            {""}
          </font>
        </Link>
      </div>
    );
  };
// console.log('mjiihxdiwh ',appBarClr)
  
  return (
  <>
  
        <AppBar
        style={{ backgroundColor:appBarClr, boxShadow:'none' }}
          // position="absolute"
          // className={clsx(classes.appBar)}
          // color='blue'
          // elevation={0.5}
        >
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <Link
                component={NavLink}
                to="/home"
                underline="none"
                color="textPrimary"
              >
                My HealthKeeper
              </Link>
            </Typography>
            <Typography className={classes.signinTitle} color="inherit">
              {userLink()}
            </Typography>
          </Toolbar>
        </AppBar>
        
        {/* <Grid className="side-button-grid">
         {showFeatureButtons()}
          {genderOfTheUser()}
        </Grid>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Body />
        </main> */}
      </>
    
  );
}


