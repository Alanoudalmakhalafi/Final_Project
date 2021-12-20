import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Calendar from "react-calendar";
import {SpinningCircles} from 'react-loading-icons'

export default function HomeSidebar() {
  const [parkings, setParkings] = useState();
  const [Loding, setLoding] = useState(true);
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    axios.get(" http://localhost:3001/user/allParking").then((res) => {
      console.log(res.data);
      setParkings(res.data);
      setLoding(false);
    });
  }, []);

  
  //loding
  if (Loding) {
    return <div className="loding"><SpinningCircles stroke="#D3AB63"  strokeOpacity={2} speed={.5} /></div>
  
  }
  return (
    <div className="homeSidebar">
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>
            <input className="searchBar" placeholder="Search" />
           

          </MenuItem>
          <MenuItem>
            <Calendar
              onChange={onChange}
              value={value}
              calendarType="Arabic"
              locale="en-US"
            />
            <p className="text-center">
              <span className="bold">Selected Date:</span>{" "}
              {value.toDateString()}
            </p>
          </MenuItem>

          {parkings.map((p) => {
            return (
              <SubMenu title={p.StreetName}>
                <div className="">
                  <img src={p.image} height="200px" width="200px" />
                  <p>{p.StreetName}</p>
                  <p>number Of Parking : {p.numberOfParking}</p>
                  <p>price : {p.price}</p>
                </div>
              </SubMenu>
            );
          })}
        </Menu>
      </ProSidebar>
    </div>
  );
}
