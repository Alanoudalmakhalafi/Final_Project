import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { Puff } from "react-loading-icons"
import DateTimePicker from 'react-datetime-picker'

export default function HomeSidebar({ onePark }) {
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
    return (
      <div className="loding">
        <Puff stroke="#D3AB63" strokeOpacity={0.125} speed={0.75} />
      </div>
    );
  }
  return (
    <div className="homeSidebar">
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>
            <input className="searchBar" placeholder="Search" />
          </MenuItem>
          {Object.keys(onePark).length !== 0 ? (
            <>
              <MenuItem title={onePark.StreetName}>
                 <div className="timePicker"><DateTimePicker onChange={onChange} value={value} /></div> 
                <div className="">
                  <img src={onePark.image} height="200px" width="200px" />
                  <p>{onePark.StreetName}</p>
                  <p>number Of Parking : {onePark.numberOfParking}</p>
                  <p>price : {onePark.price}</p>
                </div>
              </MenuItem>
            </>
          ) : (
            <>
              <p style={{ color: "black" }}>choose parking</p>
            </>
          )}
        </Menu>
      </ProSidebar>
    </div>
  );
}
