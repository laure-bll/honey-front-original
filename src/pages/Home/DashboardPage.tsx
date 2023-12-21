import {Box, IconButton, Input, InputAdornment, Stack} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import ListFiles from "../../components/main/ListFiles";
import {request} from "../../Config/request";
import {dataItem} from "../../components/main/ListItem";
import UserInfo from "../../components/main/UserInfo";
import {Search, Settings} from "@mui/icons-material";
import Honee from "../../assets/images/honee.png";
import {Link, useNavigate} from "react-router-dom";

const DashboardPage = () => {
    const navigate = useNavigate();

    const [listItems, setListItems] = useState<dataItem[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        (async () => {
            const data = await request("file", "get", undefined);
            setListItems(data);
        })();
    }, []);

    return (
        <Box sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FBFBFB"
        }}>
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
            px:4
        }}
      >
          <Box>
              <Link to="/">
                  <img src={Honee}/>
              </Link>
          </Box>
          <Input
              sx={{bgcolor: "#F4F4F4", borderRadius: "10px", width: "450px", px: 1}}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              disableUnderline
              placeholder="Search"
              startAdornment={
                  <InputAdornment position="start">
                      <Search/>
                  </InputAdornment>
              }
          />
          <Box>
              <IconButton onClick={() => navigate("/settings")}>
                  <Settings/>
              </IconButton>
          </Box>
      </Stack>
            <Box sx={{flex: 1, display: "flex", overflow: "hidden", mt: "60px"}}>
                <ListFiles data={listItems.filter(x => x.name.includes(searchValue))}/>
                <Box sx={{width: "400px", backgroundColor: "white"}}>
                    <UserInfo/>
                </Box>
            </Box>
        </Box>
  );
};

export default DashboardPage;
