import React, { useState } from "react";
import { Grid, Button, Select, MenuItem, makeStyles, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import "../../../static/Styling/diseasePrediction.css";
import "../../../static/Styling/dp.css"
import { getSymptomsList } from "./SymptomsList";
import axios from "axios";
import Prediction from "./Prediction";
import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";
import ShowHospitalList from './HospitalList'
import DeleteIcon from "@material-ui/icons/Delete";
import * as ReactBootStrap from 'react-bootstrap';
import { RiHeartAddFill } from 'react-icons/ri';
import { GiClick } from 'react-icons/gi';
import { AiOutlineFundView } from 'react-icons/ai';
//import {MdAdsClick} from '@react-icons/ai'
import { MdAddTask } from "react-icons/md";


// import AddTaskIcon from '@mui/icons-material/AddTask';
// import BeenhereIcon from '@mui/icons-material/Beenhere';
// import ListAltIcon from '@mui/icons-material/ListAlt';

const initialState = {
  s1: "",
  s2: "",
  s3: "",
  s4: "",
  s5: "",
};
const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    margin: theme.spacing(2),
    minWidth: 320,
    color: "#522d58",
    fontSize: 17,
    fontWeight: 550,
  },
}));

export default function SymptomSelection() {
  const token = useSelector((state) => state.token);
  let arr = getSymptomsList();
  const [symptom, setSymptom] = useState(initialState);
  const [disease, setDisease] = useState([]);
  const [percentage, setPercentage] = useState("");
  const [doctor, setDoctor] = useState("");
  const { s1, s2, s3, s4, s5 } = symptom;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSymptom({ ...symptom, [name]: value });
  };

  const [result,setResult]=useState(false)
  const [hotline,setHotline]=useState(false)
  const [loading,setLoading] = useState(true);

  const symptomList = () => {
    let a = [];
    for (let i = 0; i < arr.length; i++) {
      a.push(<MenuItem value={arr[i]}>{arr[i]}</MenuItem>);
    }
    return a;
  };

  const classes = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false)
    await axios
      .get(
        "http://localhost:5000/disease-prediction",

        {
          headers: {
            Authorization: token,
            s1: s1,
            s2: s2,
            s3: s3,
            s4: s4,
            s5: s5,
          },
        }
      )
      .then((res) => {
        setDisease(res.data.diseaseName);
        setDoctor(res.data.diseaseSpecialist);
        setPercentage(res.data.diseasePercenatge);
        setResult(true)
        setLoading(true)
        console.log("disease", res.data.diseaseSpecialist);
      });
  };

  return (
    <>
      <div
        className="reminder"
        style={{
          backgroundImage: "url(/img/disease1.jpg)",
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
          <pre></pre>
          <Row className="body_feature_row">
            <Col style={{ display: "flex", flexDirection: "column" }}>
              {" "}
              &nbsp;
              <div className="disease_header_content">
                <pre></pre> 
                {/* <h1>
                  {" "}
                  Identify possible conditions and treatments<br></br> based on
                  your symptoms
                </h1> */}
              </div>
              <div className="description_section_dp">
                <p>Identify possible conditions and treatments<br></br> based on
                  your symptoms</p>
              </div>
              <div className="steps_section">
                <div className="steps_section_body">
                  <div className="steps_section_item">
                    <div className="steps_item_icon"> <IconButton> <RiHeartAddFill style= {{color : "#dadfe6", fontSize : "8rem" }}/> </IconButton> </div>
                    <div className="steps_item_info">Add your symptoms<br></br> from the list</div>
                  </div>
                  <div className="steps_section_item">
                    <div className="steps_item_icon"> <IconButton><MdAddTask style= {{color : "#dadfe6", fontSize : "8rem" }}/></IconButton></div>
                    <div className="steps_item_info"> Click the button</div>
                  </div>
                  <div className="steps_section_item">
                    <div className="steps_item_icon"> <IconButton><AiOutlineFundView style= {{color : "#dadfe6", fontSize : "8rem" }}/></IconButton></div>
                    <div className="steps_item_info">View he probable <br></br> diseases</div>
                  </div>
                </div>
              </div>
              <div className="symptom_list_body">
                {/* <div className="disease_overlay"></div> */}
                
                <div className="disease_main">
                  <div className="symptoms_body">
                    <h3 style={{color:'#412146'}}>         Select Your Symptoms</h3>
                    <br></br>
                    <div className="symptom">
                      Symptom 1 :
                      <Select
                        id="s1"
                        name="s1"
                        value={s1}
                        onChange={handleChangeInput}
                        // displayEmpty
                        className={classes.selectEmpty}
                      >
                        {symptomList()}
                      </Select>
                    </div>
                    <div className="symptom">
                      Symptom 2 : 
                      
                      <Select
                        id="s2"
                        name="s2"
                        value={s2}
                        onChange={handleChangeInput}
                        // displayEmpty
                        className={classes.selectEmpty}
                      >
                        {symptomList()}
                      </Select>
                    </div>
                    <div className="symptom">
                      Symptom 3 : 
                      
                      <Select
                        id="s3"
                        name="s3"
                        value={s3}
                        onChange={handleChangeInput}
                        // displayEmpty
                        className={classes.selectEmpty}
                      >
                        {symptomList()}
                      </Select>
                    </div>
                    <div className="symptom">
                      Symptom 4 :
                      
                      <Select
                        id="s4"
                        name="s4"
                        value={s4}
                        onChange={handleChangeInput}
                        // displayEmpty
                        className={classes.selectEmpty}
                      >
                        {symptomList()}
                      </Select>
                    </div>
                    <div className="symptom">
                      Symptom 5 :
                      
                      <Select
                        id="s5"
                        name="s5"
                        value={s5}
                        onChange={handleChangeInput}
                        // displayEmpty
                        className={classes.selectEmpty}
                      >
                        {symptomList()}
                      </Select>
                    </div>
                    <div className="predict_button">
                      <Button onClick={handleSubmit} className="predict">
                        Predict
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prediction_body">
                {/* {result ?( <Prediction
                  getPrediction={disease}
                  percent={percentage}
                  specialist={doctor}
                />):('')} */}

                <div>
                  {loading ? (<>{result ?( <Prediction
                  getPrediction={disease}
                  percent={percentage}
                  specialist={doctor}
                />):('')} </>): ( <div>
                  <ReactBootStrap.Spinner style={{height:50, width:50}} animation="border" variant="primary" />
                  </div>)}
 
                </div>
               
              </div>
              <div className="hotline_section">
                <div style={{minHeight:200}} className="disease_main" >
                  <Button variant='text' className="hotline_number" onClick={()=>{setHotline(true)}} >Show Hotline Numbers</Button>
                  <br></br>         
                </div>
                {hotline?(<div>{ShowHospitalList()}</div>):("")}
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
            >   <pre></pre>
            <pre></pre>
            <pre></pre>
              {ShowFeatureButtons()}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}