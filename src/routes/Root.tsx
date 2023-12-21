import * as React from "react";
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/Home/LoginPage";
import NotFound from "../pages/Error/NotFound";
import SignupPage from "../pages/Home/SignupPage";
import DashBoard from "../pages/DashBoard/DashBoard";
import UsersBoard from "../pages/DashBoard/UsersBoard";

import IncreaseStorage from "../pages/User/IncreaseStorage/IncreaseStorage";
import Settings from "../pages/User/Settings/Settings";
import {connectedUser, isTokenValid} from "../Config/Auth";
import DashboardPage from "../pages/Home/DashboardPage";

const Root = () => {

    const isUserConnected = isTokenValid();

    const [user, setUser] = useState<any>(undefined)
    const isAdmin = user?.isAdmin || false;

    useEffect(() => {
        (async () => {
            setUser(await connectedUser())
        })()
    }, [isUserConnected])

    if (!isUserConnected)
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      );

    if (isAdmin)
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/usersboard" element={<UsersBoard />} />
            <Route path="/logout" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      );
    else
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/payment" element={<IncreaseStorage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<LoginPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      );
};

export default Root;
