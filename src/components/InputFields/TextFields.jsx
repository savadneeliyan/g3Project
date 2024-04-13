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
          borderRadius: "8px",
          fontSize: "12px",
          lineHeight: "18px",
          "& .MuiOutlinedInput-input": {
            padding: "11px 16px",
            fontSize: "12px",
            lineHeight: "20px",
          },
          "& fieldset": {
            border: `1px solid #EFEFEF ${removeFocusedBorder && "!important"}`,
            borderRadius: "8px",
          },
        }}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {error && (
        <FormHelperText sx={{ ml: "10px", color: "red", fontSize: "10px" }}>
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
};
