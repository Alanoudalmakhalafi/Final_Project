import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiParkingFill } from "react-icons/ri";
import "react-pro-sidebar/dist/css/styles.css";

export default function HomeSidebar() {
  return (
    <div className="homeSidebar">
          {/* <SubMenu title="parking street name" icon={<RiParkingFill />}> */}
      <ProSidebar>
        <Menu iconShape="square">

          <MenuItem><input className="searchBar" placeholder="Search"/></MenuItem>
          <SubMenu title="parking street name">content</SubMenu>
          <SubMenu title="parking street name">content</SubMenu>
          <SubMenu title="parking street name">content</SubMenu>
          <SubMenu title="parking street name">content</SubMenu>
          

        </Menu>
      </ProSidebar>
    </div>
  );
}
