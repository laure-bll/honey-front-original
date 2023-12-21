import React, {useEffect, useState} from "react";
import userIcon from "../assets/icons/users.png";
import storageIcon from "../assets/icons/storage.png";
import cloudIcon from "../assets/icons/cloud.png";
// import { baseConfig } from "../../config";
import {Card, Flex, Placeholder, useTheme, View,} from "@aws-amplify/ui-react";

import "./DashBoardLayout.css";


import OverviewUsers from "../pages/DashBoard/Graphs/OverviewUsers";

import CustomersSummary from "../pages/DashBoard/Graphs/CustomersSummary";
import {request} from "../Config/request";
import {SwitchAccount} from "@mui/icons-material";


export interface LayoutProps {
    children?: React.ReactNode;
}

/// Mock Data
const customersData = [
    {
        name: "New Customers",
        data: [50, 60, 140, 190, 180, 230],
    },
];
const getChartData = () =>
    new Promise((resolve, reject) => {
        if (!customersData) {
            return setTimeout(() => reject(new Error("no data")), 750);
        }

        setTimeout(() => resolve(Object.values(customersData)), 750);
    });

const DashboardLayout = () => {

    const [barChartData, setBarChartData] = useState<any | null>(null);
    const [trafficSourceData, setTrafficSourceData] = useState<any | null>(null);
    const {tokens} = useTheme();

    useEffect(() => {
        const doChartData = async () => {
            const result = await getChartData();
            setBarChartData(result);
            setTrafficSourceData([112332, 123221, 432334, 342334, 133432]);
        };

        doChartData();
    }, []);


    const [userCount, setUserCount] = useState<number | null>(null);
    const [storageCount, setStorageCount] = useState<number | null>(null);
    const [uploadedCount, setUploadedCount] = useState<number | null>(null);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await request('admin', "get", undefined);
                // const users = response.data;
                const usersCount = response.user;
                const storageCount = response.files;
                const uploadedCount = response.fileUpladToday;

                setUserCount(usersCount);
                setStorageCount(storageCount);
                setUploadedCount(uploadedCount);
                console.log("number of users : ", response)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);


    return (
        <div className="layout-container">
            <div className="page-container">
                <div className="welcome-container">Welcome to your administrator space.
                    Here, you can view all the activity on your website.
                </div>
                <div className="overview-container">Overview
                    <div className="grid_list">
                        <View rowSpan={{base: 1, large: 1}}>
                            <OverviewUsers
                                title="users"
                                amount={userCount !== null ? userCount.toString() : ''}
                                icon={<img src={userIcon}/>}
                            />
                        </View>
                        <View rowSpan={{base: 1, large: 1}}>
                            <OverviewUsers title="files"
                                           amount={storageCount !== null ? storageCount.toString() : ''}
                                           icon={<img src={storageIcon}/>}/>
                        </View>
                        <View rowSpan={{base: 1, large: 1}}>
                            <OverviewUsers title="files upload today"
                                           amount={uploadedCount !== null ? uploadedCount.toString() : ''}
                                           icon={<img src={cloudIcon}/>}/>
                        </View>
                        <View rowSpan={{base: 1, large: 1}}>
                            <OverviewUsers title="files per user"
                                           amount={(storageCount && userCount) ? (storageCount / userCount).toFixed(1).toString() : ""}
                                           icon={<SwitchAccount/>}/>
                        </View>
                    </div>
                </div>
                <View rowSpan={{base: 1, large: 4}}>
                    <Card height="100%" borderRadius="15px">
                        <div className="card-title">New Customers</div>
                        <div className="chart-wrap">
                            {barChartData ? (
                                <div className="row">
                                    <CustomersSummary
                                        title="CutomersSummary"
                                        data={customersData}
                                        type="line"
                                        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                                    />
                                </div>
                            ) : (
                                <Flex direction="column" minHeight="285px">
                                    <Placeholder size="small"/>
                                    <Placeholder size="small"/>
                                    <Placeholder size="small"/>
                                    <Placeholder size="small"/>
                                </Flex>
                            )}
                        </div>
                    </Card>
                </View>
            </div>
        </div>
    );
};

export default DashboardLayout;
