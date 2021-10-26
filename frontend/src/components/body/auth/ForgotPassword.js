import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, Toolbar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import "../../../static/Styling/ForgotPassword.css";
const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, err: "Invalid emails.", success: "" });

    try {
      const res = await axios.post("/user/forgot", { email });

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },

    forms: {
      width: "100%", // Fix IE 11 issue.
      paddingRight: "36%",
      paddingLeft: "36%",
      paddingTop: "5%",
      alignItems: "center",
      justifyContent: "center",
    },
    email: {
      backgroundColor: "white",
      width: "100%",
      borderRadius: "5px",
    },
    label: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    submit: {
      marginTop: "10px",
      width: "100%",
      alignItems: "flex-end",
      background: "#232327",

      padding: " 10px 30px",
      background: "#15495d",
      borderRadius: "10px",
      color: "white",
      "&:hover": {
        background: "#308294",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Toolbar className={classes.toolbar}>
        {" "}
        <Typography
          variant="h4"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link component={NavLink} to="/" underline="none" color="textPrimary">
            My HealthKeeper
          </Link>
        </Typography>
      </Toolbar>
      <div className={classes.forms}>
        <label className={classes.label}>
          <h4> Recover Password 🔑</h4>
        </label>
        <TextField
          className={classes.email}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Enter your email address"
          name="email"
          autoComplete="email"
          type="text"
          autoFocus
          onChange={handleChangeInput}
          value={email}
        />
        <Box flexDirection="row-reverse">
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={forgotPassword}
          >
            Verify your email
          </Button>
        </Box>
      </div>
      <div
        class="bg_image"
        style={{
          backgroundImage: "url(/img/reset-password.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "55vh",
          backgroundPosition: "center",
        }}
      ></div>

      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  );
}

export default ForgotPassword;
