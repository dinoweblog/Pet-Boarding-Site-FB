import { Link } from "react-router-dom";
import styled from "styled-components";
const Div = styled.div`
  padding: 10px 10%;
  background-color: black;
  color: #b4b4b4;
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 50px;
  p {
    font-size: 13px;
  }
  a {
    /* text-decoration: none; */
    color: #b4b4b4;
  }
  a:hover {
    color: #55d8c1;
  }
`;
export const Footer = () => {
  return (
    <Div>
      <Link to={"/"}>Home</Link>
      <p>
        © 2022 petcare | created by{" "}
        <a target="_blank" href="https://www.linkedin.com/in/dino-web/">
          Dinesh Sharma
        </a>
      </p>
    </Div>
  );
};
