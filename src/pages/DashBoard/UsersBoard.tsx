import React from "react";

import "./Dashboard.css";
import SideBar from "../../components/SideBar/SideBar";
import UsersLayout from "../../layouts/UsersLayout";
import {Box} from "@mui/material";


const UsersBoard = () => {
  return (
      <Box>
          <SideBar/>
          <UsersLayout/>
      </Box>
  );
};

export default UsersBoard;
