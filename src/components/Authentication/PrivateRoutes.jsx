import React from "react";
import Sidebar from "../Common/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Common/Header";
import { Box } from "@mui/material";

function PrivateRoutes() {
  return (
    <Box
      sx={{
        // display: "flex",
        width: "100%",
      }}
    >
      <Header />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "calc(100vh - 66px)",
        }}
      >
        <Sidebar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default PrivateRoutes;
