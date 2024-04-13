import { Box, Button, Typography } from "@mui/material";
import React from "react";
import TemplatesMain from "./Pages/TemplatePage/TemplatesMain";

function Home() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 66px)",
        width: "calc(100vw - 77px)"
      }}
    >
      <Box
        sx={{
          px: "15px",
          width:"100%",
        }}
      >
        <TemplatesMain/>
      </Box>
    </Box>
  );
}

export default Home;
