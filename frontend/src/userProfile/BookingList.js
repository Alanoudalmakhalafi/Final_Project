import React,{useEffect, useState} from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Sidebar from "../userProfile/Sidebar";
import './bookingList.css'

export default function BookingList() {

    const [ListOfBooking, setListOfBooking] = useState([])
    const [refresh, setRefresh] = useState(false)

    let decodedData
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
     decodedData = jwt_decode(storedToken, { payload: true });
      // console.log(decodedData);
    }

    const checkOut = (id) =>{
      axios.put(`http://localhost:3001/user/checkOut`,{
            bookingId:id
        }).then((res) => {
            console.log(res.data)
            setRefresh(true)
        })
    }
    useEffect(() => {
       axios.post(`http://localhost:3001/user/userListOfParking`,{
           id: decodedData.id
       }).then((res) => {
            console.log(res.data);
            setListOfBooking(res.data)
          });
    }, [refresh])
    return (
        <>
        <div className='bookingPage'>
        <Sidebar />
        {ListOfBooking.map((e) =>{
            return(
                <>
                <div className='bookingList'>
                <div className='bookingInfo'>
                    <p>{e.parking.StreetName}</p>
                    <p>price per hour :</p>
                    <p>{e.parking.price} SR</p>
                    <p>start time :</p>
                    <p>{e.startTime}</p>
                    <button onClick={()=>checkOut(e._id)}>checkOut</button>
                    </div>
                    <div className='checkoutInfo'>
                    <p>total Price :</p>
                    <p>{e.totalPrice} SR</p>
                    <p>end time :</p>
                    <p>{e.endTime}</p>
                    </div>
                    </div>
                    
                </>

            )
        })}

            </div>
        </>
    )
}
