// @src/components/Modal.jsx

import React, { useEffect, useState } from "react";
import styles from "./CSS/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getPetsData,
  petsErrorFun,
  petsLoadingFun,
  petsSuccessFun,
} from "../Redux/Pets/action";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  box-sizing: border-box;

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

const Modal2 = ({ setIsOpen2, id }) => {
  const [one, setOne] = useState([]);
  const [name, setName] = useState(one.name);
  const [city, setCity] = useState(one.city);
  const [address, setAddress] = useState(one.address);
  const [capacity, setCapacity] = useState(one.capacity);
  const [cost_per_day, setCostPerCity] = useState(one.cost_per_day);
  const [verified, setVerified] = useState(one.verified);
  const [rating, setRating] = useState(one.rating);

  const { token } = useSelector((state) => state.login);
  const { pets } = useSelector((state) => state.pets);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSingle = () => {
    const pet = pets.filter((e) => e._id == id);
    setOne([...pet]);
  };

  useEffect(() => {
    getSingle();
  }, []);

  const dataDetails = {
    name: name,
    city: city,
    address: address,
    capacity: capacity,
    cost_per_day: cost_per_day,
    verified: verified,
    rating: rating,
  };

  const handleForm = (e) => {
    e.preventDefault();

    dispatch(petsLoadingFun());
    fetch(`https://pet-boarding-server.herokuapp.com/listing/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dataDetails),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())

      .catch((error) => dispatch(petsErrorFun()));

    navigate("/");
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen2(false)} />
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
              onSubmit={(e) => {
                handleForm(e);
              }}
            >
              <input
                type="text"
                placeholder="Name"
                name=""
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="City"
                name="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Address"
                name=""
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Capacity"
                name=""
                value={capacity}
                onChange={(e) => {
                  setCapacity(e.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Cost per day"
                name=""
                value={cost_per_day}
                onChange={(e) => {
                  setCostPerCity(e.target.value);
                }}
              />
              <select
                name=""
                id=""
                onChange={(e) => {
                  setVerified(e.target.value);
                }}
              >
                <option value="">Verified</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>

              <input
                type="number"
                placeholder="Rating"
                name=""
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                }}
              />
              <input type="submit" />
              <button onClick={() => setIsOpen2(false)}>Cancel</button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal2;
