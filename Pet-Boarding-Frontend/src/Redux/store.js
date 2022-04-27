import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { loginReducer } from "./Login/reducer";
import { petsReducer } from "./Pets/reducer";
import { usersPetsReducer } from "./UsersPets/reducer";

export const rootReducer = combineReducers({
  login: loginReducer,
  pets: petsReducer,
  usersPets: usersPetsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
