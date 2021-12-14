import React, { useRef, useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { GrLocationPin } from "react-icons/gr";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [parkingLocation, setParkingLocation] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "91vh",
    latitude: 24.854,
    longitude: 46.7132,
    zoom: 10,
  });

  useEffect(() => {
    axios.get(" http://localhost:3001/user/allParking").then((res) => {
      console.log(res.data);
      setParkingLocation(res.data);
    });
  }, []);

  return (
    <div>
      <div className="clinic-map-container">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiYWxhbm91ZGFsbWFraGFsYWZpIiwiYSI6ImNrdzBtOTB5azR0cmwycGtsams4dWc5MmgifQ.qO7gX9ZWH080-ABIyYvpcw"
          onViewportChange={viewport => {
            setViewport(viewport);
          }}
        >
          {parkingLocation.map((e) => {
            return (
              <Marker
                longitude={e.longitude}
                latitude={e.latitude}
                offsetTop={-20}
                offsetLeft={-10}
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
