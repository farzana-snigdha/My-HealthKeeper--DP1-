import React, { useState, useEffect } from "react";
import { Button, Link, TextField, Select, IconButton } from "@material-ui/core";
import "../../../static/Styling/dietProgress.css";
import { useSelector } from "react-redux";
import axios from "axios";

import { COLORS } from "../../themeColors";


export default function BurnedCalories() {
    const [burnCal, setBurnCal] = useState("");

  // const history = useHistory();
  const token = useSelector((state) => state.token);
  const saveBurnCal = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/diet-plan/burn_calorie',{burnedCalories: burnCal, }, {
        headers: { Authorization: token  }
      }).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
  };
  

  useEffect(() => {
    // consumedCaloriesChart();
  }, []);
  return (
    <div>
        <h3 style={{color:'#6f9a37',marginBottom:4}}>Burnt some calories today?</h3>
        
Track the amount of calories you've burn everyday
<br></br>
              
               <div className="add_burn_diet">
               <TextField
                type="text"
                id="burnedCalories"
                name="burnedCalories"
                label="Kcal"
                value={burnCal}
                onChange={(e) => {
                  setBurnCal(e.target.value);
                }}
              ></TextField>
              <Button
                type="submit"
                className="burn_btn"
                variant="contained"
                onClick={saveBurnCal}
                color="white"
              >
                <font> save</font>
              </Button>
              </div>
    </div>
  );
}
