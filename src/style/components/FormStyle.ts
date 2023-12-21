import { SxProps } from "@mui/material";
import { COLORS } from "../colors";

export const BASIC_INPUT: SxProps = {
  background: "#FFF",
  borderRadius: "10px",
  minWidth: "356px",
  maxWidth: "100%",
  boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px;",
  ".MuiOutlinedInput-root": {
    border: "transparent",
  },
  ".MuiOutlinedInput-input": {
    borderLeft: "1px solid " + COLORS.lightestGrey,
    paddingLeft: 2,
  },
  ".Mui-focused, .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
};
