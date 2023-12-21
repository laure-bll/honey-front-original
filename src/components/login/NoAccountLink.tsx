import React from "react";
import { Box, Typography } from "@mui/material"
import { COLORS } from "../../style/colors";
import { Link } from "react-router-dom";

const NoAccountLink = () => (
    <Box sx={{
      "& *": { fontSize: "20px" }
    }}>
      <Typography
        component="span"
        sx={{
          color: COLORS.deepBlue,
          fontWeight: 300,
        }}
      >
        Don't have any account ?
      </Typography>
      <Link
        style={{
          color: COLORS.darkOrange,
          fontWeight: 500,
          cursor: "pointer",
          textDecoration: "none",
          marginLeft: "1rem"
        }}
        to={"/signup"}
      >
        Sign up
    </Link>
  </Box>
)

export default NoAccountLink;