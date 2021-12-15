import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaParking } from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";

export default function HomeSidebar() {
    return (
        <div>
             <ProSidebar>
        <Menu iconShape="square">
          <MenuItem><input className="searchBar" placeholder="Search"></input></MenuItem>
          <SubMenu title="parkings" icon={<FaParking />}>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
        </div>
    )
}
