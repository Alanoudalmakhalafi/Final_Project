import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import "./AddParking.css";
import CustomizedDialogs from "./dialog";


export default function OneParking({ get, parkings }) {
  const [editInput, setEditInput] = useState(true);


  //hooks for inputs
  const StreetName = useRef(null);
  const price = useRef(null);
  const services = useRef(null);
  const nameOfservice = useRef(null);
  const description = useRef(null);
  const image = useRef(null);
  const servicePrice = useRef(null);
  
  //update Parking
  const updateParking = (id) => {

    axios
      .put(`http://localhost:3001/admin/updateParking/${id}`, {
        StreetName: StreetName.current.value,
        price: price.current.value
      })
      .then(
        (res) => {
          console.log(res);
          parkings(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const nameOfTheFunctionHere = () => {
    if (editInput) {
        setEditInput(false);
      } else {
        setEditInput(true);
      }
  }

  

  //delete Parking
  const deleteParking = (id) => {
    axios
      .delete(` http://localhost:3001/admin/deleteParking/${id}`)
      .then((res) => {
        console.log(res.data);
        parkings(res.data);
      });
  };

  //add service
  const addServices = (id) =>{
axios.post(`http://localhost:3001/admin/addServices/${id}`,
{
  nameOfservice: nameOfservice.current.value,
      description: description.current.value,
      image: image.current.value,
      price: servicePrice.current.value,
})
.then(
  (res) => {
    console.log(res);
    parkings(res.data);

  },
  (err) => {
    console.log(err);
  }
)
  }

  return (
    <>
      {editInput ? (
        <>
          <td>{get.StreetName}</td>
          <td>{get.price}</td>
          <td>{get.services.map(name => {
              return (

              <li>{name.nameOfservice}</li>
              )
              } )}</td>
         
            <AiOutlineEdit className="icons" onClick={() => {
                nameOfTheFunctionHere();
            }} />
          
            <RiDeleteBin6Fill className="icons" onClick={() => {
              deleteParking(get._id);
            }} />
          
        </>
      ) : (
        <>
          <div className="editInput">
            <input className="nnn" ref={StreetName} placeholder="Street, City" required />
            <input className="nnn" ref={price} placeholder="parking price" required />
            {/* <input ref={services} placeholder="services" /> */}
            <button
              onClick={() => {
                updateParking(get._id);
                nameOfTheFunctionHere()
              }}
            >
              save
            </button>
          </div>
        </>
      )}
      
      <button className="rowsBtn">
                 
                  <CustomizedDialogs> 
                  
                    <div className="inputBox">

                      <input className="nnn" ref={nameOfservice} placeholder="name Of service" />
                      <input className="nnn" ref={description} placeholder="description" />
                      <input className="nnn" ref={image} placeholder="image" />
                      <input className="nnn" ref={servicePrice} placeholder="service Price" />


                      <button onClick={()=>{addServices(get._id)}}>add service</button>
                    </div>
                  </CustomizedDialogs>
                </button>
    </>
  );
}
