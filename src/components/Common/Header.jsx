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
        height: "66px",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        gap: "8px",
        paddingRight: "20px",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "10px",
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
