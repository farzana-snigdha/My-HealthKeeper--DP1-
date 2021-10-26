import React, { useState } from "react";
import "../../../static/Styling/dietPlan.css";
import "../../../static/Styling/healthInfo.css";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import axios from "axios";
import { TextField } from "@material-ui/core";

export default function FoodHistoryTable() {
  const token = useSelector((state) => state.token);
  const [foodList, setFoodList] = useState([]);
  const [burntCal, setBurntCal] = useState([])
  const getFoodDetailsTable = async (e) => {
    e.preventDefault();
    const historyDate = e.target.value;
    console.log(typeof historyDate);

    await axios
      .get("http://localhost:5000/diet-plan/getFoodHistory", {
        headers: { Authorization: token, dates: historyDate },
      })
      .then((res) => {
        setFoodList(res.data);
      });
      getCalorieBurnt(historyDate);
  };

  const getCalorieBurnt = async (historyDate) => {
    await axios
      .get("http://localhost:5000/diet-plan/getCalorieBurnt", {
        headers: { Authorization: token, dates: historyDate },
      })
      .then((res) => {
        console.log(res.data)
        setBurntCal(res.data);
      });
  };
  

  return (
    <div>
    <pre></pre>
      <pre></pre>
      <div style={{color:'#155844',marginLeft:'30%',  marginTop:'3%',fontSize:20,fontWeight:'bold'}}> 📅 Select Date for Viewing Your Food History Details </div>
      <TextField
        style={{color:'#155844',marginLeft:'40%',  marginTop:'3%',width:'20%'}}
        variant="standard"
        required
        id="startdate"
        name="startdate"
        onChange={getFoodDetailsTable}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <div className="food_table">
        <div className="diet_info_item_progress"></div>
        <Table hover size="sm" style={{width:'67%',marginLeft:'16.5%'}}>
          <thead>
            <tr style={{ background: "transparent" }}>
              <th> Meal Description </th>
              <th> Item Name </th>
              <th> Quantity (per servings) </th>
              <th> Consumed Calories (per servings)</th>
            </tr>
          </thead>

          <tbody>
            {foodList.map((food, index) => (
              <tr
                style={index % 2 ? { color: "#0777c2" } : { color: "#f7900a" }}
              >
                <td>{food.meal}</td>
                <td>{food.food}</td>
                <td>{food.quantity}</td>
                <td>{food.consumedCalories}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <div style={{color:'#155844',marginLeft:'39%',  marginTop:'3%',fontSize:20,fontWeight:'bold'}}><h4><u>Summary Of The Day</u></h4></div>
      <pre></pre>
      <pre></pre>
      <Table hover size="md" style={{width:'40%',marginLeft:'29%',alignItems:'center',justifyContent:'center'}}>
          <thead>
            <tr style={{ background: "transparent" }}>
              <th> Required Calories (kcal) </th>
              <th> Calories Consumed (kcal) </th>
              <th> Calories Burnt for the day(kcal) </th>
            </tr>
          </thead>
          <tbody>
            {burntCal.map((cal, index) => (
              <tr
                style={index % 2 ? { color: "#0777c2" } : { color: "#f7900a" }}
              >
                <td>{cal.requiredCalories}</td>
                <td>{cal.consumedCalories}</td>
                <td>{cal.burnedCalories}</td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
  );
}