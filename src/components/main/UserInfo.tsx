import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Box, Button, CircularProgress, Typography} from "@mui/material";
import {request} from "../../Config/request";
import {formatFileSize} from "../../helpers/Convert";
import {CloudUpload} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface Props {
    // user: any;
}

interface User {
    isAdmin: boolean;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    dateCreated: any;
    files: string[];
    storage: { max: number; used: number };
}

const UserInfo = ({}: Props) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
      (async () => {
        const userConnected: User = await request("auth");
        console.log(userConnected);
        setUser(userConnected);
      })();
    }, []);

    const pushFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
      if (e.target.files && e.target.files.length) {
        const formData = new FormData();
        formData.append("filename", e.target.files[0]);
        await request("file", "post", formData);
      }
    };

    if (!user) return <Box />;
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: "20px",
          gap: "22px",
        }}
      >
        <Typography sx={{ fontSize: "18px", color: "#113883" }}>
          Welcome, <span style={{ color: "#FBA24F" }}>{user.firstName}</span>
        </Typography>
        <Box
          sx={{
            backgroundColor: "#FBF9F9",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            py: "20px",
          }}
        >
          <Box sx={{ position: "relative", height: "200px", width: "200px", px: "20px" }}>
            <CircularProgress
              size={200}
              value={100}
              variant="determinate"
              sx={{ position: "absolute", color: "white" }}
            />
            <CircularProgress
              size={200}
              value={(user.storage.used * 100) / user.storage.max}
              variant="determinate"
              sx={{ position: "absolute" }}
            />
            <Avatar
              sx={{
                bgcolor: "#A96846",
                height: "168px",
                width: "168px",
                position: "absolute",
                top: "16px",
                left: "36px",
                fontSize: "48px",
              }}
            >
              {user.firstName[0]}
            </Avatar>
          </Box>
          <Typography sx={{ fontWeight: "600", color: "#113883" }}>Your storage</Typography>
          <Typography
            sx={{
              color: "#7A7A7A",
              fontSize: "12px",
            }}
          >
            {formatFileSize(user.storage.used)} of {formatFileSize(user.storage.max)} are used
          </Typography>
          <Button
            sx={{ bgcolor: "#FBA24F", color: "white", textTransform: "none", "&:hover": { bgcolor: "#efae75" } }}
            onClick={() => navigate("/payment")}
          >
            Buy more storage
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: "46px ", cursor: "pointer" }}>
          <label htmlFor="files" className="btn">
            <Box
              sx={{
                border: "1px #000000 dashed",
                borderRadius: "10px",
                p: "20px 35px",
                textAlign: "center",
                color: "#113883",
              }}
            >
              <CloudUpload sx={{ fontSize: "30px" }} />
              <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>Upload your File</Typography>
              <Typography sx={{ fontWeight: 400, color: "#CCCCCC", fontSize: "12px your" }}>
                support all files format
              </Typography>
            </Box>
          </label>
          <input id="files" style={{ visibility: "hidden" }} type="file" onChange={pushFile} />
        </Box>
      </Box>
    );
};

export default UserInfo;