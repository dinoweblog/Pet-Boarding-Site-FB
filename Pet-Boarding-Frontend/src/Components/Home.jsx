import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPetsData } from "../Redux/Pets/action";
import { TableRow } from "./TableRow";
import styled from "styled-components";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import loading_gif from "../images/loading-gif.png";
import logo from "../images/logo.png";

const Container = styled.div`
  width: 100%;
  .top-text {
    width: 40%;
    margin: auto;
    margin-bottom: 30px;
    text-align: center;
    color: #01d6af;
  }
  .dog_img {
    position: absolute;
    top: 12%;
    right: 15%;
    transform: scaleX(-1);
    img {
      width: 50%;
    }
  }
  .quote {
    width: 80%;
    margin: auto;
    height: 300px;
    padding: 50px 10%;
    line-height: 170%;
    text-align: center;
    box-sizing: border-box;
    .quote_icon {
      font-size: 40px;
      /* position: absolute; */
    }
    .bxs-quote-right {
      margin-top: 10px;
      position: absolute;
    }
  }
`;

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

  .pagination {
    margin: auto;
    margin-top: 30px;
    gap: 5px;
    display: inline-block;
    button {
      color: black;
      padding: 8px 16px;
      text-decoration: none;
      transition: background-color 0.4s;
      border: 1px solid #ddd;
      font-size: 15px;
    }
  }

  table {
    border-collapse: collapse;
    text-align: left;

    tbody {
      height: 315px;
    }
    thead {
      border-bottom: 1px solid #dddddd;
      border-top: 1px solid #dddddd;
      tr {
        color: #ab46d2;
      }
    }
    th,
    td {
      padding: 20px;
    }
    tr {
      /* height: 63px; */
      box-sizing: border-box;
      border-bottom: 1px solid #dddddd;
    }
  }

  .filter_sort {
    display: flex;
    gap: 10%;
    margin-bottom: 20px;
    color: #ab46d2;
    font-weight: 600;
  }
  .filter,
  .sort,
  .search-box {
    display: flex;
    flex-direction: column;
    button {
      background-color: #ffffff;
      border: 0;
      border-radius: 0.5rem;
      box-sizing: border-box;
      color: #111827;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      text-align: center;
      text-decoration: none #d1d5db solid;
      text-decoration-thickness: auto;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      margin-right: 20px;
      :hover {
        background-color: rgb(249, 250, 251);
      }

      :focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
      }

      :focus-visible {
        box-shadow: none;
      }
    }
  }

  .search-box {
    input {
      color: #1d2029;
      font-size: 0.875rem;
      font-weight: 600;
      padding-left: 12px;
      height: 25px;
      border: 1px solid rgba(0, 0, 0, 0.06);
      outline: none;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);
      border-radius: 0.5rem;
    }
  }
  .sort {
    button {
      margin-left: 0px;
      margin-right: 20px;
    }
  }

  .loading_img {
    width: 100px;
    img {
      width: 100%;
    }
  }

  .icons {
    font-size: 18px;
    display: flex;

    gap: 20px;
  }
  .icons i {
    padding: 0;
    margin: 0;
  }
  .delete {
    color: #ff3e4e;
    cursor: pointer;
  }
  .edit {
    color: green;
    cursor: pointer;
  }
`;

export const Home = () => {
  const [city, setCity] = useState("");
  const [verify, setVerify] = useState("yes");
  const [costCheck, setCostCheck] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [height, setHeight] = useState(315);
  const [ratingCheck, setRatingCheck] = useState(true);
  const [alpha, setAlpha] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isActive, setActive] = useState({ isVisible: false });

  const dispatch = useDispatch();

  let { pets, totalPages } = useSelector((state) => state.pets);
  const [petData, setPetData] = useState([...pets]);
  const [btn, setBtn] = useState(new Array(totalPages).fill("a"));

  useEffect(() => {
    dispatch(getPetsData(page, size, setLoading));
  }, [page]);

  useEffect(() => {
    setPetData([...pets]);
  }, [pets, dispatch]);

  useEffect(() => {
    setBtn(new Array(totalPages).fill("btn"));
  }, [totalPages, dispatch]);

  const searchCity = () => {
    const t = pets.filter(
      (el) => el.city.toLowerCase().indexOf(city.toLowerCase()) !== -1
    );
    setPetData([...t]);
  };

  const filterItemsV = () => {
    const t = pets.filter(
      (el) => el.verified.toLowerCase() === verify.toLowerCase()
    );
    verify === "yes" ? setVerify("no") : setVerify("yes");
    setPetData([...t]);
  };

  const filterCity = () => {
    const t = alpha
      ? pets.sort((a, b) => a.city.localeCompare(b.city))
      : pets.sort((a, b) => b.city.localeCompare(a.city));
    alpha ? setAlpha(false) : setAlpha(true);
    setPetData([...t]);
  };

  const SortByCost = () => {
    const t = costCheck
      ? pets.sort((a, b) => {
          return a.cost_per_day - b.cost_per_day;
        })
      : pets.sort((a, b) => {
          return b.cost_per_day - a.cost_per_day;
        });

    costCheck ? setCostCheck(false) : setCostCheck(true);

    setPetData([...t]);
  };

  const SortByRating = () => {
    const t = ratingCheck
      ? pets.sort((a, b) => {
          return a.rating - b.rating;
        })
      : pets.sort((a, b) => {
          return b.rating - a.rating;
        });
    ratingCheck ? setRatingCheck(false) : setRatingCheck(true);
    setPetData([...t]);
  };

  return (
    <Container>
      <Navbar />
      <Div>
        <div className="dog_img">
          <img src={logo} alt="" />
        </div>
        <h2 className="top-text">
          Some Pet Boarding Locaton, Plans and All Details.
        </h2>
        <div className="filter_sort">
          <div className="search-box">
            <p>
              <i className="bx bxs-search"></i> Search By :
            </p>
            <input
              type="text"
              name=""
              id=""
              placeholder="city..."
              onChange={(e) => {
                setCity(e.target.value);
                searchCity();
              }}
            />
          </div>
          <div className="filter">
            <p>
              <i className="bx bxs-filter-alt"></i> Filter By :
            </p>
            <div>
              <button onClick={filterItemsV}>Verified</button>
              <button onClick={filterCity}>City</button>
            </div>
          </div>
          <div className="sort">
            <p>
              <i className="bx bxs-sort-alt"></i> Sort By :
            </p>
            <div>
              <button onClick={SortByCost}>Cost Per Day</button>
              <button onClick={SortByRating}>Rating</button>
            </div>
          </div>
          {/* <div>
            <select name="" id="" onChange={() => {}}>
              <option
                onSelect={() => {
                  //   filterByCost();
                }}
                value=""
              >
                Sort by Cost Ace
              </option>
              <option value="">Sort by Cost Dec</option>
              <option
                onSelect={() => {
                  filterByRating();
                }}
                value=""
              >
                Sort by Rating Ace
              </option>
              <option value="">Sort by Rating Dec</option>
            </select>
          </div> */}
        </div>

        <table>
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Capacity</th>
              <th>Cost Per Day</th>
              <th>Verified</th>
              <th>Rating</th>
            </tr>
          </thead>
          {loading ? (
            <tbody className="loading" style={{ height: `${height}px` }}>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="loading_img">
                  <img src={loading_gif} alt="" />
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {petData.map((e, index) => (
                <TableRow
                  key={e._id}
                  id={e._id}
                  sn={index + 1}
                  name={e.name}
                  city={e.city}
                  address={e.address}
                  capacity={e.capacity}
                  cost_per_day={e.cost_per_day}
                  verified={e.verified}
                  rating={e.rating}
                />
              ))}
            </tbody>
          )}
        </table>

        <div className="pagination">
          {page === 1 ? (
            <button disabled>Prev</button>
          ) : (
            <button
              className={isActive ? "active" : null}
              onClick={() => {
                setPage(page - 1);
                setLoading(true);
              }}
            >
              Prev
            </button>
          )}

          {btn.map((e, index) => (
            <button
              className={isActive ? "active" : null}
              onClick={() => {
                setPage(index + 1);
                setLoading(true);
                console.log(page, loading);
              }}
            >
              {index + 1}
            </button>
          ))}
          {page === totalPages ? (
            <button disabled>Next</button>
          ) : (
            <button
              className={isActive ? "active" : null}
              onClick={() => {
                setPage(page + 1);
                setLoading(true);
              }}
            >
              Next
            </button>
          )}
        </div>
      </Div>

      <div className="quote">
        <i className="bx bxs-quote-left quote_icon"></i> Pet, any animal kept by
        human beings as a source of companionship and pleasure. While a pet is
        generally kept for the pleasure that it can give to its owner, often,
        especially with horses, dogs, and cats, as well as with some other
        domesticated animals, this pleasure appears to be mutual. Thus, pet
        keeping can be described as a symbiotic relationship, one that benefits
        both animals and human beings. As the keeping of pets has been practiced
        from prehistoric times to the present and as pets are found in nearly
        every culture and society, pet keeping apparently satisfies a deep,
        universal human need. <i className="bx bxs-quote-right quote_icon"></i>
      </div>

      <Footer />
    </Container>
  );
};
