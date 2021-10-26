import React, { useState } from "react";
import "../../../static/Styling/dietPlan.css";
import "../../../static/Styling/healthInfo.css";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { Select, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
// import { ShowFeatureButtons } from "../../header/featureButton";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";

import { COLORS } from "../../themeColors";

function GenHealthHistoryTable() {
  const [sugarList, setsugarList] = useState([]);
  const [weightList, setweightList] = useState([]);
  const [diasList, setdiasList] = useState([]);
  const [pulseList, setpulseList] = useState([]);
  const [sysList, setsysList] = useState([]);
  const [dateList, setdateList] = useState([]);

  const token = useSelector((state) => state.token);
  const [selectedDate, setSelectedDate] = useState("0");
  const [year, setYear] = useState("0");
  const [type, setType] = useState("");

  const [isBp, setIsBp] = useState();

  const getMonthlyGenInfo = async (e) => {
    e.preventDefault();
    let sugarLists = [];
    let pulseLists = [];
    let weightLists = [];
    let sysLists = [];
    let diasLists = [];
    let datelists = [];
    await axios
      .get("http://localhost:5000/genHealthMonthlyHistory", {
        headers: { Authorization: token, months: selectedDate, year: year },
      })
      .then((res) => {
        console.log(res.data);

        res.data.sugar.forEach((element) => {
          sugarLists.push(element);
          // setsugarList(element);
        });
        res.data.weight.forEach((element) => {
          weightLists.push(element);
          // setweightList(element);
        });
        res.data.pulse.forEach((element) => {
          pulseLists.push(element);
          // setpulseList(element);
        });
        res.data.sys.forEach((element) => {
          sysLists.push(element);
          // setsysList(element);
        });
        res.data.dias.forEach((element) => {
          diasLists.push(element);
          // setdiasList(element);
        });
        res.data.date.forEach((element) => {
          datelists.push(element);
          // setdiasList(element);
        });
      })
      .catch((err) => {
        console.log(err, "Geeeeeen");
      });

    setsugarList(sugarLists);
    setpulseList(pulseLists);
    setweightList(weightLists);
    setsysList(sysLists);
    setdiasList(diasLists);
    setdateList(datelists);
  };
  console.log("sugarLists ", sugarList);
  return (
    <div
      style={{
        backgroundImage: "url(/img/genH1.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "50vh",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
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
          {ShowHeader(COLORS.genHealthBackground)}
        </div>
        <pre></pre>
        <pre></pre> <pre></pre> <pre></pre> <pre></pre>
        <pre></pre>
        <Row className="body_feature_row">
          <Col style={{ display: "flex", flexDirection: "column" }}>
            <div className="med_header_content">
              {/* <p>All your medicine scheduled in one place!</p> */}
            </div>

            <div>
              <pre></pre>
              <div
                style={{
                  marginLeft: "26%",
                  // marginTop: "30%",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {" "}
                <p
                  style={{ fontSize: 29, color: "#f78309", fontWeight: "bold" }}
                >
                  View Your Monthly General Health Information Details
                </p>
              </div>

              <Select
                style={{ color: "#155844", marginLeft: "36%", marginTop: "2%" }}
                type="text"
                id="selectedMonth"
                name="selectedMonth"
                className="month_progress_select"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="0">Select Month</option>
                <option value={"1"}>January</option>
                <option value={"2"}>February</option>
                <option value={"3"}>March</option>
                <option value={"4"}>April</option>
                <option value={"5"}>May</option>
                <option value={"6"}>June</option>
                <option value={"7"}>July</option>
                <option value={"8"}>August</option>
                <option value={"9"}>September</option>
                <option value={"10"}>October</option>
                <option value={"11"}>November</option>
                <option value={"12"}>December</option>
              </Select>

              <Select
                style={{
                  color: "#155844",
                  marginLeft: "6%",
                  marginTop: "1%",
                  marginRight: "4%",
                }}
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
                <option value="0">Select Year</option>
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
                onClick={(e) => getMonthlyGenInfo(e)}
                style={{ padding: 0 }}
              >
                <p
                  style={{
                    fontSize: 15,
                    marginTop: "5px",
                    color: "#f78309",
                    fontWeight: "bold",
                  }}
                >
                  OK
                </p>

                {/* <VisibilityIcon /> */}
              </IconButton>

              <div className="diet_info_item_progress"></div>
              <pre></pre>
              <pre></pre>
              <div style={{ marginLeft: "20%", marginRight: "20%" }}>
                <Table hover size="sm" style={{ background: "transparent" }}>
                  <thead
                    style={{
                      background: "transparent",
                      marginLeft: "20%",
                      marginRight: "20%",
                    }}
                  >
                    <tr>
                      <th>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Date
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Weight
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Sugar
                        level&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Pulse Rate
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Blood Pressure
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </th>
                    </tr>
                  </thead>

                  <tbody
                    style={{
                      background: "transparent",
                      marginLeft: "20%",
                      marginRight: "20%",
                    }}
                  >
                    <div>
                      {dateList.map((food, index) => (
                        <tr
                          style={
                            index % 2
                              ? { color: "#0777c2" }
                              : { color: "#f7900a" }
                          }
                        >
                          {" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <td>
                            {dateList[index]}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </td>
                          <td>
                            {weightList[index]}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </td>
                          <td>
                            {sugarList[index]}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </td>
                          <td>
                            {pulseList[index]}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </td>
                          <td>{diasList[index] + "/" + sysList[index]}</td>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </tr>
                      ))}
                    </div>
                  </tbody>
                </Table>
              </div>
              <div>
                {" "}
                <br></br> <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div>
          </Col>

          <Col
            className="body_feature_column"
            style={{ position: "fixed" }}
            sm={2}
          >
            {ShowFeatureButtons()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default GenHealthHistoryTable;
