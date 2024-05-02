import { Box, Button, Typography } from "@mui/material";
import React from "react";
import TemplatesMain from "./Pages/TemplatePage/TemplatesMain";

function Home() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 4.125rem)",
        width: "calc(100vw - 4.813rem)",
      }}
    >
      <Box
        sx={{
          px: "0.938rem",
          width: "100%",
        }}
      >
        <TemplatesMain />
      </Box>
    </Box>
  );
}

export default Home;
