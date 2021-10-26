import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  Button,
 
  Toolbar,
  Typography,
  Link,
 
  Avatar,
} from "@material-ui/core";

import { NavLink } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import { GoogleLogin } from "react-google-login";

import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";


const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/home");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/home");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
   
    avatar: {
     marginTop:"2%",
      marginLeft: theme.spacing(0),
      backgroundColor: "#0c3646",
      alignItems:'center',
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      paddingRight: "10%",
      paddingLeft: "10%",
      paddingTop: "2%",
      paddingBottom:"2%",
    },
    TextField: {
      width: "100%",
      borderRadius: "5px",
      boxSizing: "border-box",
    },
    using: { textAlign: "center", color: "#0a3944", fontWeight: "bold" },
    signup:{textAlign: "center", color: "#0a3944", fontWeight: "bold" },
    submit: {
      marginTop: "24px",
      // margin: theme.spacing(4, 14, 1),
      width: "100%",
      background: "#15495d",
      borderRadius: "12px",
      boxShadow: "2px white",
      color: "white",
      "&:hover": {
        background: "#308294",
      },
    },
    fontColor: {
      color: "#122221",
    },
    google: {
      justifyContent: "center",
      width: "100%",
      borderRadius:"12px",
    },
    icons:{
      paddingLeft:"50%",
      alignContent:"center",
      color:"#0c3646",
    },


    login_body:{
          marginLeft:"32%",
          marginRight:"32%",
          marginTop:"3%",
          marginBottom:"20%",
          borderRadius: "39px",
          //background: "#ededed",
          boxShadow:" 29px 29px 58px #afafaf -29px -29px 60px #ffffff",           
         
    },
    typo:{
          alignItems:"center",
          justifyContent:"center",
          marginLeft:"-5%",
          marginRight:"2%",
          textShadow:"2px 2px #FFFFFF"
    },

    msg:{alignContent:"center"},
  }));

  const classes = useStyles();

  return (
    <div
      class="bg_image"
      style={{
        backgroundImage:"url(/img/login.jpeg)",
        backgroundSize: "fit",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundPosition: "center",
        color: "#f5f5f5",
        //opacity:'.8',
      }}
    >
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
      <div className={classes.login_body}>
      <div className={classes.icons}> <Avatar className={classes.avatar}></Avatar>
         <Typography className={classes.typo} component="h1" variant="h5">
           Sign in
         </Typography></div>
         <div className={classes.msg}>
         {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
         </div>
        
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
     
        <TextField
          className={classes.TextField}
          margin="normal"
          required
          id="email"
          
          label="Email Address"
          name="email"
          autoComplete="email"
          type="text"
          onChange={handleChangeInput}
          value={email}
        />
        <TextField
          className={classes.TextField}
          margin="normal"
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChangeInput}
          value={password}
        />
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={7}></Grid>
          <Grid item xs={5}>
            <Link href="/forgot_password" variant="body2">
              <font className="link-color">Forgot password?</font>
            </Link>
          </Grid>
        </Grid>

        <Typography align="center">
          <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            onSubmit={handleSubmit}
          >
            Sign In
          </Button>
        </Typography>
        <pre></pre>
        <pre></pre>
        <pre></pre>
        <div className={classes.using}>Or SignUp Using</div>
        <p></p>

        <Typography align="center">
          <GoogleLogin
            theme="dark"
            className={classes.google}
            clientId="129566980089-n76f07ukaj2i64bm38o5v1d8e504umjp.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Typography>
        <pre></pre>
        <pre></pre>
        <pre></pre>
        <div className={classes.using}>Else Register a New Account</div>
        <p></p>
        <div className={classes.signup}>
        <Link  href="/signup" variant="body2">
                <font className="signup">{"👉🏻 My HealthKeeper"}</font>
              </Link>
        </div>
       
      </form>
      </div>
    </div>
   
  );
}

export default Login;
