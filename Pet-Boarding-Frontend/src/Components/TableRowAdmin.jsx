import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const TableRowAdmin = ({
  sn,
  item,
  button,
  status,
  loading,
  handleApprove,
}) => {
  return (
    <tr>
      <td>{sn}</td>
      <td>{item.name}</td>
      <td>{item.city}</td>
      <td>{item.address}</td>
      <td>{item.mobile}</td>
      <td>{item.pet_type}</td>
      <td>{item.weight}</td>
      <td>{item.no_of_pets}</td>
      <td>{item.no_of_days}</td>
      {item.approval_status !== "Canceled" ? (
        <td>
          {button === "button" ? (
            <button
              onClick={() => {
                handleApprove(item._id, "Approved");
              }}
            >
              {loading === item._id ? `Approving...` : `Approve`}
            </button>
          ) : item.approval_status === "Approved" ? (
            <p>{item.approval_status}</p>
          ) : null}
        </td>
      ) : null}
      <td>
        {button === "button" ? (
          <button
            onClick={() => {
              handleApprove(item._id, "Canceled");
            }}
          >
            {loading === item._id ? `Canceling...` : `Cancel`}
          </button>
        ) : item.approval_status === "Canceled" ? (
          <p style={{ color: "red" }}>{item.approval_status}</p>
        ) : null}
      </td>
    </tr>
  );
};
