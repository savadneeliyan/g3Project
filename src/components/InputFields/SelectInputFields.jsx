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
          fontSize: "0.813rem",
          color: "#3F434A",
        },
        "& .MuiSelect-select": {
          padding: "1.031rem 0.875rem",
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
          borderRadius: "0.5rem",
          top: 0,
        },
        "& .MuiInputLabel-animated[data-shrink='true'] ": {
          display: "none",
        },
        "& .MuiOutlinedInput-input ": {
          padding: "0.563rem 1rem",
        },
        "& .MuiInputLabel-root  ": {
          transform: " translate(0.875rem, 0.75rem) scale(1)",
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
          fontSize: "0.75rem",
          lineHeight: "1.25rem",
          transform: " translate(0.875rem, 0.75rem) scale(1)",
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
        {/* {console.log(optionList)} */}
        {optionList?.map((item, i) => (
          <MenuItem key={i} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText
          sx={{ ml: "0.625rem", color: "red", fontSize: "0.625rem" }}
        >
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
  helperText,
}) => {
  const [inpValue, setInpValue] = useState(value);
  const renderOption = (props, option) => {
    // if (option.type === "error") {
    //   return (
    //     <Box
    //       sx={{
    //         gap: "0.5rem",
    //         display: "flex",
    //         justifyContent: "start",
    //         alignItems: "center",
    //         padding: "0.625rem 0.938rem",
    //         border: "0.063rem solid #E5E5E5",
    //         borderRadius: "0.125rem",
    //         mx: "0.625rem",
    //         cursor: "pointer",
    //       }}
    //     >
    //       <div>
    //         <Typography
    //           sx={{
    //             color: "#263032",
    //             fontSize: "0.75rem",
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
            gap: "0.5rem",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            padding: "0.625rem 0.938rem",
            border: "0.063rem solid #E5E5E5",
            borderRadius: "0.125rem",
            mx: "0.625rem",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              padding: "0.625rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.375rem",
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
              fontSize: "0.75rem",
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
            gap: "0.5rem",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            padding: "0.625rem 0.938rem",
            border: "0.063rem solid #E5E5E5",
            borderRadius: "0.125rem",
            mx: "0.625rem",
            cursor: "pointer",
          }}
        >
          <div>
            <Typography
              sx={{
                color: "#263032",
                fontSize: "0.75rem",
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
              borderRadius: "0.5rem",
              overflow: "hidden",
              "& .MuiAutocomplete-input::placeholder": {
                color: "#707D89 !important",
                opacity: "1",
              },
              "& fieldset": {
                border: "0.063rem solid #EFEFEF !important",
                borderRadius: "0.5rem",
              },
              "& .MuiAutocomplete-input": {
                fontSize: "0.75rem",
                lineHeight: "1.25rem",
                padding: "0 !important",
              },
              "& .MuiOutlinedInput-root": {
                py: "0.688rem",
                px: "0.938rem !important",
              },
            }}
          />
        )}
        filterOptions={filterOptions}
      />
      {error && (
        <FormHelperText
          sx={{ ml: "0.625rem", color: "red", fontSize: "0.625rem" }}
        >
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
};


// export 