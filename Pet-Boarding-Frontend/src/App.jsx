import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { ListingPage } from "./Components/ListingPage";
import { CreateListingPage } from "./Components/CreateListingPage";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { useSelector } from "react-redux";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { CreatePets } from "./Components/CreatePets";
import { Successfull } from "./Components/SuccessPage";
import { Booking } from "./Components/Booking";
import { Dashboard } from "./Components/Dashboard";

function App() {
  const { isAuthenticated } = useSelector((state) => state.login);

  console.log("isAuthenticated", isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>

      <Route path="/listing/:id" element={<ListingPage />}></Route>

      <Route
        path="/users/dashboard"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/listing/create"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <CreateListingPage />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/pets/create" element={<CreatePets />}></Route>
      <Route
        path="/users/successfull"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Successfull />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/users/booking"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Booking />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
