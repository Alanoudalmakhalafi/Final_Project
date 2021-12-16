import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem icon={<RiAdminFill />}>profile</MenuItem>
          
            <MenuItem>all parking</MenuItem>
            <MenuItem><Link to="/AddNewParking">Add New Parking</Link></MenuItem>
            <MenuItem>Add New services</MenuItem>
           
        </Menu>
      </ProSidebar>
    </div>
  );
}
