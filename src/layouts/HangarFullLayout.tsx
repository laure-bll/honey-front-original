import { Box } from "@mui/material";
import HangarFullBackground from "../assets/images/hangarFull.svg";
import * as React from "react";
import { COLORS } from "../style/colors";

interface HangarFullLayoutProps {
  content: JSX.Element;
}

const HangarFullLayout = ({ content }: HangarFullLayoutProps) => (
  <Box
    sx={{
      background: `url(${HangarFullBackground}) center`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: "hidden",
      padding: 0,
      margin: 0,
    }}
  >
    <Box
      sx={{
        background: COLORS.basicGrey,
        backgroundSize: "cover",
        position: "absolute",
        top: 0,
        height: "100%",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
    />
    <Box sx={{ maxHeight: "100%", maxWidth: "100%", overflowY: "auto" }}>{content}</Box>
  </Box>
);

export default HangarFullLayout;
