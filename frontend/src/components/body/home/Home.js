import React from "react";
// import { sidebar } from '../../header/Sidebar'
import "../../../static/Styling/home.css";
import { Container, Grid,CssBaseline } from "@material-ui/core";
import { ShowHeader } from "../../header/Header";
import {ShowFeatureButtons} from '../../header/featureButton'

import { Switch, Route } from "react-router-dom";
import Login from "../auth/Login";
import ActivationEmail from "../auth/ActivationEmail";
import { useSelector } from "react-redux";
import Profile from "../profile/Profile";
// import Home from "./home/Home";
import MedicineInput from "../medicineReminder/InputMedReminder";
import DisplayMedicineReminders from "../medicineReminder/DisplayMedReminders";
import MenstrualCycle from "../MenstrualCycle/MenstrualCycle";
import HealthInfo from "../genHealthInfo/HealthInfo";
import GenHealthDashboard from "../genHealthInfo/GenHealthDashboard";
import MedicineDose from "../medicineReminder/MedDoses";
import specializedHealthInfo from "../specializedHealthInfo/specializedHealthInfo";
import ViewFiles from "../specializedHealthInfo/ViewFiles";
import DietPlan from "../dietPlan/DietPlan";
import DietGoalSetter from "../dietPlan/DietGoalSetter";
import DiseasePrediction from "../diseasePrediction/DiseasePrediction";
import Body from "../Body";



function Home() {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  return (
    <div>
      <div
        class="bg_image"
        style={{
          backgroundImage: "url(/img/home-bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          opacity: " 0.8",
          backgroundPosition: "center",
        }}
      >
       
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        > */}
           {ShowHeader('white')}
           <pre></pre>
           <pre></pre> <pre></pre> <pre></pre> <pre></pre>
           <h4 align='center'> Your Health, Our Concern</h4>
           
           <Grid className="side-button-grid">
         {ShowFeatureButtons()}
         {/* <Body/> */}
          
        </Grid>  
        {/* </div> */}
       
      </div>
    </div>
  );
}

export default Home;
