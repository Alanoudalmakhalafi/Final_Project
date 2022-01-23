import React, { useRef, useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { GrLocationPin } from "react-icons/gr";
import axios from "axios";
import HomeSidebar from "./HomeSidebar";
import { FaCar } from "react-icons/fa";
import './home.css'

export default function Home() {
  const [userLat, setUserLat] = useState(0);
  const [userLon, setUserLon] = useState(0);
  const [parkingLocation, setParkingLocation] = useState([]);
  const [clickedParking, setClickedParking] = useState({})

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "91vh",
    latitude: 24.854,
    longitude: 46.7132,
    zoom: 10,
  });

  useEffect(() => {
    //   BUILT IN COMPONENT IN JAVASCRIPT THAT GETS THE CURRENT LOCATION OF THE DEVICE IF THE USER ALLOWS IT
    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
      // console.log("hello", position.coords.latitude);
      setUserLat(position.coords.latitude);
      // console.log("hello", position.coords.longitude);
      setUserLon(position.coords.longitude);
    }
  }, []);

  useEffect(() => {
    axios.get(" http://localhost:3001/user/allParking").then((res) => {
      console.log(res.data);
      setParkingLocation(res.data);
    });
  }, []);

  return (
    <div>
    <HomeSidebar onePark={clickedParking}/>
      <div className="clinic-map-container">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiYWxhbm91ZGFsbWFraGFsYWZpIiwiYSI6ImNrdzBtOTB5azR0cmwycGtsams4dWc5MmgifQ.qO7gX9ZWH080-ABIyYvpcw"
          onViewportChange={viewport => {
            setViewport(viewport);
          }}
        >
         <Marker
            longitude={userLon}
            latitude={userLat}
            offsetTop={-20}
            offsetLeft={-10}
          >
            <FaCar />
          </Marker>
          {parkingLocation.map((onePark) => {
            return (
              <Marker
                longitude={onePark.longitude}
                latitude={onePark.latitude}
                offsetTop={-20}
                offsetLeft={-10}
                onClick={() => {
                  setClickedParking(onePark)
                }}
              >
                <GrLocationPin />
              </Marker>
            );
          })}
        </ReactMapGL>
      </div>
    </div>
  );
}
