import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { NormalTextField, TextFieldWithLabel } from "../InputFields/TextFields";
import { useNavigate } from "react-router-dom";
import { Password } from "@mui/icons-material";

function Login() {
  const navigate = useNavigate();

  let tocken = {
    access_token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vNDQuMjMzLjExMC4xNzAvYXBpL2xvZ2luIiwiaWF0IjoxNzE0ODA0ODA5LCJleHAiOjE3MTQ4NDgwMDksIm5iZiI6MTcxNDgwNDgwOSwianRpIjoiOUNYZGN1amVFUE8xb3labiIsInN1YiI6IjI0MyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.F1z8HxiP6XwgyoKjgj7AyDayyu9y-c6Q7FReHXGrqNI",
    company: { id: 36 },
    user: { id: 243, role: 2, tour: 1 },
  };

  const [loginData, setLoginData] = useState({});
  const [errorData, setErrorData] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorData((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let error = {};
    let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!loginData.userName) {
      error.userName = "Please enter a email";
    } else if (!emailRegex.test(loginData.userName)) {
      error.userName = "please enter a valid email";
    }

    if (!loginData.password) {
      error.password = "Please enter a password";
    }

    setErrorData(error);
    return Object.keys(error).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      localStorage.setItem("userDetails", JSON.stringify(tocken));
      navigate("/");
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "75rem",
          height: "inline-block",
          margin: "auto",
        }}
      >
        <TextFieldWithLabel
          label="Email Address"
          value={loginData?.userName}
          name={"userName"}
          error={Boolean(errorData?.userName)}
          helperText={errorData?.userName}
          handleChange={handleChange}
        />
        <TextFieldWithLabel
          label="Password"
          value={loginData?.password}
          name={"password"}
          type="password"
          error={Boolean(errorData?.password)}
          helperText={errorData?.password}
          handleChange={handleChange}
        />

        <Button
          sx={{
            background: "#0057ff ",
            border: "0.063rem solid #0057ff !important ",
            color: "#fff",
            transition: "0.5s ease",
            px: "2rem",
            "&:hover": {
              background: "#fff ",
              color: "#0057ff",
            },
          }}
          onClick={handleLogin}
        >
          login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
