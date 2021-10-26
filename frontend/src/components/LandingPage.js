import React from "react";
import ReactDOM from "react-dom";
import AnimatedBg from "react-animated-bg";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import {Button,Typography,Link}  from '@material-ui/core';

function LandingPage() {
  const imagesList = [
    'url(/img/landingPage/Photo4.jpeg)',
    'url(/img/landingPage/Photo1.jpeg)',
    'url(/img/landingPage/Photo2.jpeg)'
  ];
  const useStyles = makeStyles((theme) => ({
    mmm: {
       
        color: "black",
        padding: "20%",
        textShadow:"2px 4px #FFFFFF",
      },
    image: {
           backgroundRepeat: "no-repeat",
         backgroundSize: "cover",
      backgroundPosition: "center",
    },
    typography:{
        margin:"0%",
    },
 button:{
     marginTop:"1%",
     background:"white",
     color:"black",
     borderRadius: "10px",
     background: "#e0e0e0",
     boxShadow:  "-1px -1px 1px 1px #ffffff",
 }
  
  }));

  const classes = useStyles();
  return (
    <div>
    
      <AnimatedBg
        colors={imagesList}
        duration={3}
        delay={2}
        timingFunction="ease-out"
        className={classes.image}
      >
        <div className={classes.mmm}>
            <Typography className={classes.typography} 
            variant="h3"
            fontWeight="bold">
            START YOUR JOURNEY 
            </Typography>
         
          
         
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        
      >
           <Link
                component={NavLink}
                to="/login"
                underline="none"
                color="textPrimary"
              >
 Sign in
              </Link>
       
      </Button>
        </div>
      </AnimatedBg>
    </div>
  );
}
export default LandingPage