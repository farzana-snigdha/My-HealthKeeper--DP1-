import React, { useState, useRef, useEffect, useCallback } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";

const EditNotesModal = ({
  showEditModal,
  setShowEditModal,
  getNote,
  getID,
  showSPHealthNotes,
  getFolder,
}) => {
  const token = useSelector((state) => state.token);

  const closeEditModal = () => {
    setShowEditModal(false);
  };
  const [description, setDesc] = useState("");
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDesc(value);
  };
  const updateDesc = async (e, folderId) => {
    e.preventDefault();
    console.log("folderId ", folderId);
    await axios
      .patch(
        "http://localhost:5000/api/updateSpecializedHealthInfo/" + folderId,
        { description },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        showSPHealthNotes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div style={{backgroundColor:'#b8d2ad'}}>
      <Modal
      
        size="lg"
        // style={{backgroundColor:'#b8d2ad'}}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showEditModal}
        onHide={closeEditModal}
      >
        <Modal.Header>
          <Modal.Title>
            <h4>
              {" "}
              <FolderSpecialIcon /> &nbsp;
              {getFolder}
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Edit Your Notes</h5>
          <textarea
            type="text"
            rows="4"
            //   placeholder={getNote}
            className="editTextBox"
            onChange={handleChangeInput}
            value={description}
          >
            {getNote}
          </textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => {
              updateDesc(e, getID);
              closeEditModal();
            }}
          >
            Save
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={() => {
              closeEditModal();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditNotesModal;
