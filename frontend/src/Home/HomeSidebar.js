import React, { useState, useEffect, useRef } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import axios from "axios";
import { Puff } from "react-loading-icons"
import DateTimePicker from 'react-datetime-picker'
import jwt_decode from "jwt-decode";
import "react-pro-sidebar/dist/css/styles.css";
import "react-calendar/dist/Calendar.css";
import {useNavigate} from 'react-router-dom'


export default function HomeSidebar({ onePark }) {
  const [parkings, setParkings] = useState();
  const [value, onChange] = useState(new Date());
  const [UserParking, setUserParking] = useState([])
  const startTime = useRef(null)
  let navigate = useNavigate()

  let decodedData
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
   decodedData = jwt_decode(storedToken, { payload: true });
  }


  const bookingParking = () => {
    console.log(Date.parse(value))
    axios.post(`http://localhost:3001/user/bookingParking`,
    {
      parking: onePark._id,
      user: decodedData.id,
      startTime: Date.parse(value),            
    })
    .then(
      (res) => {
        console.log(res);
        setUserParking(res.data);
        navigate('/BookingList')
      },
      (err) => {
        console.log(err);
      })}


  //loding
  // if (Loding) {
  //   return (
  //     <div className="loding">
  //       <Puff stroke="#D3AB63" strokeOpacity={0.125} speed={0.75} />
  //     </div>
  //   );
  // }
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
                 <div className="timePicker">
                 <DateTimePicker onChange={onChange} format= {"y-MM-dd h:mm a"} value={value} ref={startTime} locale="en-US" />

                 </div> 
                <div className="">

                  <img src={onePark.image} height="200px" width="200px" />
                  <p>{onePark.StreetName}</p>
                  <p>number Of Parking : {onePark.numberOfParking}</p>
                  <p>price : {onePark.price}</p>
                  <button onClick={bookingParking}>book</button>
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
