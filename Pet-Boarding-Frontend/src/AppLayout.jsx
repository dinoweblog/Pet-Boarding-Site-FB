import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./Components";
import { Box } from "@mui/material";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Box sx={{ minHeight: `calc(100vh - 120px)` }}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default AppLayout;
