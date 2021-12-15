import React, { useRef, useState, useEffect } from "react"
import axios from "axios"

export default function AddParking() {
  const [NewParking, setNewParking] = useState()
  const [Loding, setLoding] = useState(true)
  const [SelsctedFile, setSelsctedFile] = useState()
//hooks for inputs
  const latitude = useRef(null)
  const longitude = useRef(null)
  const num = useRef(null)
  const img = useRef(null)
  const price = useRef(null)
  const services = useRef(null)

//geting all parkings
  useEffect(() => {
    axios.get(" http://localhost:3001/user/allParking").then((res) => {
      console.log(res.data)
      setNewParking(res.data)
      setLoding(false)
    })
  }, [])

//adding new parkings
  const handleClickEvent = (e) => {
    e.preventDefault()
    axios.post(" http://localhost:3001/admin/addParking", {
        latitude: latitude.current.value,
        longitude: longitude.current.value,
        numberOfParking: num.current.value,
        image: img.current.value,
        price: price.current.value,
        services: services.current.value,
      }).then((res) => {
          console.log(res)
          // setNewParking(res)
        },(err) => {console.log(err) })}

//uploding img from computer
const fileSelectHandler = (event) => {
  setSelsctedFile(event.target.files[0])
}
const fileUploadHandler = () =>{
  axios.post('')
}

//loding
  if (Loding) {return <p>Loding</p>}


  return (
    <>
      <div className="listOfParkingBox">
        {NewParking.map((get) => {
          return (
            <div className="parkingsCard">
              <img src={get.image} height="200px" width="200px" />
              <ul><li></li></ul>
              <p>{get.numberOfParking}</p>
              <p>{get.price}</p>
            </div>
          )
        })}
      </div>
      <div className="inputBox">
        <input ref={latitude} placeholder="latitude" required />
        <input ref={longitude} placeholder="longitude" required />
        <input ref={num} placeholder="number of parking" required />
        <input type="file" onChange={fileSelectHandler} ref={img} placeholder="image" required />
        <button onClick={fileUploadHandler}>Upload</button>
        <input ref={price} placeholder="parking price" required />
        <input ref={services} placeholder="services" />

        <button onClick={handleClickEvent}>Get value</button>
      </div>
    </>
  )
}
