import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../userProfile/Sidebar";
import "./AddParking.css";
import CustomizedDialogs from "./dialog";
import OneParking from "./OneParking";
import {Image} from 'cloudinary-react'

export default function AddParking() {
  const [NewParking, setNewParking] = useState([]);
  const [Loding, setLoding] = useState(true)
  const [imgSelected, setImgSelected] = useState("")
  const [Img, setImg] = useState()

  //hooks for inputs
  const latitude = useRef(null);
  const longitude = useRef(null);
  const StreetName = useRef(null);
  const num = useRef(null);
  const img = useRef(null);
  const price = useRef(null);
  // const services = useRef(null);


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
        image: Img,
        price: price.current.value,
        // services: services.current.value,
      })
      .then(
        (res) => {
          console.log(res);
          setNewParking(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const uploadImage = async ()=>{
    const formData = new FormData()
    formData.append("file", imgSelected)
    formData.append("upload_preset", "ay6fant5")

    await axios.post("https://api.cloudinary.com/v1_1/parkingyardsimages/image/upload", formData)
    .then((res)=>{
      console.log(res.data.secure_url)
       setImg(res.data.secure_url)
    })
  }

  //loding
  if (Loding) {
    return <p>Loding</p>;
  }

  return (
    <div className="addingPage">
      <div className="test">
        <Sidebar />
        
        <div className="listOfParkingBox">
          <table>
            <tr>
              <th>Street Name</th>
              <th>Price Of Parking</th>
              <th>Services </th>
              <button className="rowsBtn">
                <CustomizedDialogs>
                
                  <div className="inputBox">
                    <input
                      ref={StreetName}
                      placeholder="Street, City"
                      required
                    />
                    <input ref={latitude} placeholder="latitude" required />
                    <input ref={longitude} placeholder="longitude" required />
                    <input ref={num} placeholder="number of parking" required />
                    <input type="file" onChange={(event) => {
                      setImgSelected(event.target.files[0])
                    }} ref={img} placeholder="image" />
                    <button onClick={uploadImage}>Upload</button>
                    <input ref={price} placeholder="parking price" required />

                    <button onClick={handleClickEvent}>Post</button>
                  </div>
                </CustomizedDialogs>
              </button>
            </tr>

            {NewParking.map((get) => {
              return (
                <>
                  <tr>
                    <OneParking get={get} parkings={setNewParking} />
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
