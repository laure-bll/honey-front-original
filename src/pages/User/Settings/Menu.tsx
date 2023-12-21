import { Close, Menu as BurgerMenu } from "@mui/icons-material";
import HangarSideBackground from "../../../assets/images/hangarBlue.svg";
import { Box, IconButton, SwipeableDrawer, useMediaQuery } from "@mui/material";
import * as React from "react";
import { COLORS } from "../../../style/colors";
import { theme } from "../../..";

interface MenuProps {
  content: JSX.Element;
}

const Menu = ({ content }: MenuProps) => {
  const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));
  const [isOpened, setIsOpened] = React.useState<boolean>(isDesktopView);

  return (
    <>
      <IconButton
        onClick={() => setIsOpened(true)}
        sx={{
          position: "absolute",
          top: "0.5rem",
          left: "1rem",
          [theme.breakpoints.up("md")]: { display: "none" },
        }}
      >
        <BurgerMenu fontSize="large" />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        variant={isDesktopView ? "permanent" : "temporary"}
        open={isOpened}
        onClose={() => setIsOpened(false)}
        onOpen={() => setIsOpened(true)}
      >
        <Box
          role="presentation"
          onClick={() => setIsOpened(false)}
          onKeyDown={() => setIsOpened(false)}
          sx={{
            background: COLORS.pastelPink,
            backgroundSize: "cover",
            position: "relative",
            height: "100vh",
            zIndex: -1,
            padding: "2rem",
            minWidth: "350px",
            maxWidth: "100%",
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
            }}
          />
          <IconButton
            onClick={() => setIsOpened(false)}
            sx={{
              float: "right",
              top: "-1rem",
              [theme.breakpoints.up("md")]: {
                display: "none",
              },
            }}
          >
            <Close fontSize="large" />
          </IconButton>
          {content}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default Menu;
