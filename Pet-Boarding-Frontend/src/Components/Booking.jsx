import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { getUsersPetsData } from "../Redux/UsersPets/action";
import { TableRowUser } from "./TableRowUser";

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
  min-height: 500px;
  .profile {
    /* line-height: 180%; */
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
      padding: 15px 10px;
    }
    tr {
      border-bottom: 1px solid #dddddd;
    }
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

export const Booking = () => {
  const [city, setCity] = useState("");
  const [verify, setVerify] = useState("yes");
  const [costCheck, setCostCheck] = useState(true);
  const [ratingCheck, setRatingCheck] = useState(true);
  const dispatch = useDispatch();

  let { usersPets } = useSelector((state) => state.usersPets);
  const [petData, setPetData] = useState([...usersPets]);
  const { token, isAuthenticated, roles, user, userId } = useSelector(
    (state) => state.login
  );

  useEffect(() => {
    dispatch(getUsersPetsData(userId));
  }, []);

  useEffect(() => {
    setPetData([...usersPets]);
  }, [usersPets, dispatch]);

  //   const filterItems = () => {
  //     const t = pets.filter(
  //       (el) => el.city.toLowerCase().indexOf(city.toLowerCase()) !== -1
  //     );

  //     setPetData([...t]);
  //   };

  //   const filterItemsV = () => {
  //     const t = pets.filter(
  //       (el) => el.verified.toLowerCase() === verify.toLowerCase()
  //     );
  //     verify === "yes" ? setVerify("no") : setVerify("yes");
  //     setPetData([...t]);
  //   };

  // const filterCity = () => {
  //   const t = pets.filter(
  //     (el) => el.city.toLowerCase() === verify.toLowerCase()
  //   );
  //   verify === "yes" ? setVerify("no") : setVerify("yes");
  //   setPetData([...t]);
  // };

  //   const SortByCost = () => {
  //     const t = costCheck
  //       ? pets.sort((a, b) => {
  //           return a.cost_per_day - b.cost_per_day;
  //         })
  //       : pets.sort((a, b) => {
  //           return b.cost_per_day - a.cost_per_day;
  //         });

  //     costCheck ? setCostCheck(false) : setCostCheck(true);

  //     setPetData([...t]);
  //   };

  //   const SortByRating = () => {
  //     const t = ratingCheck
  //       ? pets.sort((a, b) => {
  //           return a.rating - b.rating;
  //         })
  //       : pets.sort((a, b) => {
  //           return b.rating - a.rating;
  //         });
  //     ratingCheck ? setRatingCheck(false) : setRatingCheck(true);
  //     setPetData([...t]);
  //   };

  // console.log("petData", petData);
  // console.log("filter", city);

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

        <h1>Your Booking</h1>
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {petData.map((e, index) => (
              <TableRowUser
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
                color={e.approval_status === "Pending" ? "red" : "green"}
                approval_status={e.approval_status}
              />
            ))}
          </tbody>
        </table>
      </Div>
      <Footer />
    </Container>
  );
};
