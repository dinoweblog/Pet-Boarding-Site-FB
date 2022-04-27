import styled from "styled-components";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const Div = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 5%;
  margin-top: 10%;
  text-align: center;
  div {
    width: 30%;
    margin: auto;
    margin-bottom: 10px;
    img {
      width: 100%;
    }
  }
`;

export const Successfull = () => {
  return (
    <div>
      <Navbar />
      <Div>
        <div>
          <img
            src="https://pngimg.com/uploads/thank_you/thank_you_PNG138.png"
            alt=""
          />
        </div>
        <h2>Successfully Added</h2>
        <p>Thank you for you choose me!</p>
      </Div>
      <Footer />
    </div>
  );
};
