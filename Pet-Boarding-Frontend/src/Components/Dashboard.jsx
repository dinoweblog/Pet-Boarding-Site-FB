import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { allGetUsersPetsData } from "../Redux/UsersPets/action";
import { TableRowAdmin } from "./TableRowAdmin";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../notification/Notification";

const Container = styled.div`
  width: 100%;
`;

const Div = styled.div`
  background-color: white;
  width: 80%;
  margin: auto;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .profile {
    line-height: 180%;
    margin-bottom: 20px;
    h3,
    p {
      margin: 0;
      padding: 0;
    }
    span {
      font-size: 28px;
      color: #01d6af;
    }
  }
  table {
    border-collapse: collapse;
    text-align: left;

    thead {
      border-bottom: 1px solid #dddddd;
      border-top: 1px solid #dddddd;
      tr {
        color: #01d6af;
      }
    }
    th,
    td {
      padding: 20px 10px;
    }
    tr {
      border-bottom: 1px solid #dddddd;
    }
  }

  .approved_table p {
    padding: 0;
    margin: 0;
    color: green;
    font-weight: 600;
  }
  table button {
    background-color: black;
    border: 1px solid gray;
    color: white;
    border-radius: 4px;
    padding: 4px 8px;
  }
  .filter_sort {
    display: flex;
    gap: 10%;
    margin-bottom: 20px;
  }
  .filter,
  .sort,
  .search-box {
    display: flex;
    flex-direction: column;
    button {
      margin-left: 20px;
      background-color: transparent;
      border: 1px solid green;
      border-radius: 4px;
      padding: 3px;
      cursor: pointer;
      color: black;
    }
  }
  .sort {
    button {
      margin-left: 0px;
      margin-right: 20px;
    }
  }
`;

export const Dashboard = () => {
  const dispatch = useDispatch();

  let { AllUsersPets } = useSelector((state) => state.usersPets);
  const [petData, setPetData] = useState([...AllUsersPets]);
  const [petDataApprove, setPetDataApprove] = useState([]);
  const [petDataCancel, setPetDataCancel] = useState([]);
  const [loading, setLoading] = useState();
  const { token, user } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(allGetUsersPetsData());
  }, []);

  useEffect(() => {
    setPetData([...AllUsersPets]);
    filter();
    filter2();
    handleCancel();
  }, [AllUsersPets, dispatch]);

  const filter = () => {
    const f = AllUsersPets.filter((el) => el.approval_status === "Pending");

    setPetData([...f]);
  };

  const filter2 = () => {
    const f = AllUsersPets.filter((el) => el.approval_status === "Approved");

    setPetDataApprove([...f]);
  };

  const handleCancel = () => {
    const f = AllUsersPets.filter((el) => el.approval_status === "Canceled");

    setPetDataCancel([...f]);
  };

  const handleApprove = (id, status) => {
    setLoading(id);
    fetch(`${API_URL}/status/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ approval_status: status }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.message) {
          showErrorNotification(res.message);
        } else {
          dispatch(allGetUsersPetsData());
          showSuccessNotification("Successfully updated");
        }
      })
      .catch((err) => {
        console.log(err);
        showErrorNotification(err.message);
      });
  };

  return (
    <Container>
      <Div>
        <div className="profile">
          <h3>
            Welcome <span>{user.name}</span>{" "}
          </h3>
          <p>Email : {user.email}</p>
        </div>

        <h2>Approval Request</h2>
        <table>
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Pet Type</th>
              <th>Pet Size</th>
              <th>No Of Pets</th>
              <th>No Of Days</th>
            </tr>
          </thead>
          <tbody>
            {petData.length === 0 ? (
              <h4>Empty!</h4>
            ) : (
              petData.map((item, index) => (
                <TableRowAdmin
                  key={item._id}
                  sn={index + 1}
                  item={item}
                  handleApprove={handleApprove}
                  button="button"
                  loading={loading}
                />
              ))
            )}
          </tbody>
        </table>

        <h2>Approval Accepted</h2>
        <table className="approved_table">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Pet Type</th>
              <th>Pet Size</th>
              <th>No Of Pets</th>
              <th>No Of Days</th>
            </tr>
          </thead>
          <tbody>
            {petDataApprove.map((item, index) => (
              <TableRowAdmin
                key={item._id}
                sn={index + 1}
                item={item}
                handleApprove={handleApprove}
              />
            ))}
          </tbody>
          <tbody>
            {petDataCancel.map((item, index) => (
              <TableRowAdmin
                key={item._id}
                sn={index + 1}
                item={item}
                handleApprove={handleApprove}
              />
            ))}
          </tbody>
        </table>
      </Div>
    </Container>
  );
};
