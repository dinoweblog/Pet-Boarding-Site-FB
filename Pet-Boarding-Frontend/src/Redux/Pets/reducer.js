import { PETS_LOADING, PETS_SUCCESS, PETS_ERROR, PETS_DELETE } from "./action";

const initState = {
  loading: false,
  error: false,
  pets: [],
  totalPages: 0,
};

export const petsReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case PETS_LOADING:
      return { ...store, loading: true };
    case PETS_SUCCESS:
      return {
        ...store,
        loading: false,
        error: false,
        pets: [...payload.pets],
        totalPages: payload.totalPages,
      };
    case PETS_DELETE:
      return {
        ...store,
        loading: false,
        error: false,
        pets: [...store.filter((_id) => _id !== payload.id)],
      };
    case PETS_ERROR:
      return {
        ...store,
        loading: false,
        error: true,
      };
    default:
      return store;
  }
};
