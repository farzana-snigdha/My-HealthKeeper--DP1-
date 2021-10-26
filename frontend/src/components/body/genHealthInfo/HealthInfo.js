import "../../../static/Styling/healthInfo.css";
import React from "react";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import HeightIcon from "@material-ui/icons/Height";
import { Button } from "@material-ui/core";
import WeightModal from "./WeightModal";
import BpModal from "./BpModal";
import SugarModal from "./SugarModal";
import PulseModal from "./PulseModal";
import { useSelector } from "react-redux";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import axios from "axios";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";

const weightInitialState = {
  infoTitleWeight: "Weight",
  infoWeight: "",
  errW: "",
  successW: "",
};

const bpInitialState = {
  infoTitleBp: "Bp",
  infoBp: "",
  errB: "",
  successB: "",
};

const pulseInitialState = {
  infoTitlePulse: "Pulse",
  infoPulse: "",
  errP: "",
  successP: "",
};

const sugarInitialState = {
  infoTitleSugar: "Sugar",
  infoSugar: "",
  errS: "",
  successS: "",
};

function GeneralHealthInfo() {
  const token = useSelector((state) => state.token);

  const [showWeightModal, setShowWeightModal] = useState(false);
  const openWeightModal = () => setShowWeightModal(true);

  const [showBPModal, setShowBPModal] = useState(false);
  const openBPModal = () => setShowBPModal(true);

  const [showPulseModal, setShowPulseModal] = useState(false);
  const openPulseModal = () => setShowPulseModal(true);

  const [showSugarModal, setShowSugarModal] = useState(false);
  const openSugarModal = () => setShowSugarModal(true);

  const [weight, setWeight] = useState(weightInitialState);
  const [bp, setBp] = useState(bpInitialState);
  const [pulse, setPulse] = useState(pulseInitialState);
  const [sugar, setSugar] = useState(sugarInitialState);

  const { infoTitleWeight, infoWeight, errW, successW } = weight;
  const { infoTitleBp, infoBp, errB, successB } = bp;
  const { infoTitlePulse, infoPulse, errP, successP } = pulse;
  const { infoTitleSugar, infoSugar, errS, successS } = sugar;

  const handleChangeWeight = (e) => {
    const { name, value } = e.target;
    setWeight({ ...weight, [name]: value, errW: "", successW: "" });
  };

  const handleChangeBp = (e) => {
    const { name, value } = e.target;
    setBp({ ...bp, [name]: value, errB: "", successB: "" });
  };

  const handleChangePulse = (e) => {
    const { name, value } = e.target;
    setPulse({ ...pulse, [name]: value, err: "", success: "" });
  };

  const handleChangeSugar = (e) => {
    const { name, value } = e.target;
    setSugar({ ...sugar, [name]: value, err: "", success: "" });
  };

  const handleSubmitWeight = async (e) => {
    e.preventDefault();
    var infoTitle = infoTitleWeight;
    var info = infoWeight;

    await axios
      .post(
        "http://localhost:5000/addGenHealth",
        {
          infoTitle,
          info,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        setWeight({
          ...weight,
          errW: "",
          successW: "Weight added successfully!",
        });
      })
      .catch((err) => {
        err.response.data.msg &&
          setWeight({ ...weight, errW: err.response.data.msg, successW: "" });
      });

    setTimeout(function () {
      setWeight(weightInitialState);
    }, 3000);
  };

  const handleSubmitBp = async (e) => {
    e.preventDefault();
    var infoTitle = infoTitleBp;
    var info = infoBp;

    await axios
      .post(
        "http://localhost:5000/addGenHealth",
        {
          infoTitle,
          info,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        setBp({ ...bp, errB: "", successB: "BP added successfully!" });
      })
      .catch((err) => {
        err.response.data.msg &&
          setBp({ ...bp, errB: err.response.data.msg, successB: "" });
      });

    setTimeout(function () {
      setBp(bpInitialState);
    }, 3000);
  };

  const handleSubmitPulse = async (e) => {
    e.preventDefault();
    var infoTitle = infoTitlePulse;
    var info = infoPulse;

    await axios
      .post(
        "http://localhost:5000/addGenHealth",
        {
          infoTitle,
          info,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        setPulse({ ...pulse, errP: "", successP: "Pulse added successfully!" });
      })
      .catch((err) => {
        err.response.data.msg &&
          setPulse({ ...pulse, errP: err.response.data.msg, successP: "" });
      });

    setTimeout(function () {
      setPulse(pulseInitialState);
    }, 3000);
  };

  const handleSubmitSugar = async (e) => {
    e.preventDefault();
    var infoTitle = infoTitleSugar;
    var info = infoSugar;

    await axios
      .post(
        "http://localhost:5000/addGenHealth",
        {
          infoTitle,
          info,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        setSugar({ ...sugar, errS: "", successS: "Sugar added successfully!" });
      })
      .catch((err) => {
        err.response.data.msg &&
          setSugar({ ...sugar, errS: err.response.data.msg, successS: "" });
      });

    setTimeout(function () {
      setSugar(sugarInitialState);
    }, 3000);
  };

  return (
    <div className=" body ">
      <Container
        className="body_container"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          maxWidth: 1900,
          padding: 0,
          backgroundColor: COLORS.genHealthBackground,
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
            {
              <div>
                <Card className="root">
                  <div className="details">
                    <CardContent className="content">
                      {errW && showErrMsg(errW)}
                      {successW && showSuccessMsg(successW)}
                      <Typography component="h5" variant="h5">
                        👣 Weight
                      </Typography>
                      <div className="margin">
                        <Grid container  alignItems="flex-end">
                          <Grid item>
                            <LocalHospitalRoundedIcon />
                          </Grid>
                          <Grid item>
                            <TextField
                              label="KG"
                              id="infoWeight"
                              name="infoWeight"
                              value={infoWeight}
                              onChange={handleChangeWeight}
                            />
                          </Grid>
                          <IconButton
                            aria-label="add"
                            className="controls"
                            onClick={handleSubmitWeight}
                          >
                            <AddCircleOutlineRoundedIcon className="playIcon" />
                          </IconButton>
                        </Grid>
                      </div>
                      <Button className="summary_btn" onClick={openWeightModal}>
                        Show History
                      </Button>
                    </CardContent>
                  </div>
                  <WeightModal
                    showWeightModal={showWeightModal}
                    setShowWeightModal={setShowWeightModal}
                  />
                </Card>
              </div>
            }
            {
              <Card className="root">
                <div className="details">
                  <CardContent className="content">
                    {errB && showErrMsg(errB)}
                    {successB && showSuccessMsg(successB)}
                    <Typography component="h5" variant="h5">
                      🩸 Blood Pressure (systolic/diastolic)
                    </Typography>
                    <div className="margin">
                      <Grid container spacing={2} alignItems="flex-end">
                        <Grid item>
                          <InvertColorsIcon />
                        </Grid>
                        <Grid item>
                          <TextField
                            label="120/80"
                            id="infoBp"
                            name="infoBp"
                            value={infoBp}
                            onChange={handleChangeBp}
                          />
                        </Grid>
                        <IconButton
                          aria-label="add"
                          className="controls"
                          onClick={handleSubmitBp}
                        >
                          <AddCircleOutlineRoundedIcon className="playIcon" />
                        </IconButton>
                      </Grid>
                    </div>
                    <Button className="summary_btn" onClick={openBPModal}>
                      {" "}
                      Show History
                    </Button>
                  </CardContent>
                </div>
                <BpModal
                  showBPModal={showBPModal}
                  setShowBPModal={setShowBPModal}
                ></BpModal>
              </Card>
            }
            {
              <Card className="root">
                <div className="details">
                  <CardContent className="content">
                    {errP && showErrMsg(errP)}
                    {successP && showSuccessMsg(successP)}
                    <Typography component="h5" variant="h5">
                      💓 Pulse Rate
                    </Typography>
                    <div className="margin">
                      <Grid container spacing={2} alignItems="flex-end">
                        <Grid item>
                          <FavoriteBorderIcon />
                        </Grid>
                        <Grid item>
                          <TextField
                            label="bpm"
                            id="infoPulse"
                            name="infoPulse"
                            value={infoPulse}
                            onChange={handleChangePulse}
                          />
                        </Grid>
                        <IconButton
                          aria-label="add"
                          className="controls"
                          onClick={handleSubmitPulse}
                        >
                          <AddCircleOutlineRoundedIcon className="playIcon" />
                        </IconButton>
                      </Grid>
                    </div>
                    <Button className="summary_btn" onClick={openPulseModal}>
                      {" "}
                      Show History
                    </Button>
                  </CardContent>
                </div>
                <PulseModal
                  showPulseModal={showPulseModal}
                  setShowPulseModal={setShowPulseModal}
                ></PulseModal>
              </Card>
            }
            {
              <Card className="root">
                <div className="details">
                  <CardContent className="content">
                    {errS && showErrMsg(errS)}
                    {successS && showSuccessMsg(successS)}
                    <Typography component="h5" variant="h5">
                      🎚 Sugar Level
                    </Typography>
                    <div className="margin">
                      <Grid container spacing={2} alignItems="flex-end">
                        <Grid item>
                          <HeightIcon />
                        </Grid>
                        <Grid item>
                          <TextField
                            label=" "
                            id="infoSugar"
                            name="infoSugar"
                            value={infoSugar}
                            onChange={handleChangeSugar}
                          />
                        </Grid>
                        <IconButton
                          aria-label="add"
                          className="controls"
                          onClick={handleSubmitSugar}
                        >
                          <AddCircleOutlineRoundedIcon className="playIcon" />
                        </IconButton>
                      </Grid>
                    </div>
                    <Button className="summary_btn" onClick={openSugarModal}>
                      {" "}
                      Show History
                    </Button>
                  </CardContent>
                </div>
                <SugarModal
                  showSugarModal={showSugarModal}
                  setShowSugarModal={setShowSugarModal}
                ></SugarModal>
              </Card>
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GeneralHealthInfo;
