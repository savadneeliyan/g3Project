import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import { Box } from "@mui/material";

function PrivateRoutes() {
  const navigate = useNavigate();
  useEffect(() => {
    let isUserExist = JSON.parse(localStorage.getItem("userDetails"));
    if (!isUserExist) {
      navigate("/login");
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Header />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "calc(100vh - 4.125rem)",
        }}
      >
        <Sidebar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default PrivateRoutes;
