import React from 'react';
import {Audiotrack, Description, Image, VideoLibrary} from '@mui/icons-material';
import {Box} from "@mui/material";

const defaultStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: "4px",
    borderRadius: "40px",
    height: "27px",
    width: "27px",
}

export const getIconByType = (type: string) => {
    switch (true) {
        case type.includes("image"):
            return (
                <Box sx={{
                    ...defaultStyle,
                    backgroundColor: "#FDE7E6",
                }}>
                    <Image sx={{color: "#D16D6A", fontSize: "25px"}}/>
                </Box>
            )

        case type.includes("video"):
            return (
                <Box sx={{
                    ...defaultStyle,
                    backgroundColor: "#E1DCFA",
                }}>
                    <VideoLibrary sx={{color: "#8A7EBE", fontSize: "25px"}}/>
                </Box>)

        case type.includes("audio"):
            return (
                <Box sx={{
                    ...defaultStyle,
                    backgroundColor: "#FCF3D8",
                }}>
                    <Audiotrack sx={{color: "#EBC351", fontSize: "25px"}}/>
                </Box>)

        default:
            return (
                <Box sx={{
                    ...defaultStyle,
                    backgroundColor: "#B9D3EF",
                }}>
                    <Description sx={{color: "#1F5693", fontSize: "25px"}}/>
                </Box>)
    }
}
export const getColorByType = (type: string) => {
    switch (true) {
        case type.includes("image"):
            return "#FDE7E6"

        case type.includes("video"):
            return "#E1DCFA"

        case type.includes("audio"):
            return "#FCF3D8"

        default:
            return "#B9D3EF"
    }
}
