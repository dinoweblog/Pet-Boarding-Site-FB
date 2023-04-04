import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginAuthenticated, loginSuccess } from "../../Redux/Login/action";
import { API_URL } from "../../api";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../notification/Notification";

const H1 = styled.h1`
  text-align: center;
  margin-top: 2%;
`;
const MainDiv = styled.div`
  .footer {
    margin-top: 25%;
  }
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

export const Login = () => {
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = () => {
    const userDetails = {
      email,
      password,
    };
    setLoading(true);
    fetch(`${API_URL}/login`, {
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
          showSuccessNotification(`Welcome ${res.user.name}`);
          dispatch(
            loginSuccess({
              token: res.token,
              roles: res.user.roles[0],
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
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        showErrorNotification(err.message);
      });
  };

  return (
    <MainDiv>
      <H1>Login</H1>
      <Img className="dog_img" src="logo.png" alt="" />
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
          {loading ? `Login...` : `Login`}
        </button>
      </Div>
    </MainDiv>
  );
};
