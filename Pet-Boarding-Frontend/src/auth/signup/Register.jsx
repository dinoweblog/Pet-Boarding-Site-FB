import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../api";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../notification/Notification";
const H1 = styled.h1`
  text-align: center;
  margin-top: 2%;
`;

const Img = styled.img`
  position: absolute;
  top: 18%;
  right: 34%;
  transform: scaleX(-1);
  width: 8%;
`;

const Div = styled.div`
  width: 30%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: white;
  box-sizing: border-box;
  padding: 40px;
  border-radius: 8px;
  margin-top: 30px;
  margin-bottom: 8%;
  input,
  select {
    height: 40px;
    padding-left: 15px;
    outline: none;
    border: 1px solid #dddddd;
  }
  button {
    height: 45px;
    border: none;
    background-color: #a85cf9;
    color: white;
    font-size: 17px;
    :hover {
      opacity: 0.9;
    }
  }
`;

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const userDetails = {
    name,
    email,
    password,
  };

  const handleSubmit = () => {
    setLoading(true);
    fetch(`${API_URL}/register`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.message) {
          showErrorNotification(`${res.message}`);
        } else {
          showSuccessNotification("Successfully Signup");
          Navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        showErrorNotification(err.message);
      });
  };

  return (
    <>
      <H1>Register</H1>

      <Img className="dog_img" src="logo.png" alt="" />

      <Div>
        <input
          required
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {loading ? `Register...` : "Register"}
        </button>
        <Link to="/signup/admin">Create Admin Account</Link>
      </Div>
    </>
  );
};
