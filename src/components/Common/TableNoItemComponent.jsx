import React from "react";
import Lottie from "react-lottie";
import animationData from "../Icons/NoData.json";
import { Box, Typography } from "@mui/material";

function TableNoItemComponent() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box sx={{ pt: "3.125rem", pointerEvents: "none " }}>
      <Lottie options={defaultOptions} height={"25rem"} width={"25rem"} />
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "1.063rem",
          textTransform: "capitalize",
        }}
      >
        no items found
      </Typography>
    </Box>
  );
}

export default TableNoItemComponent;
