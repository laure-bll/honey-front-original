import {Box, IconButton, Stack} from "@mui/material";
import * as React from "react";
import Honee from "../assets/images/honee.png";
import {Link, useNavigate} from "react-router-dom";
import {Settings} from "@mui/icons-material";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
                height: "60px",
                backgroundColor: "white",
                boxShadow: "0 4px 4px #0000000A",
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                zIndex: 100000,
                px: 4,
            }}
    >
            <Box>
                <Link to="/">
                    <img src={Honee}/>
                </Link>
            </Box>
            <Box>
                <IconButton onClick={() => navigate("/settings")}>
                    <Settings/>
                </IconButton>
            </Box>
    </Stack>
  );
};

export default Navbar;
