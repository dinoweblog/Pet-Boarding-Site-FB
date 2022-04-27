import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  loginAuthenticated,
  loginError,
  loginLoading,
  loginSuccess,
} from "../Redux/Login/action";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import cat from "../images/logo.png";

const MainDiv = styled.div``;
const H1 = styled.h1`
  text-align: center;
`;
const Img = styled.img`
  position: absolute;
  top: 17%;
  right: 34%;
  transform: scaleX(-1);
  width: 8%;
`;
const Nav = styled.div`
  .nav {
    border-bottom: 1px solid gray;
  }
`;
const Div = styled.div`
  width: 30%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: white;
  box-sizing: border-box;
  padding: 2%;
  border-radius: 8px;
  margin-top: 30px;
  margin-bottom: 19%;
  input {
    height: 33px;
    padding-left: 15px;
    outline: none;
    border: 1px solid #dddddd;
  }
  button {
    height: 38px;
    border: none;
    background-color: #a85cf9;
    color: white;
    font-size: 17px;
    :hover {
      opacity: 0.9;
    }
  }
`;

export const Login = () => {
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = () => {
    const userDetails = {
      email,
      password,
    };

    dispatch(loginLoading());
    fetch(`https://pet-boarding-server.herokuapp.com/login`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(
          loginSuccess({
            token: res.token,
            roles: res.user.roles,
            user: res.user,
            userId: res.user._id,
          })
        );
        dispatch(loginAuthenticated("true"));
        navigate("/");
        if (res.token != undefined) {
          dispatch(loginAuthenticated("true"));
          navigate("/");
        } else {
          dispatch(loginAuthenticated("false"));
          navigate("/");
        }
      })
      .catch((error) => dispatch(loginError()));
  };

  return (
    <MainDiv>
      <Nav>
        <Navbar />
      </Nav>
      <H1>Login</H1>
      <Img className="dog_img" src={cat} alt="" />
      <Div>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Login
        </button>
      </Div>
      <Footer />
    </MainDiv>
  );
};
