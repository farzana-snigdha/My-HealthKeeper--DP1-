import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { Grid, TextField, Button } from "@material-ui/core";

const initialState = {
  startdate: "",
  enddate: "",
  duration: "",
  cycleLength: "",
  err: "",
  success: "",
};

export default function ShowBasicMensData() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [initialData, setInitialData] = useState(initialState);
  const [visible, setVisible] = useState(true);

  const { startDate, endDate, duration, cycleLength, err, success } =
    initialData;
  const getInitialData = async () => {
    axios
      .get(`http://localhost:5000/user/is-initial-data-available`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data1 = response.data.user;
        if (data1) {
          setVisible(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userEmail = user.email;

    try {
      const res = await axios.post(
        "http://localhost:5000/user/setup-initial-data",
        {
          startDate,
          endDate,
          duration,
          cycleLength,
          userEmail,
        },
        {
          headers: { Authorization: token },
        }
      );
      setInitialData({ ...initialData, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setInitialData({
          ...initialData,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInitialData({ ...initialData, [name]: value, err: "", success: "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "http://localhost:5000/user/update-menstrual-data",
        {
          startDate,
          endDate,
        },
        {
          headers: { Authorization: token },
        }
      );

      setInitialData({ ...initialData, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setInitialData({
          ...initialData,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  const visibility = () => {
    if (visible) {
      return (
        <>
          {
            <Grid container alignItems="center" style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 16, marginBottom: 0, fontWeight: "bold" }}>
                Duration of each cycle
              </p>
              <TextField
                className="input_fields"
                fullWidth
                type="number"
                required
                id="duration"
                name="duration"
                onChange={handleChangeInput}
                value={duration}
                variant="standard"
              />
            </Grid>
          }
          {
            <Grid container alignItems="center" style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 16, marginBottom: 0, fontWeight: "bold" }}>
                Cycle Length
              </p>

              <TextField
                className="input_fields"
                fullWidth
                type="number"
                required
                id="cycleLength"
                name="cycleLength"
                onChange={handleChangeInput}
                value={cycleLength}
                variant="standard"
              />
            </Grid>
          }
          <div></div>
          {
            <Button
              className="mens_button"
              variant="contained"
              onClick={handleSubmit}
              type={onsubmit}
            >
              Save Initial Information
            </Button>
          }
        </>
      );
    } else {
      return (
        <div>
          <Button
            className="mens_button"
            variant="contained"
            onClick={handleUpdate}
            type={onsubmit}
          >
            Update Information
          </Button>
        </div>
      );
    }
  };
  return (
    <div className="input_form">
      {
        <Grid align="center">
          <h4>Let's set up your Initial Information 💓 </h4>
        </Grid>
      }
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <Grid container alignItems="center" style={{ marginBottom: 10 }}>
        <p style={{ fontSize: 16, marginBottom: 3, fontWeight: "bold" }}>
          Last Start Date of your Cycle
        </p>
        <TextField
          className="input_fields"
          fullWidth
          required
          type="date"
          id="startDate"
          name="startDate"
          onChange={handleChangeInput}
          value={startDate}
          variant="standard"
          InputLabelProps={{
            shrink: false,
          }}
        />
      </Grid>
      <Grid container alignItems="center" style={{ marginBottom: 10 }}>
        <p style={{ fontSize: 16, marginBottom: 3, fontWeight: "bold" }}>
          Last End Date of your Cycle
        </p>
        <TextField
          className="input_fields"
          fullWidth
          type="date"
          required
          id="endDate"
          name="endDate"
          onChange={handleChangeInput}
          value={endDate}
          variant="standard"
          InputLabelProps={{
            shrink: false,
          }}
        />
      </Grid>
      {visibility()}
    </div>
  );
}
