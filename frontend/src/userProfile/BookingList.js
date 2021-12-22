import React,{useEffect, useState} from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';

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
        {ListOfBooking.map((e) =>{
            return(
                <>
                    <p>{e.parking.StreetName}</p>
                    <p>{e.parking.price}</p>
                    <p>{e.startTime}</p>
                    <button onClick={()=>checkOut(e._id)}>checkOut</button>

                    <p>{e.totalPrice}</p>
                    <p>{e.endTime}</p>
                </>

            )
        })}

            
        </>
    )
}
