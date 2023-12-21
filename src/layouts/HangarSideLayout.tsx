import { Box, Grid } from "@mui/material";
import HangarSideBackground from "../assets/images/hangarBlue.svg";
import * as React from "react";
import { COLORS } from "../style/colors";

interface HangarSideLayoutProps {
  sideContent: JSX.Element;
  content: JSX.Element;
}

const HangarSideLayout = ({ sideContent, content }: HangarSideLayoutProps) => (
  <Grid container>
    <Grid
      item
      xs={12}
      md={3}
      sx={{
        background: COLORS.pastelPink,
        backgroundSize: "cover",
        position: "relative",
        height: "100vh",
        zIndex: -1,
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          background: `url(${HangarSideBackground})bottom`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          height: "100%",
          left: 0,
          bottom: 0,
          right: 0,
          width: "100%",
          position: "absolute",
          zIndex: 2,
        }}
      />
      {sideContent}
    </Grid>
    <Grid item xs={12} md={9} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Box>{content}</Box>
    </Grid>
  </Grid>
);

export default HangarSideLayout;
