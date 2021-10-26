import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../../static/Styling/dietPlan.css";

export default function DietOverview() {
  const token = useSelector((state) => state.token);
  const [multipleProgress, setMultipleProgress] = useState(0.0);
  const [foodList, setFoodList] = useState([]);
  const [consumed, setConsumed] = useState("");
  const [required, setRequired] = useState("");
  const [remaining, setRemaining] = useState(0);
  const getFoodConsumed = async () => {
    await axios
      .get("http://localhost:5000/diet-plan/getFoodList", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setFoodList(res.data);
      });
  };
  const getDietSummaryOfTheDay = async () => {
    await axios
      .get("http://localhost:5000/diet-plan/getDietSummaryOfTheDay", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setConsumed(res.data.consumedCalories-res.data.burnedCalories);
        setRequired(res.data.requiredCalories);
        setRemaining(res.data.requiredCalories - res.data.consumedCalories);
        const percentage =
          parseFloat(
            (res.data.consumedCalories-res.data.burnedCalories) / res.data.requiredCalories
          ).toFixed(4) * 100;
        setMultipleProgress(percentage);
        console.log(res.data);
      });
  };
  useEffect(async () => {
    getFoodConsumed();
    // if (remaining == NaN) {
    //   setRemaining(0);
      
    // }

    getDietSummaryOfTheDay();
  }, []);

  return (
    <div>
      <div className="food_table">
        <div className="diet_info_section">
          <div className="diet_info_item">
            Required
            <br />
            {/* <div style={{color:'#6f9a37'}}>{required}</div> */}
            {required} kcal
          </div>
          <div className="diet_info_item">
            Consumed
            <br></br>
            {consumed} kcal
          </div>
          <div className="diet_info_item">
            <br></br>
            <p style={remaining < 0 ? { color: "red" } : { color: "#373950" }}>
              Remaining <br></br> {remaining} kcal
            </p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "2px solid #6f9a37",
              marginTop: 0,
            }}
          >
            <CircularProgressbar
              value={multipleProgress}
              text={`${multipleProgress}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(56, 153, 56, ${multipleProgress / 100})`,
                textColor: "#373950",
                textSize: 25,
                trailColor: "white",
                backgroundColor: "#6f9a37",
              })}
            />
          </div>
        </div>
        <div className="diet_info_item_progress"></div>
      </div>
    </div>
  );
}
