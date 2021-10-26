import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { isLength, isMatch } from "../../utils/validation/Validation";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import {Typography,Toolbar} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";
const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, re_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, re_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

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
    image: {
      backgroundImage:
        "url(https://media.istockphoto.com/photos/healthy-eating-exercising-weight-and-blood-pressure-control-picture-id1280587810?b=1&k=6&m=1280587810&s=170667a&w=0&h=rhieqbyXq1Lbkqa_6_8et5n6i3zhJQ5qkE7nUnm3Gy0=)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(12, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    email: {
      maxWidth: "80%",
      marginTop: "40px",
    },
    email1: {
      maxWidth: "80%",
      marginTop: "20px",
    },
    submit: {
      marginTop: "10px",
      width: "100%",
      alignItems: "flex-end",
      background: "#303035",
      color: "white",
      padding: " 10px 30px",
      borderRadius: "3px",
      "&:hover": {
        background: "#232327",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div>
         <CssBaseline />
        <Toolbar className={classes.toolbar}>
          {" "}
         
          <Typography
            variant="h5"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <Link
              component={NavLink}
              to="/"
              underline="none"
              color="textPrimary"
            >
              My HealthKeeper
            </Link>
          </Typography>
          
        </Toolbar>
        <Grid container component="main" maxwidth="xs">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h3">
            Reset Your Password
          </Typography>

          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChangeInput}
            value={password}
            minLength="6"
            className={classes.email}
          />

          <TextField
            variant="outlined"
            className={classes.email1}
            required
            fullWidth
            name="re_password"
            label="Retype Password"
            type="password"
            id="re_password"
            autoComplete="current-password"
            onChange={handleChangeInput}
            value={re_password}
            minLength="6"
          />

          <Box flexDirection="row-reverse">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
              onClick={handleResetPass}
            >
              Reset Password
            </Button>
          </Box>
        </div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </Grid>
    </Grid>
 

    </div>
  );
}

export default ResetPassword;
