import React, { useState, useEffect, useContext, useRef } from "react";
import "../../../static/Styling/spViewFiles.css";
import { useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ModalImage from "react-modal-image";
import LazyLoad from "react-lazyload";
import { Button, Grid, Link, TextareaAutosize } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PdfView from "./pdfView";
import Modal from "react-bootstrap/Modal";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { UserIDContext } from "../../../App";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";

const useStyles = makeStyles({
  root: {
    maxWidth: "100mvh",
    maxHeight: "100mvh",
  },
  media: {
    resizeMode: "contain",
    height: 225,
    width: 190,
  },
});

export default function AddFiles() {
  // const inputRef = useRef(null);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const userID = useContext(UserIDContext);

  const [mediaFiles, setMediaFiles] = useState([]);
  const [description, setDesc] = useState("");
  const { state } = useLocation();
  const [spHealthNotes, setSpHealthNotes] = useState([]);
  let history = useHistory();
  const showMediaFiles = async (state) => {
    await axios
      .get("http://localhost:5000/api/getFolderItems", {
        headers: { Authorization: token, folderid: state._id },
      })
      .then((res) => {
        console.log("    hghytcfh    ", res.data.description);

        // setDesc(res.data.description);
        setMediaFiles(res.data);
      });
  };
  const showSPHealthNotes = async () => {
    let spID = localStorage.getItem("userID");

    console.log("sp id     ", spID);
    await axios
      .get("http://localhost:5000/api/get-specializedHealthInfo", {
        headers: { Authorization: token, userid: userID },
      })
      .then((res) => {
        // console.log(res.data);
        // history.push("/view-files");
        setSpHealthNotes(res.data);
      });
  };

  const [multipleFiles, setMultipleFiles] = useState("");
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };
  let descrip = state.description;
  const folderName = state.folder;
  const fileLength = state.numberOfFiles;

  useEffect(async () => {
    showMediaFiles(state);
  }, []);

  const updateFiles = async () => {
    const formData = new FormData();
    console.log("swdxs", state.folder);
    updateDesc(state._id);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await axios
      .put("http://localhost:5000/api/updateMediaFiles", formData, {
        headers: { Authorization: token, folder: folderName },
      })
      .then((result) => {
        // history.push("/view-files");
        showMediaFiles(state);
        setMultipleFiles("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFile = async (filepath) => {
    await axios
      .delete("http://localhost:5000/api/deleteFiles/" + state.folder, {
        headers: { Authorization: token, filepath: filepath },
      })
      .then(showMediaFiles(state))
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDesc = async (e) => {
    e.preventDefault();
    setDesc(e.target.value);
  };
  const updateDesc = async (folderId) => {
    // e.preventDefault();
    // const description=e.target.value
    let jj;
    if (description.length > 0) {
      jj = description;
    } else {
      jj = descrip;
    }
    console.log("sddd ", jj);
    console.log("folderId ", folderId);
    await axios
      .patch(
        "http://localhost:5000/api/updateSpecializedHealthInfo/" + folderId,
        { jj },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        descrip = state.description;
        showSPHealthNotes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        class="bg_image"
        style={{
          backgroundImage: "url(/img/sp9.jpg)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50vh",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            maxWidth: 1900,
            padding: 0,
            marginRight: 0,
          }}
        >
          <div style={{ backgroundColor: "black", color: "black" }}>
            {ShowHeader(COLORS.spHealthBackground)}
          </div>
          <pre></pre>
          <pre></pre> <pre></pre> <pre></pre>
          <Row className="body_feature_row">
            <Col
              style={{
                // marginLeft: 150,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="sp_header_content"></div>
              <div className="description_section">
                <div>
                  {/* <img src="../../../static/images/quote.png"/> */}
                  <h2
                    align="center"
                    style={{
                      color: "rgb(46, 47, 65)",
                      textShadow: "2px 2px #d1b66c",
                    }}
                  >
                    &nbsp; {folderName}
                  </h2>{" "}
                </div>
              </div>
              <Container>
                <Row>
                  <Col item xs={6} style={{ paddingLeft: "20%" }}>
                    <div className="notes">
                      <p style={{ fontWeight: 400, fontSize: 17 }}>{descrip}</p>
                    </div>
                  </Col>
                  <Col item xs={6} style={{ paddingRight: "20%" }}>
                    <div>
                      <TextareaAutosize
                        className="notes_edit"
                        // label={descriptions}
                        id="description"
                        defaultValue={descrip}
                        value={description}
                        onChange={handleDesc}
                        type="text"
                        placeholder={
                          "Type to change your notes. Remember your previous notes will be replaced with existing notes. "
                        }
                        // rows='4'
                        name="description"
                      >
                        {/* {state.description} */}
                      </TextareaAutosize>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col item xs={12} style={{ paddingLeft: "20%" ,marginTop:'3%'}}>
                    <div className="viewFiles_Btn">
                      <input
                        type="file"
                        onChange={(e) => {
                          MultipleFileChange(e);
                        }}
                        multiple
                      ></input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col
                    item
                    xs={12}
                    style={{ paddingLeft: "74%", paddingRight: 0 }}
                  >
                    <div className="viewFiles_Btn">
                      <Button
                        className="viewFiles_addBtn"
                        onClick={updateFiles}
                        multiple
                      >
                        <h5>
                          <b>Save&nbsp;</b>
                        </h5>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Container>
<hr style={{color:'#d1b66c'}}></hr>
             
              <div className="description_section" style={{marginBottom:'2%'}}>
              <div className="sp_file_add_body_image"></div>
                <div style={{paddingTop:'5%'}}>
                  {/* <img src="../../../static/images/quote.png"/> */}
                  <h2
                    align="center"
                    style={{
                      color: "rgb(46, 47, 65)",
                      textShadow: "2px 2px #d1b66c",
                    }}
                  >
                   All of your Files
                  </h2>{" "}
                </div>
              </div>

              <pre></pre>
              {fileLength == 0 ? (
                <div style={{ minHeight: "600px" }}>
                  <h3 align="center" >
                    <pre></pre>Save your files for future reference
                  </h3>
                </div>
              ) : (
                <div style={{ minHeight: "600px",marginLeft:120 }}>
                  <Grid container spacing={1} direction="row">
                    {mediaFiles.map((element) => (
                      <div>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={3}
                          key={mediaFiles.indexOf(element)}
                        >
                          <div className="media_card">
                            {element.fileType != "application/pdf" ? (
                              <LazyLoad
                                className="lazyload"
                                key={element.fileName}
                              >
                                <ModalImage
                                  className={classes.media}
                                  small={`http://localhost:5000/${element.filePath}`}
                                  large={`http://localhost:5000/${element.filePath}`}
                                  alt={element.fileName}
                                  hideDownload={false}
                                  hideZoom={false}
                                />
                                <h7>
                                  <b>Name:</b> {element.fileName}
                                </h7>
                                <div className="media_file_delete">
                                  <Button
                                    className="media_file_delete_sub"
                                    onClick={() => {
                                      deleteFile(element.filePath);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </div>
                              </LazyLoad>
                            ) : (
                              <div
                                className="pdf"
                                onClick={(e) => {
                                  window.open(
                                    `http://localhost:5000/${element.filePath}`,
                                    "_blank"
                                  );
                                }}
                              >
                                <LazyLoad
                                  className="lazyload"
                                  key={element.fileName}
                                >
                                  <PdfView getFilePath={element.filePath} />
                                  <pre></pre>
                                  <h7>
                                    <b>Name:</b> {element.fileName}
                                  </h7>
                                  <div className="media_file_delete">
                                    <Button
                                      className="media_file_delete_sub"
                                      onClick={() => {
                                        deleteFile(element.filePath);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  </div>
                                </LazyLoad>
                              </div>
                            )}
                          </div>
                        </Grid>
                      </div>
                    ))}
                  </Grid>
                </div>
              )}
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
    </div>
  );
}
