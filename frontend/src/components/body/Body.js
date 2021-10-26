import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import ActivationEmail from "./auth/ActivationEmail";
import { useSelector } from "react-redux";
import Profile from "./profile/Profile";
import Home from "./home/Home";
import MedicineInput from "./medicineReminder/InputMedReminder";
import DisplayMedicineReminders from "./medicineReminder/DisplayMedReminders";
import MenstrualCycle from "./MenstrualCycle/MenstrualCycle";
import HealthInfo from "./genHealthInfo/HealthInfo";
import GenHealthDashboard from "./genHealthInfo/GenHealthDashboard";
import MedicineDose from "./medicineReminder/MedDoses";
import specializedHealthInfo from "./specializedHealthInfo/specializedHealthInfo";
import ViewFiles from "./specializedHealthInfo/ViewFiles";
import DietPlan from "./dietPlan/DietPlan";
import DietGoalSetter from "./dietPlan/DietGoalSetter";
import DiseasePrediction from "./diseasePrediction/DiseasePrediction";

export default function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;
  return (
    <section>
      <Switch>
        {/* <Route path="/" component={Login} exact /> */}
        <Route path="/home" component={isLogged ? Home : Login} exact />

        <Route
          path="/user/activate/:activation_token"
          component={ActivationEmail}
          exact
        />
        <Route path="/profile" component={isLogged ? Profile : Login} exact />
        <Route
          path="/medicine-reminder"
          component={isLogged ? MedicineInput : Login}
          exact
        />
        <Route
          path="/display-medicine-reminderList"
          component={isLogged ? DisplayMedicineReminders : Login}
          exact
        />
        <Route
          path="/menstrual-cycle"
          component={isLogged ? MenstrualCycle : Login}
          exact
        />
             <Route
          path="/general-health-dashboard"
          component={isLogged ? GenHealthDashboard : Login}
          exact
        />
        <Route
          path="/general-health-information"
          component={isLogged ? HealthInfo : Login}
          exact
        />
        <Route
          path="/medicine-doses"
          component={isLogged ? MedicineDose : Login}
          exact
        />

        <Route
          path="/specialized-health-information"
          component={isLogged ? specializedHealthInfo : Login}
          exact
        />
        <Route
          path="/view-files"
          component={isLogged ? ViewFiles : Login}
          exact
        />

        <Route
          path="/diet-plans"
          component={isLogged ? DietPlan : Login}
          exact
        />
        <Route
          path="/set-diet-goal"
          component={isLogged ? DietGoalSetter : Login}
          exact
        />

        <Route
          path="/disease-prediction"
          component={isLogged ? DiseasePrediction : Login}
          exact
        />
        {/* <PrivateRoute path= "/display-medicine-reminderList" component={DisplayMedicineReminders} exact />
                 <PrivateRoute path="/menstrual-cycle" component={MenstrualCycle} exact />
                 <PrivateRoute path="/general-health-information" component={  HealthInfo } exact /> */}
      </Switch>
    </section>
  );
}
