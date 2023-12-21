import { FormGroup, FormLabel, InputProps } from "@mui/material";
import React from "react";
import { COLORS } from "../../style/colors";
import BasicInput from "./BasicInput";

interface InputWithLabelProps extends InputProps {
  label: string;
}

const InputWithLabel = ({ label, ...rest }: InputWithLabelProps) => {
  return (
    <FormGroup
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <FormLabel
        sx={{
          color: COLORS.deepBlue,
          fontSize: "15px",
          fontWeight: 600,
          position: "relative",
          left: 10,
        }}
      >
        {label}
      </FormLabel>

      <BasicInput {...rest} />
    </FormGroup>
  );
};

export default InputWithLabel;
