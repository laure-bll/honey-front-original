import { FormLabel, FormLabelProps } from "@mui/material";
import React from "react";
import { COLORS } from "../../style/colors";

interface BasicLabelProps extends FormLabelProps {
  content: string;
}

const BasicLabel = ({ content, ...rest }: BasicLabelProps) => {
  return (
    <FormLabel
      sx={{
        color: COLORS.deepBlue,
        fontSize: "15px",
        fontWeight: 600,
        position: "relative",
        left: 10,
      }}
      {...rest}
    >
      {content}
    </FormLabel>
  );
};

export default BasicLabel;
