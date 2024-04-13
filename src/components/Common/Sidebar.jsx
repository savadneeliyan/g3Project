import { Box } from "@mui/material";
import React from "react";
import {
  Menu1,
  Menu2,
  Menu3,
  Menu4,
  Menu5,
  Menu6,
  Menu7,
} from "../Icons/MenuIcons";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const menus = [
    {
      menu: <Menu1 />,
      url: "/menu",
      title: "Projects",
    },
    {
      menu: <Menu2 />,
      url: "/menu",
      title: "Activities",
    },
    {
      menu: <Menu3 />,
      url: "/menu",
      title: "Reports",
    },
    {
      menu: <Menu4 />,
      url: "/menu",
      title: "Users",
    },
    {
      menu: <Menu5 />,
      url: "/menu",
      title: "Templates",
    },
    {
      menu: <Menu6 />,
      url: "/menu",
      title: "Roles",
    },
    {
      menu: <Menu7 />,
      url: "/menu",
      title: "Settings",
    },
  ];
  return (
    <>
      <Box sx={{ width: "80px", height: "100%" }}></Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          filter: "drop-shadow(2px 2px 10px #59667a8f)",
          position: "absolute",
          left: "0",
          top: 0,
          bottom: 0,
        }}
      >
        <Box
          sx={{
            width: "72px",
            height: "66px",
          }}
        >
          <img src="/Logo.png" alt="Logo image" />
        </Box>
        <Box
          sx={{
            paddingRight: "11px",
            backgroundColor: "#fff",
            maxHeight: "calc(100% - 66px)",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              py: "19px",
              display: "flex",
              flexDirection: "column",
              gap: "7px",
            }}
          >
            {menus.map((item, i) => (
              <Box
                key={i}
                sx={{
                  padding: "13px",
                  pl: "33px",
                  background: i === 4 ? "rgba(0,0,128,0.1)" : "#fff",
                  borderRadius: "0px 10px 10px 0px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,128,0.1)",
                    transition:"0.5s ease"
                  },
                }}
                // onClick={() => navigate(item.url)}
              >
                {item.menu}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;
