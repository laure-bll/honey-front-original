import React from "react";
import { COLORS } from "../../style/colors";
import { Typography } from "@mui/material";

const SignupTitle = () => (
  <Typography
    component="h2"
    sx={{
        fontSize: "40px",
        fontWeight: 600,
        mt: 3,
        color: COLORS.deepBlue
    }}
  >
   Create an account
  </Typography>
);

export default SignupTitle;
