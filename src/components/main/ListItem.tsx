import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import {formatFileSize} from "../../helpers/Convert";
import {getIconByType} from "../IconFile";
import {DeleteOutline, Download} from "@mui/icons-material";
import { dowloadFile, request } from "../../Config/request";

interface Props {
    data: dataItem;
}

export interface dataItem {
    id: string;
    name: string;
    size: number;
    type: string;
    created: string;
    downloadUrl: string;
    bytes: any;
}


const ListItem = ({data}: Props) => {

    const date = new Date(data.created);
    const infoIcon = getIconByType(data.type);

    const onDownload = async () => {
      const response = await dowloadFile(`file/download/${data.id}`);
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", data.name);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    };
    const onDelete = async () => {
        console.log("Delete")
        await request("file", "delete", {
            idFile: data.id
        })
    }


    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "rgba(255,246,238,0.25)",
                borderRadius: "20px",
                px: "18px",
                py: "10px",
                color: "#979797"
            }}
        >
            <Box className="icons" sx={{width: "45px"}}>{infoIcon}</Box>
            <Box className="name" sx={{flex: 5, overflowX: "hidden"}}>
                <Typography sx={{
                    color: "#113883",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflowX: "hidden"
                }}>{data.name}</Typography>
            </Box>
            <Box className="size" sx={{flex: 1}}>
                <Typography>{formatFileSize(data.size, 1)}</Typography>
            </Box>
            <Box className="date" sx={{flex: 1}}>
                <Typography sx={{whiteSpace: "nowrap"}}>{date.toLocaleDateString(undefined, {day: "numeric", month: "long"})}</Typography>
            </Box>
            <Box className="action" sx={{width: "80px"}}>
                <IconButton onClick={onDownload}>
                    <Download sx={{color: "#113883"}}/>
                </IconButton>
                <IconButton onClick={onDelete}>
                    <DeleteOutline sx={{color: "#CC7474"}}/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default ListItem;