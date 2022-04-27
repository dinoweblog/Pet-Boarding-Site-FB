export const USERS_PETS_LOADING = "USERS_PETS_LOADING";
export const USERS_PETS_SUCCESS = "USERS_PETS_SUCCESS";
export const USERS_PETS_BOOKING = "USERS_PETS_BOOKING";
export const USERS_PETS_ERROR = "USERS_PETS_ERROR";

export const usersPetsLoadingFun = () => ({
  type: USERS_PETS_LOADING,
});

export const usersPetsSuccessFun = (payload) => ({
  type: USERS_PETS_SUCCESS,
  payload,
});

export const allUsersPetsBooking = (payload) => ({
  type: USERS_PETS_BOOKING,
  payload,
});

export const usersPetsErrorFun = () => ({
  type: USERS_PETS_SUCCESS,
});

export const getUsersPetsData = (id) => (dispatch) => {
  dispatch(usersPetsLoadingFun());
  fetch(`https://pet-boarding-server.herokuapp.com/pets/all/${id}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(usersPetsSuccessFun(res));
    })
    .catch((error) => dispatch(usersPetsErrorFun()));
};

export const allGetUsersPetsData = () => (dispatch) => {
  dispatch(usersPetsLoadingFun());
  fetch(`https://pet-boarding-server.herokuapp.com/pets/all`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(allUsersPetsBooking(res));
    })
    .catch((error) => dispatch(usersPetsErrorFun()));
};
