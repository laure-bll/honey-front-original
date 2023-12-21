import React, {useState} from 'react';
import {Box, Typography} from "@mui/material";
import ListItem, {dataItem} from "./ListItem_dark";
import WidgetFile from "./WidgetFile_dark";

interface Props {
    data: dataItem[];
}

const ListFiles = ({data}: Props) => {


    console.log("data", data);
    const [menuSelected, setMenuSelected] = useState<string>("");

    return (
        <Box sx={{flex: "1", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box sx={{flex: 1, display: "flex", flexDirection: "column", alignItems: "center", py: "46px", gap: "46px",}}>
                <Box sx={{display: "flex", gap: "40px", mx: "60px"}}>
                    {["", "audio", "video", "image"].map((x: string, i) => (
                        <WidgetFile key={i} type={x} isSelected={menuSelected === x}
                                    onClick={() => setMenuSelected(x)}/>
                    ))}
                </Box>
                <Box sx={{flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", width: "100%", gap: "15px",}}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            
                            borderRadius: "20px",
                            px: "18px",
                            py: "10px",
                            color: "grey"
                        }}
                    >
                        <Box className="icons" sx={{width: "45px"}}></Box>
                        <Box className="name" sx={{flex: 5, overflowX: "hidden"}}>
                            <Typography>Name</Typography>
                        </Box>
                        <Box className="size" sx={{flex: 1}}>
                            <Typography>Size</Typography>
                        </Box>
                        <Box className="date" sx={{flex: 1}}>
                            <Typography sx={{whiteSpace: "nowrap"}}>Date added</Typography>
                        </Box>
                        <Box className="action" sx={{width: "80px"}}>
                        </Box>
                    </Box>
                    <Box sx={{flex: 1, display: "flex", flexDirection: "column", overflowY: "scroll", gap: "8px",}}>

                        {
                            data.map((x: dataItem, i) => (
                                <ListItem key={i} data={x}/>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ListFiles;