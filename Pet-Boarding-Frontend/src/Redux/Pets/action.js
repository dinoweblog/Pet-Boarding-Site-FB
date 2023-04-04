import { API_URL } from "../../api";

export const PETS_LOADING = "PETS_LOADING";
export const PETS_SUCCESS = "PETS_SUCCESS";
export const PETS_ERROR = "PETS_ERROR";
export const PETS_DELETE = "PETS_DELETE";

export const petsLoadingFun = () => ({
  type: PETS_LOADING,
});

export const petsSuccessFun = (payload) => ({
  type: PETS_SUCCESS,
  payload,
});

export const petsDeleteFun = (payload) => ({
  type: PETS_SUCCESS,
  payload,
});

export const petsErrorFun = () => ({
  type: PETS_SUCCESS,
});

export const getPetsData = (page, size, setLoading) => (dispatch) => {
  dispatch(petsLoadingFun());
  console.log("page", page);
  fetch(`${API_URL}?page=${page}&size=${size}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch(petsSuccessFun({ pets: res.pets, totalPages: res.totalPages }));
      setLoading(false);
    })
    .catch((error) => dispatch(petsErrorFun()));
};
