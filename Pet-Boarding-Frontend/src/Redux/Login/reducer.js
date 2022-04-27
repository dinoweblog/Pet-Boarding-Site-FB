import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_AUTH,
  LOGOUT,
} from "./action";

const initState = {
  loading: false,
  isAuthenticated: "false",
  token: "",
  error: false,
  roles: [],
  user: {},
  userId: ""
};

const loginReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_LOADING:
      return { ...store, loading: true };

    case LOGIN_SUCCESS:
      return {
        ...store,
        loading: false,
        isAuthenticated: "true",
        token: payload.token,
        roles: [...payload.roles],
        user: { ...payload.user },
        userId: payload.userId,
      };
    case LOGIN_AUTH:
      return {
        ...store,
        loading: false,
        isAuthenticated: payload,
      };
    case LOGIN_ERROR:
      return {
        ...store,
        loading: false,
        error: true,
        isAuthenticated: "false",
      };
    case LOGOUT:
      return {
        ...store,
        loading: false,
        isAuthenticated: "false",
        token: "",
        error: false,
        roles: [],
        user: null,
      };
    default:
      return store;
  }
};

export { loginReducer };
