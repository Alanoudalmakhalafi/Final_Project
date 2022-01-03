import React from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css";

export default function Sidebar() {
  let decodedData;
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    decodedData = jwt_decode(storedToken, { payload: true });
  }
console.log(decodedData)

 

  return (
    <div className="sidebar">
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem icon={<RiAdminFill />}>
            <Link to="/Profile">Email</Link>
          </MenuItem>

          {(function () {
            if (decodedData !== undefined) {
              if (decodedData.userType === "admin") {
                return (
                  <>
                    <MenuItem>
                      <Link to="/AddNewParking">Add New Parking</Link>
                    </MenuItem>
                  </>
                );
              }
            }
          })()}

          <MenuItem>
            <Link to="/BookingList">Booking List</Link>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
}
