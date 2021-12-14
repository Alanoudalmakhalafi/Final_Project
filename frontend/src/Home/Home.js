import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl'
import { GrLocationPin } from 'react-icons/gr';
import { Link } from "react-router-dom";
import axios from 'axios'

export default function Home() {
    const [parkingLocation, setParkingLocation] = useState([])
    const [ userLat, setUserLat ] = useState(0)
    const [ userLon, setUserLon ] = useState(0)
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "91vh",
        latitude: 24.8540,
        longitude: 46.7132,
        zoom: 10
      })

      useEffect(()=>{
          axios
          .get(" http://localhost:3001/user/allParking")
          .then((res) => {
            console.log(res.data)   
            setParkingLocation(res.data)
            
            })  
      },[])  
//     useEffect(() => {
// //   BUILT IN COMPONENT IN JAVASCRIPT THAT GETS THE CURRENT LOCATION OF THE DEVICE IF THE USER ALLOWS IT
//         navigator.geolocation.getCurrentPosition(showPosition);

//         function showPosition(position) {
//           setUserLat(position.coords.latitude)
//         setUserLon(position.coords.longitude)
//       }
//     }, [])

    return (
        <div>
          <div className="clinic-map-container">
        
        <ReactMapGL {...viewport} mapboxApiAccessToken="pk.eyJ1IjoiYWxhbm91ZGFsbWFraGFsYWZpIiwiYSI6ImNrdzBtOTB5azR0cmwycGtsams4dWc5MmgifQ.qO7gX9ZWH080-ABIyYvpcw">
      
         {/* <Marker
               longitude={viewport.longitude}
               latitude={viewport.latitude}
               offsetTop={-20}
               offsetLeft={-30}
           >
               <GrLocationPin />
           </Marker> */}
          {parkingLocation.map((e)=>{
              
              return(
                  
            <Marker
               longitude={e.longitude}
               latitude={e.latitude}
               offsetTop={-20}
               offsetLeft={-10}
           >
               <GrLocationPin />
           </Marker>)
          })}
           
        </ReactMapGL>
       </div>
        </div>
    )
}
