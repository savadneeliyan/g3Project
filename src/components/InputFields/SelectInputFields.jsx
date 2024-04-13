import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

export const SelectFieldWithOutBorder = ({ value, handleChange, ...props }) => {
  return (
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={value}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      onChange={handleChange}
      label="Age"
      IconComponent={() => <KeyboardArrowDownIcon />}
      sx={{
        "& fieldset": {
          display: "none",
        },
        "& .MuiInputBase-input": {
          fontSize: "13px",
          color: "#3F434A",
        },
      }}
      {...props}
    >
      <MenuItem value={"David Nowak"}>David Nowak</MenuItem>
    </Select>
  );
};

export const SelectFieldWithLabel = ({
  value,
  label,
  handleChange,
  optionList,
  error,
  helperText,
  ...props
}) => {
  return (
    <FormControl
      sx={{
        width: "100%",
        "& fieldset": {
          borderColor: "#EFEFEF !important",
          outline: "none",
          borderRadius: "8px",
          top: 0,
        },
        "& .MuiInputLabel-animated[data-shrink='true'] ": {
          display: "none",
        },
        "& .MuiOutlinedInput-input ": {
          padding: "9px 16px",
        },
        "& .MuiInputLabel-root  ": {
          transform: " translate(14px, 12px) scale(1)",
        },
        "& legend ": {
          display: "none",
        },
      }}
    >
      <InputLabel
        id="demo-simple-select-helper-label"
        sx={{
          color: "#707D89 !important",
          fontSize: "12px",
          lineHeight: "20px",
          transform: " translate(14px, 12px) scale(1)",
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value}
        label={label}
        onChange={handleChange}
        {...props}
      >
        {optionList?.map((item, i) => (
          <MenuItem key={i} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText sx={{ ml: "10px", color: "red", fontSize: "10px" }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const AutoCompleteSelectField = ({
  value,
  label,
  name,
  handleChange,
  handleAddnewButton,
  optionList,
  error,
  helperText
}) => {
  const [inpValue, setInpValue] = useState(value);
  const renderOption = (props, option) => {
    // if (option.type === "error") {
    //   return (
    //     <Box
    //       sx={{
    //         gap: "8px",
    //         display: "flex",
    //         justifyContent: "start",
    //         alignItems: "center",
    //         padding: "10px 15px",
    //         border: "1px solid #E5E5E5",
    //         borderRadius: "2px",
    //         mx: "10px",
    //         cursor: "pointer",
    //       }}
    //     >
    //       <div>
    //         <Typography
    //           sx={{
    //             color: "#263032",
    //             fontSize: "12px",
    //             fontWeight: "400",
    //           }}
    //         >
    //           We didn't find any milestone with that name."Main install"
    //         </Typography>
    //       </div>
    //     </Box>
    //   );
    // } else
    if (option === "customButton") {
      return (
        <Box
          onClick={handleAddnewButton}
          sx={{
            gap: "8px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            padding: "10px 15px",
            border: "1px solid #E5E5E5",
            borderRadius: "2px",
            mx: "10px",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
              backgroundColor: "#EDEDF6",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 4.78846V7.21154H7.21154V11.25H4.78846V7.21154H0.75V4.78846H4.78846V0.75H7.21154V4.78846H11.25Z"
                fill="#000080"
              />
            </svg>
          </Box>
          <Typography
            sx={{
              color: "#000080",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            {"New milestone"}
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            gap: "8px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            padding: "10px 15px",
            border: "1px solid #E5E5E5",
            borderRadius: "2px",
            mx: "10px",
            cursor: "pointer",
          }}
        >
          <div>
            <Typography
              sx={{
                color: "#263032",
                fontSize: "12px",
                fontWeight: "400",
              }}
            >
              {option}
            </Typography>
          </div>
        </Box>
      );
    }
  };

  const filterOptions = (options, { inputValue }) => {
    if (!inputValue.trim()) {
      return options;
    }

    let results = options.filter(
      (option) =>
        option.toLowerCase().includes(inputValue.toLowerCase()) ||
        option === "customButton"
    );

    return results;
  };

  return (
    <div>
      {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={optionList}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handleChange}
            name={name}
            value={value}
            label="freeSolo"
          />
        )}
      /> */}
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        value={inpValue}
        options={optionList}
        renderOption={renderOption}
        renderInput={(params) => (
          <TextField
            onChange={handleChange}
            {...params}
            name={name}
            value={value}
            placeholder="Please type"
            sx={{
              color: "#707D89",
              background: "#ffffff",
              borderRadius: "8px",
              overflow: "hidden",
              "& .MuiAutocomplete-input::placeholder": {
                color: "#707D89 !important",
                opacity: "1",
              },
              "& fieldset": {
                border: "1px solid #EFEFEF !important",
                borderRadius: "8px",
              },
              "& .MuiAutocomplete-input": {
                fontSize: "12px",
                lineHeight: "20px",
                padding: "0 !important",
              },
              "& .MuiOutlinedInput-root": {
                py: "11px",
                px: "15px !important",
              },
            }}
          />
        )}
        filterOptions={filterOptions}
      />
      {error && (
        <FormHelperText sx={{ ml: "10px", color: "red", fontSize: "10px" }}>
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
};
