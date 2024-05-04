import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SelectFieldWithOutBorder = ({ value, handleChange, ...props }) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("userDetails");
    navigate("/login");
  };
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
          padding: "1.031rem 0.875rem !important",
        },
      }}
      {...props}
    >
      <MenuItem
        value={"David Nowak"}
        sx={{
          "&.MuiMenuItem-root": {
            padding: "0.375rem 1rem",
          },
        }}
      >
        David Nowak
      </MenuItem>
      <MenuItem
        value={"logout"}
        sx={{
          "&.MuiMenuItem-root": {
            padding: "0.375rem 1rem",
          },
        }}
        onClick={handleLogOut}
      >
        Log Out
      </MenuItem>
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
  component,
  
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
          padding: "0.688rem 1rem",
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
        sx={{
          fontSize: "0.813rem",
          fontSize: "0.75rem",
          "& .MuiMenu-list": {
            padding: "0.625rem 0 !important",
          },
        }}
      >
        {optionList?.map((item, i) => (
          <MenuItem
            sx={{
              padding: "0.625rem 0.938rem !important",
              fontSize: "0.813rem",
              fontSize: "0.75rem",
              fontWeight: "500",
            }}
            key={i}
            value={component === "template_type" ? item.template_name : item}
          >
            {component === "template_type" ? item.template_name : item}
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

export const MilestoneInput = ({
  value,
  label,
  name,
  handleChange,
  handleAddnewButton,
  optionList,
  error,
  helperText,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [openList, setOpenList] = useState(false);
  const choices = [
    {
      name: "adam",
      label: "Adam",
      pk: 1,
    },
    {
      name: "eva",
      label: "Eva",
      pk: 2,
    },
    {
      name: "barbra",
      label: "Barbra",
      pk: 3,
    },
  ];
  // console.log(optionList);

  return (
    <>
      {openList && (
        <Box
          onClick={() => setOpenList(false)}
          sx={{
            position: "absolute",
            top: "0",
            bottom: "0",
            right: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            // background: "red",
            zIndex: "1200",
          }}
        ></Box>
      )}
      <Autocomplete
        value={value}
        sx={{
          zIndex: "1200",
          position: "relative",
          fontSize: "0.75rem",
          fontWeight: "500",
          "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
            padding: "0.375rem 2.438rem 0.375rem 1rem !important",
            backgroundColor: "#FFFFFF",
            border: "0.063px solid #EFEFEF",
            borderRadius: "0.5rem",
          },
          "& fieldset": {
            display: "none",
          },
          "& .MuiAutocomplete-input": {
            padding: "0.688rem 1rem",
            fontSize: "0.75rem",
            lineHeight: "1.25rem",
          },
          "& .MuiOutlinedInput-input": {
            padding: "0.25rem 0 !important",
            fontSize: "0.75rem",
            lineHeight: "1.25rem",
          },
        }}
        onChange={() => {
          handleChange(option);
          setOpenList(false);
        }}
        open={openList}
        id="merchant-autocomplete"
        options={optionList}
        name={name}
        getOptionLabel={(option) => option.name || ""}
        isOptionEqualToValue={(option, value) => option === value}
        renderOption={(props, option) => {
          return (
            <Box
              {...props}
              justifyContent="space-between"
              spacing={2}
              p={4}
              onClick={() => {
                handleChange(option);
                setOpenList(false);
              }}
              sx={{ fontSize: "0.75rem", fontWeight: "500" }}
            >
              {option.name}
            </Box>
          );
        }}
        noOptionsText={`We didn't find any milestone with that name.${inputValue}`}
        renderInput={(params) => {
          return (
            <>
              <TextField
                {...params}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setOpenList(true);
                }}
                onFocus={() => setOpenList(true)}
                size="small"
                placeholder={label}
                error={error}
                helperText={helperText}
                sx={{
                  width: "100%",
                  borderRadius: "0.5rem",
                  fontSize: "0.75rem",
                  lineHeight: "1.125rem",
                  "& .MuiInputBase-root": {
                    backgroundColor: "#fff",
                    pl: "1rem",
                  },
                  "& .MuiFormHelperText-root": {
                    marginLeft: "0.625rem",
                    color: "red !important",
                    fontSize: "0.625rem",
                  },
                }}
              />
            </>
          );
        }}
        PaperComponent={({ children }) => {
          return (
            <Paper
              sx={{
                padding: "0",
                "& .MuiAutocomplete-noOptions": {
                  backgroundColor: "#F5C6CB !important",
                  color: "#721C24",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  fontSize: "0.813rem",
                },
                "& .MuiAutocomplete-option": {
                  padding: "0.625rem 0.938rem",
                  fontSize: "0.813rem",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                },
                "& .MuiAutocomplete-listbox": {
                  padding: "0.5rem 0",
                  maxHeight: "30vh",
                },
              }}
            >
              <Box>{children}</Box>
              <Box
                onClick={() => {
                  setOpenList(false);
                  handleAddnewButton();
                }}
                sx={{
                  position: "relative",
                  zIndex: "10",
                  gap: "0.5rem",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  padding: "0.625rem 0.938rem",
                  borderTop: "0.063rem solid #E5E5E5",
                  borderRadius: "0.125rem",
                  // mx: "0.625rem",
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
                    "& svg": {
                      width: "0.75rem",
                      height: "0.75rem",
                    },
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
            </Paper>
          );
        }}
      />
    </>
  );
};
