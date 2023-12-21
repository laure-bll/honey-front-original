import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { COLORS } from "../style/colors";
import HangarAsset from "../assets/images/hangar.svg";

interface HomepageProps {
  content: JSX.Element;
}

const HomeLayout = ({ content }: HomepageProps) => {

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12} md={6} sx={{ background: COLORS.pastelPink, pl: "3%", pt: "5%", position: "relative", minHeight: "35vh" }}>
        <Box
          sx={{
            height: "50vh",
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            background: `url(${HangarAsset}) bottom left no-repeat`,
            backgroundSize: "70%",
            zIndex: 1
          }}
        />
        <Box sx={{ zIndex: 2, position: "relative" }}>
          <Typography
            component="h1"
            sx={{
              color: COLORS.yellow,
              fontSize: "100px",
              fontWeight: 700,
            }}
          >
            honee
          </Typography>
          <Typography
            component="h3"
            sx={{
              color: COLORS.deepBlue,
              fontSize: "25px",
              fontWeight: 600,
            }}
          >
            A new and easy way to store all your precious data.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ background: COLORS.cream }}>
        <Stack
          height="100%"
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
          margin={0}
        >
        {content}
        </Stack>
      </Grid>
    </Grid>
  )
}

export default HomeLayout;