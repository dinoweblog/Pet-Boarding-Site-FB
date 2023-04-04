import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Div = styled.div`
  display: flex;
  border-bottom: 1px solid #dddddd;
  .row-hover {
    :hover {
      background-color: #f2f2f2;
      cursor: pointer;
    }
  }
  .visit {
    padding: 20px 0;
    color: green;
  }
`;

export const TableRow = ({
  id,
  sn,
  name,
  city,
  address,
  capacity,
  cost_per_day,
  verified,
  rating,
  getId,
  setIsOpen,
  setIsOpen2,
}) => {
  const navigate = useNavigate();
  const { token, roles } = useSelector((state) => state.login);

  return (
    <Div>
      <div
        className="row row-hover"
        onClick={() => {
          navigate(`/listing/${id}`);
        }}
      >
        <div className="td sn">{sn}</div>
        <div className="td">{name}</div>
        <div className="td">{city}</div>
        <div className="td">{address}</div>
        <div className="td">{capacity}</div>
        <div className="td">{cost_per_day}</div>
        <div className="td">{verified}</div>
        <div className="td">{rating}</div>
      </div>
      {token != "" && roles === "admin" ? (
        <div className="icons">
          <i
            className="bx bxs-trash-alt delete"
            onClick={() => {
              getId(id);
              setIsOpen(true);
            }}
          ></i>
          <i
            className="bx bxs-edit-alt edit"
            onClick={() => {
              getId(id);
              setIsOpen2(true);
            }}
          ></i>
        </div>
      ) : (
        <div className="visit">
          <i class="bx bx-chevrons-right"></i>
        </div>
      )}
    </Div>
  );
};
