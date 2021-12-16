import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem icon={<RiAdminFill />}>
            <Link to="/AdminProfile">Email</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/AllParking">all parking</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/AddNewParking">Add New Parking</Link>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
}
