import { Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import {
  AdminRegister,
  Booking,
  CreateListingPage,
  CreatePets,
  Dashboard,
  Home,
  ListingPage,
  Login,
  Register,
  Successfull,
} from "./pages";
import { PrivateRoute } from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/listing/:id" element={<ListingPage />} />

        <Route
          path="/users/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/listing/create"
          element={
            <PrivateRoute>
              <CreateListingPage />
            </PrivateRoute>
          }
        />
        <Route path="/pets/create" element={<CreatePets />} />
        <Route
          path="/users/successfull"
          element={
            <PrivateRoute>
              <Successfull />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/booking"
          element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signup/admin" element={<AdminRegister />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
