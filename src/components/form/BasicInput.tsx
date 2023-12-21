import * as React from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import { CustomStyle } from "../../style/components";

interface BasicInputProps extends OutlinedInputProps {
  customColor?: string;
}

const BasicInput = ({ customColor, ...rest }: BasicInputProps) => (
  <OutlinedInput
    sx={{
      ...CustomStyle.BASIC_INPUT,
      color: customColor,
    }}
    {...rest}
  />
);

export default BasicInput;