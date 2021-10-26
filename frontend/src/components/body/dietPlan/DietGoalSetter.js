import React, { useState, useEffect, useRef } from "react";
import { Button, Grid, TextField, MenuItem, Select,FormControl,InputLabel } from "@material-ui/core";
import "../../../static/Styling/dietPlanGoal.css";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  height: "",
  weight: "",
  age: "",
  levelOfActivity: "",
  target: "",
  success: "",
  err: "",
};

export default function DietGoalSetter(props) {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const [basicInfo, setBasicInfo] = useState(initialState);
  const { height, weight, age, levelOfActivity, target, success, err } =
    basicInfo;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBasicInfo({ ...basicInfo, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let gender = user.gender;
    let userId = user._id;

    await axios
      .post(
        "http://localhost:5000/diet-plan/setup-target_info",
        {
          height: height,
          weight: weight,
          age: age,
          gender: gender,
          levelOfActivity: levelOfActivity,
          target: target,
          user: userId,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        setBasicInfo({
          ...basicInfo,
          err: "",
          success: "Your target is saved!!",
        });
        console.log("diet goal setter success ", res);

        setTimeout(function () {
          setBasicInfo(initialState);
          props.isVisible();
        }, 2000);
      })
      .catch((err) => {
        setBasicInfo({
          ...basicInfo,
          err: "Something went wrong!!",
          success: "",
        });
        console.log("diet goal setter ", err);
      });
  };

  return (
    <div className='goal_div'>
      
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {/* <Grid className="goal_grid" spacing={3} container> */}
          {/* <Grid className="goal_grid_item" item xs={4}> */}
            <div
              data-toggle="tooltip"
              title="Height in inches"
              className="goal_font"
            >
            
            
            <TextField
            //  type="text"
            //  id="foodName"
            //  name="quantity"
             label="Height in inches"
              className='goal_setter_textfield'
              type="number"
              id="height"
              name="height"
              placeholder="inches"
              onChange={handleChangeInput}
              value={height}
              fullWidth
            />
            </div>
          {/* </Grid>
          <Grid className="goal_grid_item" item xs={4}> */}
            <div
              data-toggle="tooltip"
              title="Weight in kgs"
              className="goal_font"
            >
              
            
            <TextField
               className='goal_setter_textfield'
              type="number"
              id="weight"
              name="weight"
              placeholder="kgs"
              label='Weight in kgs'
              onChange={handleChangeInput}
              value={weight}
              fullWidth
            />
            </div>
          {/* </Grid> */}
          {/* <Grid className="goal_grid_item" item xs={4}> */}
            <div
              data-toggle="tooltip"
              title="Age in years"
              className="goal_font"
            >
              
            
            <TextField
               className='goal_setter_textfield'
              type="number"
              id="age"
              name="age"
              label="Age in years"
              onChange={handleChangeInput}
              value={age}
              fullWidth
            />
            </div>
          {/* </Grid> */}
          {/* <Grid className="goal_grid_item" item xs={7.5}> */}
            <FormControl className="goal_font_dropdown">
            <InputLabel > Level of Activity</InputLabel>
              
              <Select
                id="levelOfActivity"
                name="levelOfActivity"
                value={levelOfActivity}
                onChange={handleChangeInput}
                className='goal_setter_dropdown'
              >
                <MenuItem value={"sedentary"}>
                  Sedentary (little or no exercise)
                </MenuItem>
                <MenuItem value={"lightly active"}>
                  {" "}
                  Lightly active (light exercise/sports 1-3 days/week)
                </MenuItem>
                <MenuItem value={"moderately active"}>
                  Moderately active (moderate exercise/sports 3-5 days/week)
                </MenuItem>
                <MenuItem value={"very active"}>
                  Very active (hard exercise/sports 6-7 days a week)
                </MenuItem>
                <MenuItem value={"extra active"}>
                  Extra active (very hard exercise/sports and physical job or 2x
                  training)
                </MenuItem>
              </Select>
            </FormControl>
          {/* </Grid>
          <Grid className="goal_grid_item" item xs={4.5}> */}
            <FormControl className="goal_font_dropdown">
            <InputLabel > Your Target</InputLabel>
              <Select
                       className='goal_setter_dropdown'
                       id="target"
                name="target"
                value={target}
                onChange={handleChangeInput}
                autoWidth
              >
                <MenuItem value={"gain"}>Weight Gain</MenuItem>
                <MenuItem value={"same"}>Maintain Current Weight</MenuItem>
                <MenuItem value={"loss"}>Weight Loss</MenuItem>
              </Select>
            </FormControl>
          {/* </Grid>
        </Grid> */}

        <div  className="set_diet_goal_button" >
          <Button
            className="add_btn"
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Set your goal
          </Button>
        </div>
      </div>
    
  );
}
