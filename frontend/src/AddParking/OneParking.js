import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import "./AddParking.css";

export default function OneParking({ get, parkings }) {
  const [editInput, setEditInput] = useState(true);

  //hooks for inputs
//   const latitude = useRef(null);
//   const longitude = useRef(null);
//   const num = useRef(null);
//   const img = useRef(null);
const StreetName = useRef(null);
  const price = useRef(null);
  const services = useRef(null);

  //update Parking
  const updateParking = (id) => {
    axios
      .put(`http://localhost:3001/admin/updateParking/${id}`, {
        // latitude: latitude.current.value,
        // longitude: longitude.current.value,
        // numberOfParking: num.current.value,
        // image: img.current.value,
        StreetName: StreetName.current.value,
        price: price.current.value,
        services: services.current.value,
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

  const EditInput = () => {
    if (editInput) {
      setEditInput(false);
    } else {
      setEditInput(true);
    }
  };

  //delete Parking
  const deleteParking = (id) => {
    axios
      .delete(` http://localhost:3001/admin/deleteParking/${id}`)
      .then((res) => {
        console.log(res.data);
        parkings(res.data);
      });
  };

  return (
    <>
      {editInput ? (
        <>
          <td>{get.StreetName}</td>
          <td>{get.price}</td>
          <td>{get.services}</td>

          <button
            className="rowsBtn"
            onClick={() => {
              EditInput();
            }}
          >
            <AiOutlineEdit />
          </button>
          <button
            className="rowsBtn"
            onClick={() => {
              deleteParking(get._id);
            }}
          >
            <RiDeleteBin6Fill />
          </button>
        </>
      ) : (
        <>
          <div className="editInput">
            <input ref={StreetName} placeholder="Street, City" required />
            <input ref={price} placeholder="parking price" required />
            <input ref={services} placeholder="services" />
            <button
              onClick={() => {
                updateParking(get._id);
              }}
            >
              save
            </button>
          </div>
        </>
      )}
    </>
  );
}
