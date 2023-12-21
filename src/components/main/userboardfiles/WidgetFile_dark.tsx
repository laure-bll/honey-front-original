import React from 'react';
import {Box, Typography} from "@mui/material";
import { getColorByType, getIconByType } from '../../IconFile';


interface Props {
    type: string;
    isSelected: boolean;
    onClick: () => void;
}

const WidgetFile = ({type, isSelected, onClick}: Props) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: "145px",
                py: "12px",
                px: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderRadius: "14px",
                backgroundColor: isSelected ? getColorByType(type) : "#0B203F " ,
                border: isSelected ? undefined : "1px solid #DFE7F5",
        }}>
            {getIconByType(type)}
            <Box sx={{flex: 1, display: "flex", justifyContent: "center"}}>

            <Typography sx={{fontSize: "18px", color: "white"}}>{getTypeTitle(type)}</Typography>
            </Box>
        </Box>
    );
};

const getTypeTitle = (type: string ) => {
    switch (true) {
        case type.includes("audio"):
            return "Music";
        case type.includes("video"):
            return "Video";
        case type.includes("image"):
            return "Image";
        default:
            return "All files"
    }
}

export default WidgetFile;