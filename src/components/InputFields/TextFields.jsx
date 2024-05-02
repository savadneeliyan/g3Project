import { FormHelperText, OutlinedInput } from "@mui/material";

export const NormalTextField = ({
  placeholder,
  value,
  handleChange,
  removeFocusedBorder,
  error,
  helperText,
  ...props
}) => {
  return (
    <div>
      <OutlinedInput
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          fontSize: "0.75rem",
          lineHeight: "1.125rem",
          "& .MuiOutlinedInput-input": {
            padding: "0.688rem 1rem",
            fontSize: "0.75rem",
            lineHeight: "1.25rem",
          },
          "& fieldset": {
            border: `0.063rem solid #EFEFEF ${
              removeFocusedBorder && "!important"
            }`,
            borderRadius: "0.5rem",
          },
        }}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
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
