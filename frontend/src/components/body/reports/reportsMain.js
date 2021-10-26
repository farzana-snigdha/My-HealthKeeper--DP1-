import { Link, Redirect, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../../static/Styling/reports.css"
import axios from "axios";
import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";
import DeleteIcon from "@material-ui/icons/Delete";
import * as ReactBootStrap from 'react-bootstrap';
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import profile from "../../../static/Styling/profile.css";
import {
  Button,
  TextField,
  IconButton,
  InputLabel,
  FormControl,
} from "@material-ui/core";

const initialState = {
  err: "",
  success: "",
};

function ReportsMain() {
  const [avatar, setAvatar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState(initialState);
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { state } = useLocation();
  const { user } = auth;
  const [loading, setLoading] = useState(false);
  const [resultLoading,setResultLoading] = useState(true);
  const { err, success } = data;
  const [ans, setAns] = useState("");

  const handlePrediction = async (img) => {
    setResultLoading(false);
    // console.log(img);
    await axios
      .get("http://localhost:5000/reports", {
        headers: { Authorization: token, img: img },
      })
      .then((res) => {
        setResultLoading(true)
        const output = res.data.ans;
        // console.log(parseFloat(res.data.ans));
        if (res.data.ans == 0.0) {
          setAns("You do not have Pneumonia!");
        } else {
          setAns("You have Pneumonia.");
        }
      });
  };

  // console.log(ans);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("reports 1");

    const file = e.target.files[0];
    // console.log("reports 2, ", file);

    let formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    // console.log("sxsxdasxds ", formData);
    await axios
      .post("http://localhost:5000/reports_predict", formData, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log("reports ", res.data["filePath"]);
        setAvatar(res.data);
      })
      .catch((err) => {
        console.log("err reports : ", err);
      });

    setLoading(false);
  };
  // console.log("reports ", avatar['image']['filePath']);

  // const changeAvatar = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const file = e.target.files[0];

  //     if (!file)
  //       return setData({
  //         ...data,
  //         err: "No files were uploaded.",
  //         success: "",
  //       });

  return (
    <>
      <div
        className="reminder"
        style={{
          backgroundImage: "url(/img/reports1.jpg)",
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
            maxWidth: '100%',
            padding: 0,
            marginRight: 0,
          }}
        >
          <div style={{ backgroundColor: "black", color: "black" }}>
            {ShowHeader(COLORS.diseasePrediction)}
          </div>
          <pre></pre>
          <pre></pre> <pre></pre> <pre></pre> <pre></pre>
          <pre></pre>
          <Row className="body_feature_row">
            <Col style={{ display: "flex", flexDirection: "column" }}>
              {" "}
              &nbsp;
              <div className="reports_header_content">
                <pre></pre> <pre></pre> <pre></pre>
              </div>
              <div className="description_section_reports">
                <p>Upload an X-ray image and find out if you have pneumonia.</p>
              </div>
              <div className="reports_upload_body">
              <div
                  className="report_image_div"
                  onMouseOver={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                    {loading && <h3>Loading.....</h3>}
                  </div>
                  {avatar ? (
                    <img
                      style={{ maxWidth: 600, marginBottom:30, marginLeft:50 }}
                      className="report_image"
                      src={`http://localhost:5000/${avatar["image"]["filePath"]}`}
                      alt="img"
                    />
                  ) : (
                    ""
                  )}
                  <h6 align="center"> Upload a chest x-ray Image</h6>
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    id="file_up"
                    onChange={handleSubmit}
                  />

                  <div className="reports_predict_btn">
                    <Button
                      type="submit"
                      className="add_btn"
                      variant="contained"
                      onClick={() => {
                        handlePrediction(avatar["image"]["filePath"]);
                      }}
                      color="white"
                    >
                      <font className="add_btn_diet_font"> predict</font>
                    </Button>
                  </div>
                </div>
                
              </div>
              <div className="prediction_body">
                <div>
                  {resultLoading ? (""): ( <div>
                  <ReactBootStrap.Spinner style={{height:50, width:50}} animation="border" variant="primary" />
                  </div>)}

                </div>
                {ans?( <div className="reports_prediction">{ans} <br></br> Our model is only 83% accurate. <b>So please consult with a doctor to be sure.</b></div>):(' ')}
                {/* {ans?( <div className="reports_prediction">{ans} <br></br> Our model is only 83% accurate. <b>So please consult with a doctor to become sure</b></div>):(' ')} */}
               
              </div>
              <pre></pre>
              <pre></pre>
              <pre></pre>
              <pre></pre>
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
    </>
    
  );
}

export default ReportsMain;