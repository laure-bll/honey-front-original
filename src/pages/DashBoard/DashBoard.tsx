import React from "react";

import DashboardLayout from "../../layouts/DashBoardLayout";
import "./Dashboard.css";
import SideBar from "../../components/SideBar/SideBar";


const Dashboard = () => {
  return (
    <>
        <SideBar/>
        <DashboardLayout/>
    </>

  );
};

export default Dashboard;
