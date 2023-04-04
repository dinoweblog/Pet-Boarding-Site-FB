// @src/components/Modal.jsx

import React from "react";
import styles from "./CSS/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { API_URL } from "../api";
import {
  getPetsData,
  petsErrorFun,
  petsLoadingFun,
} from "../Redux/Pets/action";
import { useDispatch, useSelector } from "react-redux";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../notification/Notification";

const Modal = ({ setIsOpen, id, page }) => {
  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  console.log(page, id);

  // Delete and Edit network request
  const deleteData = () => {
    dispatch(petsLoadingFun());
    fetch(`${API_URL}/listing/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        showSuccessNotification("Successfully Deleted");
        dispatch(getPetsData(page));
      })
      .catch((error) => {
        showErrorNotification(error.message);
      });
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            Are you sure you want to delete the item?
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  setIsOpen(false);
                  deleteData();
                }}
              >
                Delete
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
