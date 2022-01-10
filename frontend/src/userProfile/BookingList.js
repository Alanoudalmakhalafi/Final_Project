import React,{useEffect, useState} from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Sidebar from "../userProfile/Sidebar";
import './bookingList.css'
import Checkout from './Checkout.js'

export default function BookingList() {

    const [ListOfBooking, setListOfBooking] = useState([])
    const [refresh, setRefresh] = useState(false)


    let decodedData
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
     decodedData = jwt_decode(storedToken, { payload: true });
      // console.log(decodedData);
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
        <div className='grid'>
        {ListOfBooking.map((e) =>{
            return(
                <>

                <Checkout e={e} setRefresh={setRefresh}/>
              
                </>

            )
        })}
</div>
            </div>
        </>
    )
}
