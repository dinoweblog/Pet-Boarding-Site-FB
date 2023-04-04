import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getLogout } from "../Redux/Login/action";

const Div = styled.div`
  padding: 8px 10%;
  background-color: #ab46d2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .logo {
    width: 120px;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 30%;
    }

    :hover {
      opacity: 0.9;
    }
  }
  h3 {
    margin: 0;
    padding: 0;
    cursor: pointer;
    margin-left: 2px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 17px;
  }
  a:hover {
    color: #55d8c1;
  }
`;
export const Navbar = () => {
  const { roles } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Div>
      <div
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <img style={{ width: "30px" }} src="./logo.png" alt="" />
        <h3>PetCare</h3>
      </div>
      {roles === "admin" ? (
        <div className="menu">
          <Link to={"/users/dashboard"}>
            <i className="bx bxs-dashboard"></i> Dashboard
          </Link>
          <Link to={"/listing/create"}>Create Listing</Link>
          <Link
            to={"/"}
            onClick={() => {
              dispatch(getLogout());
              console.log("fff");
            }}
          >
            Logout
          </Link>
        </div>
      ) : roles === "user" ? (
        <div className="menu">
          <Link to={"/users/booking"}>
            <i className="bx bxs-bookmarks"></i> Your Booking
          </Link>
          <Link to={"/pets/create"}>Create Booking</Link>
          <Link
            to={"/"}
            onClick={() => {
              dispatch(getLogout());
              console.log("fff");
            }}
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="menu">
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </div>
      )}
    </Div>
  );
};
