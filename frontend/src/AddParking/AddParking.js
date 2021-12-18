import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../userProfile/Sidebar";
import './AddParking.css'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";



export default function AddParking() {
  const [NewParking, setNewParking] = useState();
  const [Loding, setLoding] = useState(true);

  //hooks for inputs
  const latitude = useRef(null);
  const longitude = useRef(null);
  const StreetName = useRef(null);
  const num = useRef(null);
  const img = useRef(null);
  const price = useRef(null);
  const services = useRef(null);

  //geting all parkings
  useEffect(() => {
    axios.get(" http://localhost:3001/user/allParking").then((res) => {
      console.log(res.data);
      setNewParking(res.data);
      setLoding(false);
    });
  }, []);

  //adding new parkings
  const handleClickEvent = (e) => {
    e.preventDefault();
    axios
      .post(" http://localhost:3001/admin/addParking", {
        latitude: latitude.current.value,
        longitude: longitude.current.value,
        StreetName: StreetName.current.value,
        numberOfParking: num.current.value,
        image: img.current.value,
        price: price.current.value,
        services: services.current.value,
      })
      .then(
        (res) => {
          console.log(res);
          // setNewParking(res)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  //update Parking
  const updateParking = () => {

  }

  //loding
  if (Loding) {
    return <p>Loding</p>;
  }

  return (
    <div className="addingPage">
      <Sidebar />
      <div className="listOfParkingBox">
              <table>
                <tr>
                  <th>Street Name</th>
                  <th>Number Of Parking</th>
                  <th>Price Of Parking</th>
                </tr>
          
                  
        {NewParking.map((get) => {
          return (
            <>
                <tr>
                  <td>{get.StreetName}</td>
                  <td>{get.numberOfParking}</td>
                  <td>{get.price}</td>
                  <td>
                  <button className="rowsBtn" onClick={updateParking()}><AiOutlineEdit/></button>
                  <button className="rowsBtn" onClick={deleteParking()}><RiDeleteBin6Fill/></button>
                  </td>
                </tr>
            </>
          );
        })}
              </table>
      </div>
      {/* <div className="inputBox">
        <input ref={StreetName} placeholder="Street, City" required />
        <input ref={latitude} placeholder="latitude" required />
        <input ref={longitude} placeholder="longitude" required />
        <input ref={num} placeholder="number of parking" required />
        <input type="file" ref={img} placeholder="image" />
        <input ref={price} placeholder="parking price" required />
        <input ref={services} placeholder="services" />

        <button onClick={handleClickEvent}>Post</button>
      </div> */}
    </div>
  );
}
