import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import colors from '../../../static/Styling/colors.css'
import {
  Link,
  Grid,
  Typography,
  FormControl,
  Select,
  Container,
  InputLabel,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Toolbar
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'
import Header from '../../header/Header'
require("dotenv").config();
const URL = process.env.URL;


const initialState = {
    name: '',
    email: '',
    password: '',
    re_password: '',
    gender:'',
    phone:'',
    err: '',
    success: ''
}

function Signup() {
  const [user, setUser] = useState(initialState)

  const {name, email, password,re_password, gender,phone,err, success} = user

  const handleChangeInput = e => {
      const {name, value} = e.target
      setUser({...user, [name]:value, err: '', success: ''})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        
        if(!isMatch(password, re_password))
            return setUser({...user, err: "Password did not match.", success: ''})

        try {
            const res = await axios.post('http://localhost:5000/user/signup', {
                name, email, password,gender,phone
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
  };

  

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    formControl: {
      minWidth: 130,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },

    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "#232327",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      background: "#232327",
      color: "white",
      "&:hover": {
        background: "#122221",
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
        <Container component="main" maxWidth="xs">
      {/* <Header /> */}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        <form onSubmit={handleSubmit}>
          <div className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChangeInput}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  name="name"
                  autoComplete="name"
                  onChange={handleChangeInput}
                  value={name}
                />
              </Grid>

              <Grid item xs={5}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    id="gender"
                    name="gender"
                    required
                    onChange={handleChangeInput}
                    value={gender}
                    label="Gender"
                  >
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Others"}>Others</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  variant="outlined"
                  
                  fullWidth
                  id="phone"
                  label="Contact Number"
                  name="phone"
                  autoComplete="phone"
                  onChange={handleChangeInput}
                  value={phone}
                />
              </Grid>

              <Grid item xs={12}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
         
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2"><font  className="link-color" >
                  Already have an account? Sign in
                  </font>
                </Link>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </Container>
 
    </div>
 );
}

export default Signup;
