import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const TableRowAdmin = ({
  id,
  sn,
  name,
  city,
  address,
  mobile,
  pet_type,
  weight,
  no_of_pets,
  no_of_days,
  status,
  button,
  approval_status,
  handleApprove,
}) => {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{sn}</td>
      <td>{name}</td>
      <td>{city}</td>
      <td>{address}</td>
      <td>{mobile}</td>
      <td>{pet_type}</td>
      <td>{weight}</td>
      <td>{no_of_pets}</td>
      <td>{no_of_days}</td>
      <td>
        {button === "button" ? (
          <button
            onClick={() => {
              handleApprove(id);
            }}
          >
            {status}
          </button>
        ) : (
          <p>{status}</p>
        )}
      </td>
    </tr>
  );
};
