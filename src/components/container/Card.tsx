import React from "react";
import { Box } from "@mui/material";

interface CardProps {
  content: JSX.Element;
  fullWidth?: boolean;
}

const Card = ({ content, fullWidth = false }: CardProps) => {
  return (
    <Box
      sx={{
        width: fullWidth ? "100%" : "inital",
        display: "inline-flex",
        padding: "2rem 3rem",
        // padding: " 48px 48px 75px 33px",
        alignItems: "center",
        borderRadius: "10px",
        background: "#FFF",
      }}
    >
      {content}
    </Box>
  );
};

export default Card;
