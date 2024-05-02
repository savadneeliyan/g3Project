import React from "react";
import { Box, Typography } from "@mui/material";
import { NormalTextField } from "../InputFields/TextFields";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  let tocken = {
    access_token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vNDQuMjMzLjExMC4xNzAvYXBpL2xvZ2luIiwiaWF0IjoxNzE0NjM3NTY5LCJleHAiOjE3MTQ2ODA3NjksIm5iZiI6MTcxNDYzNzU2OSwianRpIjoiekxTMVpRS09WSzNjQzVMViIsInN1YiI6IjI0MyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.uCtyU30M_L3xmSCIhU9fpIjzEWBKuADQGN05AZ9y6o4",
    company: { id: 36 },
    user: { id: 243, role: 2, tour: 1 },
  };

  const handleLogin = () => {
    localStorage.setItem("userDetails", JSON.stringify(tocken));
    navigate("/");
  };
  return (
    <>
      <Box>
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: "500",
            mb: "0.5rem",
            "& span": {
              color: "#FF0000",
            },
          }}
        >
          user name <span>*</span>
        </Typography>
        <NormalTextField
        // placeholder={"username"}
        // value={}
        // handleChange={}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: "500",
            mb: "0.5rem",
            "& span": {
              color: "#FF0000",
            },
          }}
        >
          user name <span>*</span>
        </Typography>
        <NormalTextField
        // placeholder={"username"}
        // value={}
        // handleChange={}
        />
      </Box>

      <button onClick={handleLogin}>login</button>
    </>
  );
}

export default Login;
