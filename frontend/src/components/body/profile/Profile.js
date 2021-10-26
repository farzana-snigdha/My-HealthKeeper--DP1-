import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import profile from "../../../static/Styling/profile.css";

import {
  Select,
  makeStyles,
  Button,
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  
} from "@material-ui/core";
import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from '../../../static/Styling/featureButton.css'
import { COLORS } from "../../themeColors";


const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { state } = useLocation();
  const { user } = auth;
  const [data, setData] = useState(initialState);
  const { name, phone, gender, height, bloodGrp, err, success } = data;

  const [avatar, setAvatar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const showAvatar = async (state) => {
    await axios
      .get("http://localhost:5000/user/get_profile_image", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setAvatar(res.data);
      });
  };
  const showPaymentStatus=async(state)=>{
await axios
.get("http://localhost:5000/user/user_payment_status", {
  headers: { Authorization: token },
})
.then((res) => {
  console.log(res.data)
setIsPaid(res.data)
});
  }

  useEffect(async () => {
    showAvatar(state);
    showPaymentStatus(state)
  }, []);

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      console.log("sxsxdasxds ", formData);
      const res = await axios.post(
        "http://localhost:5000/user/set_profile_image",
        formData,
        {
          headers: { Authorization: token },
        }
      );

      setLoading(false);
      showAvatar();
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  const updateInfor = () => {
    try {
      axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          gender: gender ? gender : user.gender,
          phone: phone ? phone : user.phone,
          height: height ? height : user.height,
          bloodGrp: bloodGrp ? bloodGrp : user.bloodGrp,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (name || avatar || phone || gender || bloodGrp || height) updateInfor();
    // console.log(gender)
  };

  const onHandleCheckout = async () => {
    // setLoading(true);

    const id = user._id;
    const phone = user.phone;
    const name = user.name;
    const res = await axios.post(
      "http://localhost:5000/payment",
      {},
      {
        headers: {
          Authorization: token,
          userid: id,
          phone: phone,
          userName: name,
        },
      }
    );

    console.log(res.data);
    if (res.data?.length > 30) {
      window.location.replace(res.data);
    } else {
      alert("Payment failed"); // eslint-disable-line no-alert
    }
  };
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 200,
      background: "white",
    },
    position: {
      paddingTop: "25%",
    },
    button: {
      paddingTop: "8%",
      paddingLeft: "33%",
    },
    root: {
      border: `2px solid rgb(9 171 171)`,
      // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    buttonCLr: {
      // width: '20%',
      backgroundColor: "#063742",
      color: "white",
      // display: 'inline',
      paddingTop: "8%",
      paddingLeft: "33%",
    },
    emailField:{
      fontWeight:'bold'
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div
        class="bg_image"
        style={{
          backgroundImage: "url(/img/profile.jpg)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50vh",
        }}
      >
      <Container className='body_container' style={{display: 'flex', flexDirection: 'column' ,margin:0,maxWidth:1900,padding:0,marginRight:0}} >
    <div >{ShowHeader(COLORS.profileBackground)}</div>
    
    
     <pre></pre> <pre></pre> <pre></pre>
    <pre></pre>
    <Row className='body_feature_row' >
     
      <Col style={{ display: 'flex', flexDirection: 'column'}}>
      <div className="sp_header_content">
                 {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          {loading && <h3>Loading.....</h3>}
        </div>
        <div className="card_body_profile " >
          {
            <Card className="profile_root" >
              <div className="profile_div" >
                <CardContent className="profile_content"  >
                  <div
                    className="profile_image_div"
                    onMouseOver={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <img
                      className="profile_image"
                      src={`http://localhost:5000/${avatar.filePath}`}
                      alt="img"
                    />
                    <div></div>
                    {isHovered && (
                      <>
                        <h6 align="center"> Change Profile Image</h6>
                        <input
                          type="file"
                          className="form-control"
                          name="file"
                          id="file_up"
                          onChange={changeAvatar}
                        />
                      </>
                    )}
                  </div>
                  {loading && <h3>Loading.....</h3>}
                  <div className="profile_input">
                    <label className="profile_label" htmlFor="name">
                      Name
                    </label>{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={user.name}
                      placeholder="Your name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="profile_input">
                    <label className="profile_label" htmlFor="email">
                      Email
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
className={classes.emailField}                      type="email"
                      name="email"
                      id="email"
                      defaultValue={user.email}
                      placeholder="Your email address"
                      disabled
                      
                    />
                  </div>
                  <div className="profile_input">
                    <label className="profile_label" htmlFor="phone">
                      Phone
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                      type="text"
                      name="phone"
                      id="phone"
                      defaultValue={user.phone}
                      placeholder="Contact Number"
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </div>
            </Card>
          }
          {
            <Card className="profile_root" >
              <div className="profile_div" >
                <CardContent className="profile_content" >
                  <Grid className="grid_profile">
                    <Card className="card_grid_profile">
                      <CardContent className="card_content_grid_profile" >
                        <h5 align="center">
                          <b>UPGRADE TO PREMIUM</b>
                        </h5>
                        Get SMS alert for Daily Medicines for just 100bdt per
                        month
                        <pre></pre> <pre></pre>
                        <h6>
                          {" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <b>SMS Alert Activated&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>{isPaid? "🟢":"🔴"}
                        </h6>
                        
                        <div className="profile_upgrade_btn">
                        &nbsp;&nbsp; &nbsp;  <Button align='center' variant="text" onClick={onHandleCheckout}>
                            UPGRADE
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="card_grid_profile">
                      <CardContent className="card_content_grid_profile">
                        <h7><b>PERSONAL INFORMATION</b></h7>
                        <pre></pre>
                        <div className="grid_profile_input">
              <label className="grid_profile_label">Gender  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <Select
                className={classes.formControl}
                type="text"
                id="gender"
                name="gender"
                onChange={handleChange}
                defaultValue={user.gender}
                value={gender}
                padding="10px"
                label="Gender"
              >
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Others"}>Others</option>
              </Select>
            </div>

            <div className="grid_profile_input">
                    <label className="grid_profile_label" htmlFor="name">
                    Blood Group
                    </label>{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                      type="text"
                      name="bloodGrp"
                      id="bloodGrp"
                      defaultValue={user.bloodGrp}
                      placeholder="Your Blood Group"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid_profile_input">
                    <label className="grid_profile_label" htmlFor="email">
                    Height
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                      type="text"
                      name="height"
                      id="height"
                      defaultValue={user.height}
                      placeholder="Your Height"
                      onChange={handleChange}
                    />
                  </div>
                
                      </CardContent>
                    </Card>
                  </Grid>
                </CardContent>
              </div>
            </Card>
          }
        </div>
        <div className="profile_save_btn">
        <Button varient="text" onClick={handleUpdate}>
        &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;     save
              </Button>
        </div>
        </Col>
        <Col className='body_feature_column' style={{ position:'fixed' }} sm={2}>
      <pre></pre>
    <pre></pre>
        {ShowFeatureButtons()}</Col>
    </Row>
  </Container>
      </div>

   
    </>
  );
}

export default Profile;
