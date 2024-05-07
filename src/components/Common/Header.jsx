import { Box, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SelectFieldWithOutBorder } from "../InputFields/SelectInputFields";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsAction } from "../../Redux/Action/ThemeAction";

function Header() {
  let { userDetailsSuccess } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetailsSuccess) {
      setFormData({
        username:
          userDetailsSuccess.first_name + " " + userDetailsSuccess.last_name,
      });
    }
  }, [userDetailsSuccess]);

  useEffect(() => {
    dispatch(userDetailsAction());
  }, []);

  const [formData, setFormData] = useState({
    username: "User",
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "4.125rem",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        gap: "0.5rem",
        paddingRight: "1.25rem",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "0.625rem",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "2.5rem",
            height: "2.5rem",
            objectFit: "cover",
            borderRadius: "0.625rem",
            "& img": {
              width: "100%",
              height: "100%",
            },
          }}
        >
          <img src="/profile.png" alt="profile image" />
        </Box>
        <SelectFieldWithOutBorder
          value={formData?.username}
        />
      </Box>
    </Box>
  );
}

export default Header;
