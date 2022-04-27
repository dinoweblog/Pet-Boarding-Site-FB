import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Tr = styled.tr``;

export const TableRowUser = ({
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
  color,
  approval_status,
}) => {
  const navigate = useNavigate();
  return (
    <Tr className="row">
      <td>{sn}</td>
      <td>{name}</td>
      <td>{city}</td>
      <td>{address}</td>
      <td>{mobile}</td>
      <td>{pet_type}</td>
      <td>{weight}</td>
      <td>{no_of_pets}</td>
      <td>{no_of_days}</td>
      <td style={{ color: color, fontWeight: 600 }}>{approval_status}</td>
    </Tr>
  );
};
