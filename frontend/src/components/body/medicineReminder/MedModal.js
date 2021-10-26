import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../../static/Styling/medicineReminder.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { Button, IconButton, Link } from "@material-ui/core";
//import Modal from 'react-modal';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 30%;
  height: 40%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  border-radius: 10px;
  padding: 20px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const MedModal = ({ showModal, setShowModal, list }) => {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  // const [disable, setDisable] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // const [idDose, setIdDose] = useState();
  const [doseId, setDoseId] = useState(null);
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const missedConfirm = async (id) => {
    await axios
      .post("http://localhost:5000/medDose/" + id, {
        headers: { Authorization: token, userId: user._id },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Confirm</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((doses) => (
                    <tr>
                      <td>{doses.meddate.substring(0, 10)}</td>
                      <td>{doses.medtime}</td>
                      <td>Missed</td>

                      {/* <td><Button onClick={()=> {missedConfirm(doses._id)}}>Confirm</Button></td> */}
                      <td>
                        <Button
                          onClick={() => {
                            setShowAlert(true);
                            setDoseId(doses._id);
                            console.log("modal1 enter"+doses._id);
                          }}
                        >
                          Confirm
                        </Button>
                        
                      </td>
                    </tr>
                    
                  ))}
                </tbody>
              </table>
            </ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}

<Modal
                          open={showAlert}
                          onClose={() => setShowAlert(false)}
                          center

                          classNames={{
                            overlay: "customOverlay",
                            modal: "customModal",
                          }}
                          style={{zIndex : 1040, position : "none"}}
                        >
                          <div>
                            <p>
                              Are you sure want to confirm this missed medicine?
                            </p>
                            <Button
                              onClick={() => {
                                // console.log("modal2 enter"+doses._id);
                                missedConfirm(doseId);
                                // console.log("modal2 exit"+doses._id);
                                setShowAlert(false);
                              }}
                            >
                              Yes
                            </Button>
                            <Button onClick={() => setShowAlert(false)}>
                              No
                            </Button>
                          </div>
                        </Modal>
    </>
  );
};

export default MedModal;