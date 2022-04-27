import { useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import {
  usersPetsErrorFun,
  usersPetsLoadingFun,
  usersPetsSuccessFun,
} from "../Redux/UsersPets/action";
import { useNavigate } from "react-router-dom";

const H2 = styled.h2`
  text-align: center;
`;
const Div = styled.div`
  width: 38%;
  padding: 3%;
  box-sizing: border-box;
  background-color: white;
  border-radius: 8px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    input {
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
  }
`;

export const CreatePets = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [pet_type, setPet_type] = useState("");
  const [weight, setWeight] = useState("");
  const [no_of_pets, setNo_of_pets] = useState("");
  const [no_of_days, setNo_of_days] = useState("");

  const { token, userId } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataDetails = {
    name,
    city,
    address,
    mobile,
    pet_type,
    weight,
    no_of_pets,
    no_of_days,
    user_id: userId,
  };

  const handleForm = (e) => {
    e.preventDefault();

    dispatch(usersPetsLoadingFun());
    fetch(`https://pet-boarding-server.herokuapp.com/pets/create`, {
      method: "POST",
      body: JSON.stringify(dataDetails),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/users/successfull");
        dispatch(usersPetsSuccessFun(res));
      })
      .catch((error) => dispatch(usersPetsErrorFun()));
  };

  return (
    <div>
      <Navbar />
      <H2>Booking Input</H2>
      <Div>
        <form
          onSubmit={(e) => {
            handleForm(e);
          }}
          className="form"
        >
          <input
            required
            type="text"
            placeholder="Name"
            name=""
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="City"
            name="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Address"
            name=""
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          <input
            required
            type="number"
            placeholder="Mobile"
            name=""
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Pet type"
            name=""
            value={pet_type}
            onChange={(e) => {
              setPet_type(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Pet Size"
            name=""
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
          <input
            required
            type="number"
            placeholder="No of pets"
            name=""
            value={no_of_pets}
            onChange={(e) => {
              setNo_of_pets(e.target.value);
            }}
          />

          <input
            required
            type="text"
            placeholder="No of days"
            name=""
            value={no_of_days}
            onChange={(e) => {
              setNo_of_days(e.target.value);
            }}
          />

          <input type="submit" />
        </form>
      </Div>
      <Footer />
    </div>
  );
};
