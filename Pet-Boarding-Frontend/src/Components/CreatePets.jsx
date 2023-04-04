import { useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { usersPetsLoadingFun } from "../Redux/UsersPets/action";
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

    input {
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

export const CreatePets = () => {
  const { token, userId } = useSelector((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    mobile: "",
    pet_type: "",
    weight: "",
    no_of_pets: "",
    no_of_days: "",
    user_id: userId,
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(usersPetsLoadingFun());
    fetch(`${API_URL}/pets/create`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
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
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const emptyForm = () => {
    setFormData({
      name: "",
      city: "",
      address: "",
      mobile: "",
      pet_type: "",
      weight: "",
      no_of_pets: "",
      no_of_days: "",
      user_id: userId,
    });
  };
  return (
    <div>
      <H2>Booking Input</H2>
      <Div>
        <form onSubmit={handleSubmit} onChange={handleChange} className="form">
          <input
            required
            type="text"
            placeholder="Name"
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
            placeholder="Mobile"
            name="mobile"
            value={formData.mobile}
          />
          <input
            required
            type="text"
            placeholder="Pet type"
            name="pet_type"
            value={formData.pet_type}
          />
          <input
            required
            type="number"
            placeholder="Weight in kg"
            name="weight"
            value={formData.weight}
          />
          <input
            required
            type="number"
            placeholder="No of pets"
            name="no_of_pets"
            value={formData.no_of_pets}
          />

          <input
            required
            type="number"
            placeholder="No of days"
            name="no_of_days"
            value={formData.no_of_days}
          />

          <input type="submit" value={loading ? `Submiting...` : `Submit`} />
        </form>
      </Div>
    </div>
  );
};
