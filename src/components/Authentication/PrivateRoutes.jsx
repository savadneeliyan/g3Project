import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import { Box, Button, TextField } from "@mui/material"; 
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function PrivateRoutes() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
  };
  
  const navigate = useNavigate()
  useEffect(() => {
    let isUserExist = JSON.parse(localStorage.getItem("userDetails"));
    if (!isUserExist) {
      navigate("/login")
    }
    
  },[])
 
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
          height: "calc(100vh - 4.125rem)",
        }}
      >
        <Sidebar />
        <Outlet />
      </Box>
      {/* <input type="text" />
      <TextField
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onChange={handleClick}
      /> */}
      <div>
        {/* <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button> */}
        {/* <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        > */}
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          {/* <h2>slksdjfds</h2>
          <h2>slksdjfds</h2>
          <h2>slksdjfds</h2>
          <h2>slksdjfds</h2>
          <h2>slksdjfds</h2> */}
        {/* </Menu> */}
      </div>
    </Box>
  );
}

export default PrivateRoutes;
