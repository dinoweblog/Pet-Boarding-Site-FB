import { useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { petsLoadingFun } from "../Redux/Pets/action";
import { API_URL } from "../api";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../notification/Notification";

const H2 = styled.h2`
  text-align: center;
`;
const Div = styled.div`
  width: 38%;
  padding: 3%;
  box-sizing: border-box;
  background-color: white;
  border-radius: 8px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    input,
    select {
      height: 40px;
      padding-left: 15px;
      outline: none;
      border: 1px solid #dddddd;
    }
    input[type="submit"] {
      height: 45px;
      border: none;
      background-color: #a85cf9;
      color: white;
      font-size: 17px;
      :hover {
        opacity: 0.9;
      }
    }
  }
`;

export const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    capacity: "",
    cost_per_day: "",
    verified: "",
    rating: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(petsLoadingFun());
    fetch(`${API_URL}/listing/create`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
        showSuccessNotification("Successfully Added");
        emptyForm();
      })
      .catch((error) => {
        setLoading(false);
        showErrorNotification(error.message);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const emptyForm = () => {
    setFormData({
      name: "",
      city: "",
      address: "",
      capacity: "",
      cost_per_day: "",
      verified: "",
      rating: "",
    });
  };

  return (
    <div>
      <H2>Create Listing</H2>
      <Div>
        <form onSubmit={handleForm} onChange={handleChange} className="form">
          <input
            required
            type="text"
            placeholder="Pet Name"
            name="name"
            value={formData.name}
          />
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
          />
          <input
            required
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
          />
          <input
            required
            type="number"
            placeholder="Capacity"
            name="capacity"
            value={formData.capacity}
          />
          <input
            required
            type="number"
            placeholder="Cost per day"
            name="cost_per_day"
            value={formData.cost_per_day}
          />
          <select required name="verified">
            <option value="">Verified</option>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>

          <input
            required
            type="number"
            placeholder="Rating"
            name="rating"
            value={formData.rating}
          />
          <input type="submit" value={loading ? `Submiting...` : `Submit`} />
        </form>
      </Div>
    </div>
  );
};
