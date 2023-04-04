import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPetsData, petsSuccessFun } from "../Redux/Pets/action";
import { TableRow } from "./TableRow";
import styled from "styled-components";
import "./CSS/Style.css";
import { API_URL } from "../api";
import { Box } from "@mui/material";
import Modal from "./Modal";
import Modal2 from "./Modal2";

const Container = styled.div`
  width: 100%;

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
    }
    .bxs-quote-right {
      margin-top: 10px;
      position: absolute;
    }
  }
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

  .table_container {
    overflow-x: auto;
  }
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
      border: 1px solid #c4c4c4;
      font-size: 15px;
    }

    .active {
      background-color: #ab46d2;
      border: 1px solid #ab46d2;
      pointer-events: none;
      color: white;
    }
    .nextPrevBtn {
      pointer-events: none;
      opacity: 0.7;
    }
  }

  .table {
    border-collapse: collapse;
    text-align: left;
    min-width: 700px;
    white-space: nowrap;
    .tbody {
      height: 315px;
    }
    .thead {
      display: flex;
      border-bottom: 1px solid #dddddd;
      border-top: 1px solid #dddddd;
      color: #ab46d2;
      font-weight: bold;
    }
    .row {
      display: flex;
      width: 95%;
      justify-content: space-between;
    }
    .th,
    .td {
      padding: 20px 0;
      width: calc(100vh / 7);
    }
    .sn {
      width: 30px;
    }
    .row {
      /* height: 63px; */
      box-sizing: border-box;
    }
    .main-head {
      border-bottom: 0px solid #dddddd;
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
    margin-top: 8%;
    img {
      width: 100%;
    }
  }

  .icons {
    font-size: 18px;
    display: flex;

    gap: 20px;
    padding: 20px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #dddddd;
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
  const [ratingCheck, setRatingCheck] = useState(true);
  const [alpha, setAlpha] = useState(true);
  const [loading, setLoading] = useState(true);
  const [clearShow, setClearShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [itemId, setItenId] = useState();
  const size = 5;

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

  useEffect(() => {
    const getData = setTimeout(handleApiClls, 2000);

    return () => clearTimeout(getData);
  }, [city]);

  const handleChange = (e) => {
    setLoading(true);
    setCity(e.target.value);
    setClearShow(true);
  };

  const handleApiClls = () => {
    fetch(`${API_URL}?search=${city}`)
      .then((res) => res.json())
      .then((res) => {
        setPetData([...res.pets]);
        console.log(res);
        dispatch(
          petsSuccessFun({ pets: res.pets, totalPages: res.totalPages })
        );
        setLoading(false);
      })
      .catch((error) => console.log(error));
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

  const clearHandle = () => {
    dispatch(getPetsData(page, size, setLoading));
    setClearShow(false);
    setCity("");
  };

  const getId = (id) => {
    setItenId(id);
  };

  return (
    <Container>
      <Div id="content_container">
        <div className="dog_img">
          <img src="logo.png" alt="" />
        </div>
        <h2 className="top-text">
          Pet Boarding Locaton, Plans and All Details.
        </h2>
        <div className="filter_sort">
          <div className="search-box">
            <p>
              <i className="bx bxs-search"></i> Search By :
              {clearShow ? (
                <span
                  className="clear_all_btn"
                  onClick={() => {
                    clearHandle();
                  }}
                >
                  Clear All
                </span>
              ) : null}
            </p>
            <input
              type="text"
              name=""
              id=""
              value={city}
              placeholder="city..."
              onChange={handleChange}
            />
          </div>
          <div className="filter">
            <p>
              <i className="bx bxs-filter-alt"></i> Filter By :
            </p>
            <div>
              <button
                onClick={() => {
                  filterItemsV();
                  setClearShow(true);
                }}
              >
                Verified
              </button>
              <button
                onClick={() => {
                  filterCity();
                  setClearShow(true);
                }}
              >
                City
              </button>
            </div>
          </div>
          <div className="sort">
            <p>
              <i className="bx bxs-sort-alt"></i> Sort By :
            </p>
            <div>
              <button
                onClick={() => {
                  SortByCost();
                  setClearShow(true);
                }}
              >
                Cost
              </button>
              <button
                onClick={() => {
                  SortByRating();
                  setClearShow(true);
                }}
              >
                Rating
              </button>
            </div>
          </div>
        </div>

        <div className="table_container">
          <div className="table">
            <div className="thead">
              <div className="main-head row">
                <div className="th sn">S.N.</div>
                <div className="th">Name</div>
                <div className="th">City</div>
                <div className="th">Address</div>
                <div className="th">Capacity</div>
                <div className="th">Cost Per Day</div>
                <div className="th">Verified</div>
                <div className="th">Rating</div>
              </div>
              <div className=""></div>
            </div>

            <Box className="tbody" sx={{ position: "relative" }}>
              {!loading ? (
                petData.length === 0 ? (
                  <div>Not Found!</div>
                ) : (
                  petData.map((e, index) => (
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
                      page={page}
                      setIsOpen={setIsOpen}
                      setIsOpen2={setIsOpen2}
                      getId={getId}
                    />
                  ))
                )
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <div className="loading_img td">
                    <img src="assets/loading-gif.png" alt="" />
                  </div>
                </Box>
              )}
            </Box>
          </div>
        </div>

        <div className="pagination">
          <button
            className={page === 1 ? "nextPrevBtn" : null}
            onClick={() => {
              setPage(page - 1);
              setLoading(true);
            }}
          >
            Prev
          </button>

          {btn.map((e, index) => (
            <button
              className={page - 1 === index ? "active" : null}
              onClick={() => {
                setPage(index + 1);
                setLoading(true);
              }}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={page === totalPages ? "nextPrevBtn" : null}
            onClick={() => {
              setPage(page + 1);
              setLoading(true);
            }}
          >
            Next
          </button>
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
      {isOpen && <Modal id={itemId} setIsOpen={setIsOpen} page={page} />}
      {isOpen2 && <Modal2 id={itemId} setIsOpen2={setIsOpen2} page={page} />}
    </Container>
  );
};
