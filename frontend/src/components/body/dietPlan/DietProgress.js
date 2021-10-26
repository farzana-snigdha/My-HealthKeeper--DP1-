import React, { useState, useEffect } from "react";
import { Button, Link, TextField, Select, IconButton } from "@material-ui/core";
import "../../../static/Styling/dietProgress.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";

import { Container, Row, Col } from "react-grid-system";

import { COLORS } from "../../themeColors";
import { element } from "prop-types";

const initialState = {
  selectedMonth: "",
};

export default function DietProgress() {
  // const history = useHistory();
  const token = useSelector((state) => state.token);
  const currentMonth = new Date().getMonth();
  const [selectedDate, setSelectedDate] = useState("0");
  const [year, setYear] = useState("0");
  const [consumedCaloriesData, setconsumedCaloriesData] = useState({});
  const [totalCal, setToalCal] = useState("");

  const handleSubmit = async (e) => {
    let consumed_cal_data = [];
    let req_cal_data = [];
    let cal_date = [];
    let burn_data=[]
    e.preventDefault();
    console.log(year);
    await axios
      .get(
        "http://localhost:5000/diet-plan/get_monthly_diet_data",

        {
          headers: { Authorization: token, months: selectedDate, year: year },
        }
      )
      .then((res) => {
        console.log(selectedDate);
        res.data.consume_cal.forEach((element) => {
          consumed_cal_data.push(element);
        });
        res.data.req_cal.forEach((element) => {
          req_cal_data.push(element);
        });
        res.data.cal_date.forEach((element) => {
          cal_date.push(element);
        });
        res.data.burn_data.forEach((element)=>{
          burn_data.push(element)
        });
        setToalCal(res.data.totalCal);
        console.log(consumed_cal_data);

        setconsumedCaloriesData({
          labels: cal_date,
          datasets: [
            {
              data: req_cal_data,
              label: "Required Calories",
              fill: false,
              lineTension: 0.5,
              backgroundColor: "#6aa84f",
              borderColor: "#6aa84f",
              borderWidth: 2,
              pointRadius: 5,
            }, {
              data: consumed_cal_data,
              label: "Consumed Calories",
              fill: false,
              lineTension: 0.5,
              backgroundColor: "#f4bf20",
              borderColor: "#f4bf20",
              borderWidth: 2,
              pointRadius: 5,
            },

           
            {
              data: burn_data,
              label: "Burned Calories",
              fill: false,
              lineTension: 0.5,
              backgroundColor: "#1a81dd",
              borderColor: "#1a81dd",
              borderWidth: 2,
              pointRadius: 5,
            },
          ],
        });
      })
      .catch((err) => {
        // err.response.data.msg &&
        // setItem({ ...item, err: err.response.data.msg, success: "" });
      });
  };

  const consumedCaloriesChart = () => {
    let weight_array = [];
    let weight_date_array = [];
    setconsumedCaloriesData({
      labels: weight_date_array,
      datasets: [
        {
          data: weight_array,
          label: "Required Calories",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "#6aa84f",
          borderColor: "#6aa84f",
          borderWidth: 2,
        },
        {
          data: weight_array,
          label: "Consumed Calories",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "#f4bf20",
          borderColor: "#f4bf20",
          borderWidth: 2,
        },
      
        {
          data: weight_array,
          label: "Burned Calories",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "#1a81dd",
          borderColor: "#1a81dd",
          borderWidth: 2,
          pointRadius: 5,
        },
      ],
    });
  };

  useEffect(() => {
    consumedCaloriesChart();
  }, []);
  return (
    <div>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          maxWidth: 1900,
          padding: 0,
          marginRight: 0,
        }}
      >
        <div style={{ backgroundColor: "black", color: "black" }}>
          {ShowHeader(COLORS.dietBackground)}
        </div>
        <pre></pre>
        <pre></pre> <pre></pre> <pre></pre> <pre></pre>
        <pre></pre>
        <Row className="body_feature_row">
          <Col
            className="body_feature_column"
            style={{ position: "fixed" }}
            sm={2}
          >
            {ShowFeatureButtons()}
          </Col>
          <Col
            style={{
              marginLeft: 150,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <Container className="progress_container">
                <Row>
                  <Col
                    className="diet_progress_desc"
                    style={{ width: "35%", padding: "10px" }}
                    sm={4}
                  >
                    <div className="month_progress_div">
                      <div>
                        <Select
                          // className={classes.formControl}
                          type="text"
                          id="selectedMonth"
                          name="selectedMonth"
                          className="month_progress_select"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        >
                          <option value="0">Select Month</option>
                          <option value={"Jan"}>January</option>
                          <option value={"Feb"}>February</option>
                          <option value={"Mar"}>March</option>
                          <option value={"Apr"}>April</option>
                          <option value={"May"}>May</option>
                          <option value={"Jun"}>June</option>
                          <option value={"Jul"}>July</option>
                          <option value={"Aug"}>August</option>
                          <option value={"Sep"}>September</option>
                          <option value={"Oct"}>October</option>
                          <option value={"Nov"}>November</option>
                          <option value={"Dec"}>December</option>
                        </Select>

                        <br></br>
                        <Select
                          // className={classes.formControl}
                          type="text"
                          id="selectedMonth"
                          name="selectedMonth"
                          className="year_progress_select"
                          // defaultValue={currentMonth}
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          // padding="10px"
                          label="selectedMonth"
                        >
                          <option value="0">& Year</option>
                          <option value={"2021"}>2021</option>
                          <option value={"2020"}>2020</option>
                          <option value={"2019"}>2019</option>
                          <option value={"2018"}>2018</option>
                          <option value={"2017"}>2017</option>
                          <option value={"2016"}>2016</option>
                          <option value={"2015"}>2015</option>
                          <option value={"2014"}>2014</option>
                          <option value={"2013"}>2013</option>
                          <option value={"2012"}>2012</option>
                          <option value={"2011"}>2011</option>
                        </Select>

                        <IconButton
                          onClick={(e) => handleSubmit(e)}
                          style={{ padding: 0 }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </div>
                      {console.log(selectedDate)}
                    </div>

                    <div className="avg_consumed_cal_progress_div">
                      <span>
                        {" "}
                        Per day avg. <br></br>
                        <h2>
                          {" "}
                          <b>{totalCal} </b>
                        </h2>
                        kiloCalories were consumed
                      </span>
                    </div>
                    <div className="suggestion_progress_div">
                      <span>
                        You should have <br></br> lost around{" "}
                        <h4>
                          <b>3.5 kgs</b>{" "}
                        </h4>{" "}
                        in last month
                      </span>
                    </div>
                  </Col>
                  <Col
                    className="diet_progress_graph"
                    style={{ width: "65%", padding: "10px" }}
                  >
                    <h4 align="center">Your Diet Progress</h4>
                    <pre></pre> <pre></pre> <pre></pre> <pre></pre>
                    <Line
                      data={consumedCaloriesData}
                      options={{
                        responsive: true,
                        title: { text: "Sugar Graph", display: true },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10,
                                beginAtZero: true,
                              },
                              gridLines: {
                                display: false,
                              },
                            },
                          ],
                          xAxes: [
                            {
                              gridLines: {
                                display: false,
                              },
                            },
                          ],
                        },
                      }}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
