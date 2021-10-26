import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/spAddNotes.css";
import { useSelector } from "react-redux";
import { Button, Grid, TextareaAutosize, TextField } from "@material-ui/core";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useHistory } from "react-router-dom";
import SpecializedHealthInfo from "./specializedHealthInfo";
import axios from "axios";
const initialState = {
  folder: "",
  noteDate: "",
  description: "",
  success: "",
  err: "",
};
export default function AddNotes(props) {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  let history = useHistory();

  const [notes, setNotes] = useState(initialState);
  const [multipleFiles, setMultipleFiles] = useState("");
  const [multipleProgress, setMultipleProgress] = useState(0);

  const { folder, noteDate, description, success, err } = notes;
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNotes({ ...notes, [name]: value, err: "", success: "" });
  };
  const [spHealthNotes, setSpHealthNotes] = useState([]);

  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };

  const UploadMultipleFiles = async () => {
    const id = user._id;

    const formData = new FormData();
    formData.append("user", id);
    formData.append("folder", folder);
    formData.append("noteDate", noteDate);
    formData.append("description", description);
    console.log(formData);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }

    console.log("addnotes ", id);
    const res = await axios
      .post(
        "http://localhost:5000/api/save-specialized-health-info",
        formData,
        mulitpleFileOptions,
        {
          headers: { Authorization: token, userid: id },
        }
      )
      .then((ans) => {
        if (ans.data.msg == "This folder already exists") {
          setNotes({
            ...notes,
            err: ans.data.msg,
            success: "",
          });
        } else {
          setNotes({
            ...notes,
            err: "",
            success: ans.data.msg,
          });

          history.push("/specialized-health-information");
          console.log("SpecializedHealthInfo.showSPHealthNotes();");
          // showSPHealthNotes()
          props.getNote();
          setTimeout(function () {
            setNotes(initialState);
          }, 4000);
        }
      })
      .catch((err) => {
        err.data && setNotes({ ...notes, err: err.data, success: "" });
      });
  };

  return (
    <div>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <div className="form-group">
        <Grid className="info-save" container spacing={2} alignItems="center">
          <Grid className="info_header" item xs={12}>
            <h2>Save Your Information Here !!!</h2>
          </Grid>
          <Grid item xs={5}>
            <pre></pre>
            <h6>Folder Name</h6>
            <TextField
              fullWidth
              type="text"
              id="folder"
              name="folder"
              // placeholder="Folder Name"
              onChange={handleChangeInput}
              value={folder}
            />
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={5}>
            <pre></pre>
            <h6>Select Date</h6>
            <TextField
              fullWidth
              type="date"
              id="noteDate"
              name="noteDate"
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleChangeInput}
              value={noteDate}
            />
          </Grid>

          <Grid className="addNotes_textArea" item xs={9}>
            <pre></pre>

            <h6>Your Notes</h6>
            <TextareaAutosize
              className="description"
              variant="outlined"
             style={{ backgroundColor:'transparent'}}
              rows="3"
              type="text"
              id="description"
              name="description"
              placeholder="Note down your problems..."
              onChange={handleChangeInput}
              value={description}
            />
          </Grid>

          <Grid item xs={6}>
            <div className="form-group">
              <pre></pre>
              <h6>Upload your Reports</h6>
              <input
                type="file"
                onChange={(e) => MultipleFileChange(e)}
                className="form-control"
                multiple
              />
            </div>
          </Grid>
          <Grid item xs={1}>
            &nbsp; <pre></pre>
            <div style={{ width: 50, height: 50 }}>
              <CircularProgressbar
                value={multipleProgress}
                text={`${multipleProgress}%`}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: `rgba(233, 175, 15, ${multipleProgress / 100})`,
                  textColor: "#000000",
                  trailColor: "rgb(233, 175, 15)",
                  backgroundColor: "#8fce00",
                })}
              />
            </div>
          </Grid>
          {/* <Grid item xs={5}></Grid> */}
             <Grid
            item
            xs={11}
            style={{ display: "flex", justifyContent: "center" }}
          >
                      

            <div className="sp_reminder_buttons">
              <Button type="button" onClick={UploadMultipleFiles}>
                <font className="sidebar-options-color">save</font>
              </Button>
            </div>
          </Grid>
          {/* <Grid item xs={1.5}>
          update  
          <Button type="button" variant="contained" onClick={ UploadMultipleFiles} color="primary">
            update
          </Button>
        </Grid> */}
          <Grid item xs={12}></Grid>
        </Grid>
      </div>
    </div>
  );
}
