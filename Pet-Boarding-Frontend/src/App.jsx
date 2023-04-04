import "./App.css";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import AppRoutes from "./Routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
