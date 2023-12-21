import * as React from "react";
import { InputAdornment, SvgIconTypeMap, OutlinedInputProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { COLORS } from "../../style/colors";
import BasicInput from "./BasicInput";

interface InputProps extends OutlinedInputProps {
  StartIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  customColor?: string;
}

const InputWithIcon = ({StartIcon, customColor = COLORS.lightGrey, ...rest}: InputProps) => (
  <BasicInput
    customColor={customColor}
    startAdornment={
      <InputAdornment position="start">
        <StartIcon sx={{ fill: customColor }}/>
      </InputAdornment>
    }
    {...rest}
  />
)

export default InputWithIcon;