import React, { useState } from "react";
import "./SideBar.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@mui/material";

export interface NavItemData {
  eventKey?: string;
  title?: string;
  icon?: any;
  to?: any;
  target?: string;
  children?: NavItemData[];
}

export interface SidebarNavProps {
  navs?: NavItemData[];
}

const SideBarNav = (props: SidebarNavProps) => {
  const { navs } = props;
  let activeClassName = "active";

  return (
    <div className="sidebar-nav">
      <div className="nav-title">honee</div>
      <div className="circle-logo"></div>
      <ul>
        {navs?.map((item) => {
          const { children, ...rest } = item;

          if (children) {
            return (
              
            <div className="container-nav">  <li key={item.eventKey}>
             <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
                 
                >
                  <Icon>{item.icon}</Icon>
                  {item.title}
                </NavLink>

            
              </li></div>
            );
          }

          if (rest.target === "_blank") {
            return <></>;
          }

        
        })}
      </ul>
    </div>
  );
};

export default SideBarNav;
