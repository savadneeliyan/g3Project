import { Box, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { SelectFieldWithOutBorder } from "../InputFields/SelectInputFields";

function Header() {
  const [formData, setFormData] = useState({
    username: "David Nowak",
  });
  const handleChange = () => {};

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
            }
          }}
        >
          <img src="/profile.png" alt="profile image" />
        </Box>
        <SelectFieldWithOutBorder
          value={formData?.username}
          handleChange={handleChange}
        />
      </Box>
    </Box>
  );
}

export default Header;
