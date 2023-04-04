// @src/components/Modal.jsx

import React, { useEffect, useState } from "react";
import styles from "./CSS/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getPetsData,
  petsErrorFun,
  petsLoadingFun,
} from "../Redux/Pets/action";
import styled from "styled-components";
import { API_URL } from "../api";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../notification/Notification";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  input,
  select {
    height: 33px;
    padding-left: 15px;
    outline: none;
    border: 1px solid #dddddd;
  }
  input[type="submit"] {
    height: 38px;
    border: none;
    background-color: #a85cf9;
    color: white;
    font-size: 17px;
    :hover {
      opacity: 0.9;
    }
  }

  button {
    cursor: pointer;
    font-weight: 500;
    padding: 11px 28px;
    border-radius: 12px;
    font-size: 0.8rem;
    border: none;
    color: #2c3e50;
    background: #fcfcfc;
    transition: all 0.25s ease;
    :hover {
      box-shadow: none;
      transform: none;
      background: whitesmoke;
    }
  }
`;

const Modal2 = ({ setIsOpen2, id, page }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    capacity: "",
    cost_per_day: "",
    verified: "",
    rating: "",
  });
  const { token } = useSelector((state) => state.login);
  const [pet, setPet] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      name: pet?.name,
      city: pet?.city,
      address: pet?.address,
      capacity: pet?.capacity,
      cost_per_day: pet?.cost_per_day,
      verified: pet?.verified,
      rating: pet?.rating,
    });
  }, [pet]);

  useEffect(() => {
    findData();
  }, [id]);

  const handleForm = (e) => {
    e.preventDefault();

    dispatch(petsLoadingFun());
    setLoading(true);
    fetch(`${API_URL}/listing/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
        dispatch(getPetsData(page));
        setIsOpen2(false);
        showSuccessNotification("Successfully Updated");
      })
      .catch((error) => {
        setLoading(false);
        dispatch(petsErrorFun());
        showErrorNotification(error.message);
        console.log(error);
      });
  };

  const findData = () => {
    fetch(`${API_URL}/listing/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setPet({ ...res.pet });
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div
        style={{ position: "absolute", top: 0 }}
        className={styles.darkBG}
        onClick={() => setIsOpen2(false)}
      />
      <div className={styles.centered}>
        <div className={styles.modal2}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen2(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <Form
              onSubmit={handleForm}
              onChange={handleChange}
              className="form"
            >
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
              />
              <input
                type="number"
                placeholder="Capacity"
                name="capacity"
                value={formData.capacity}
              />
              <input
                type="number"
                placeholder="Cost per day"
                name="cost_per_day"
                value={formData.cost_per_day}
              />
              <select name="verified">
                <option value="">Verified</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>

              <input
                type="number"
                placeholder="Rating"
                name="rating"
                value={formData.rating}
              />
              <input
                type="submit"
                value={loading ? `Submiting...` : `Submit`}
              />
              <button onClick={() => setIsOpen2(false)}>Cancel</button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal2;
