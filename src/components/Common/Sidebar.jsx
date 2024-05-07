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
      <Box sx={{ width: "5rem", height: "100%" }}></Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          // filter: "drop-shadow(0.125rem 0.125rem 0.625rem #59667a8f)",
          boxShadow:"0 0 21px 0 #59667a1a",
          position: "absolute",
          left: "0",
          top: 0,
          bottom: 0,
        }}
      >
        <Box
          sx={{
            width: "4.5rem",
            height: "4.125rem",
            "& img": {
              width: "100%",
              height: "100%",
            },
            cursor: "pointer",
          }}
          onClick={()=>navigate("/")}
        >
          <img src="/Logo.png" alt="Logo image" />
        </Box>
        <Box
          sx={{
            paddingRight: "0.688rem",
            backgroundColor: "#fff",
            maxHeight: "calc(100% - 4.125rem)",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              py: "1.188rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.438rem",
            }}
          >
            {menus.map((item, i) => (
              <Box
                key={i}
                sx={{
                  padding: "0.813rem",
                  pl: "2.063rem",
                  background: i === 4 ? "rgba(0,0,128,0.1)" : "#fff",
                  borderRadius: "0rem 0.625rem 0.625rem 0rem",
                  cursor: "pointer",
                  transition: "0.5s ease",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,128,0.1)",
                  },
                  "& svg": {
                    width: "1.125rem",
                    height: "1.125rem",
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
