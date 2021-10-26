import React, { useState } from "react";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import { IconButton, CardContent, CardActions } from "@material-ui/core";
import EditNotesModal from "./EditNotesModal";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import "../../../static/Styling/spHealthInfo.css";

const useStyles = makeStyles((theme) => ({
  expand: {
    // transform: "rotate(0deg)",
    // marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function ViewFolderProps(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const openSpEditModal = () => setShowEditModal(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setVisible((prev) => !prev);
  };
  console.log(visible);
  const classes = useStyles();

  return (
    <div variant="outlined" className="sp_reminder_card">
      <div className="folder_name">
        <h3 className="folderName">
          <b>{props.note.folder}</b>
        </h3>
 
        <div className="noteDates">
          Created at: {props.note.noteDate.substring(0, 10)}
        </div>
      </div>
<pre></pre>
<pre></pre><pre></pre>
      <CardActions className="clrCardAction">
       
<div >
        <IconButton
          component={Link}
          to={{
            state: props.note,
            pathname: "/view-files",
          }}
          className="viewBtn"
          data-toggle="tooltip"
          title="View Attached Files"
        >
          <VisibilityIcon />
        
        </IconButton>
        <br></br>
        View Details
        </div>
<div>
        <IconButton
          className="viewBtn"
          data-toggle="tooltip"
          title="Delete this Folder"
          onClick={() => props.deleteFolder()}
        >
          <DeleteIcon />
        </IconButton>
        <br></br>
        Delete folder
        </div>
      </CardActions>
      <EditNotesModal
        key={props.note.folder}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        getNote={props.note.description}
        getID={props.note._id}
        showSPHealthNotes={props.showSPHealthNotes}
        getFolder={props.note.folder}
      />
    </div>
  );
}
