import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { allGetUsersPetsData } from "../Redux/UsersPets/action";
import { TableRowAdmin } from "./TableRowAdmin";
import { useNavigate } from "react-router-dom";

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
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { token, isAuthenticated, roles, user } = useSelector(
    (state) => state.login
  );

  useEffect(() => {
    dispatch(allGetUsersPetsData());
  }, []);

  useEffect(() => {
    setPetData([...AllUsersPets]);
    filter();
    filter2();
  }, [AllUsersPets, dispatch]);

  useEffect(() => {}, [count]);

  const filter = () => {
    const f = AllUsersPets.filter((el) => el.approval_status === "Pending");

    setPetData([...f]);
  };

  const filter2 = () => {
    const f = AllUsersPets.filter((el) => el.approval_status === "Approved");

    setPetDataApprove([...f]);
  };

  const handleApprove = (id) => {
    console.log(id);
    fetch(`https://pet-boarding-server.herokuapp.com/approval/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ approval_status: "Approved" }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        filter();
        filter2();
      })
      .then(() => {
        navigate("/users/dashboard");
      });
  };

  return (
    <Container>
      <Navbar />
      <Div>
        <div className="profile">
          <h3>
            Welcome <span>{user.name}</span>{" "}
          </h3>
          <p>Email : {user.email}</p>
          <p>Mobile : {user.mobile}</p>
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
              petData.map((e, index) => (
                <TableRowAdmin
                  key={e._id}
                  id={e._id}
                  sn={index + 1}
                  name={e.name}
                  city={e.city}
                  address={e.address}
                  mobile={e.mobile}
                  pet_type={e.pet_type}
                  weight={e.weight}
                  no_of_pets={e.no_of_pets}
                  no_of_days={e.no_of_days}
                  approval_status={e.approval_status}
                  status="Approve"
                  button="button"
                  handleApprove={handleApprove}
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
            {petDataApprove.map((e, index) => (
              <TableRowAdmin
                key={e._id}
                id={e._id}
                sn={index + 1}
                name={e.name}
                city={e.city}
                address={e.address}
                mobile={e.mobile}
                pet_type={e.pet_type}
                weight={e.weight}
                no_of_pets={e.no_of_pets}
                no_of_days={e.no_of_days}
                approval_status={e.approval_status}
                status="Approved"
                button="p"
                handleApprove={handleApprove}
              />
            ))}
          </tbody>
        </table>
      </Div>
      <Footer />
    </Container>
  );
};
