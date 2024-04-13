import { Box, Typography } from "@mui/material";
import React from "react";

function ColorPicker({ label, value, handleChange, id, ...props }) {
  return (
    <Box
      sx={{
        border: "1px solid #EFEFEF",
        padding: "7px 16px",
        borderRadius: "8px",
        display: "flex",
        gap: "20px",
        justifyContent: "space-between",
        alignItems:"center",
        color: "#707D89",
        position: "relative",
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          lineHeight: "18px",
          color: "#707D89",
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <svg
          width="12"
          height="6"
          viewBox="0 0 12 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.3996 4.76837e-07L0.599331 4.76837e-07C0.489984 0.000229359 0.3828 0.0203705 0.289318 0.0582557C0.195835 0.0961404 0.119593 0.150334 0.068799 0.215004C0.0180054 0.279675 -0.00541687 0.352373 0.00105381 0.425272C0.00752354 0.498171 0.0436401 0.568511 0.105517 0.628722L5.50567 5.83801C5.72948 6.054 6.26829 6.054 6.4927 5.83801L11.8929 0.628722C11.9554 0.568637 11.992 0.498261 11.9988 0.425241C12.0057 0.352221 11.9824 0.279347 11.9315 0.21454C11.8807 0.149733 11.8042 0.0954695 11.7105 0.0576458C11.6167 0.0198221 11.5092 -0.000114918 11.3996 4.76837e-07Z"
            fill="#999999"
          />
        </svg>
        <Box
          sx={{
            "& input": {
              opacity: 0,
              pointerEvents: "none",
              position: "absolute",
            },
            "& label": {
              cursor: "pointer",
              width: "26px",
              height: "26px",
              borderRadius: "4px",
              padding: "0",
              margin: "0",
              border: "1px solid #EFEFEF",
              outline: "none",
              background: value,
              display: "block",
            },
          }}
        >
          <label for={id}></label>

          <input
            type="color"
            id={id}
            value={value}
            onChange={handleChange}
            {...props}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ColorPicker;