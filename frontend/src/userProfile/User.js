import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'

export default function User() {
    
    const [UserParking, setUserParking] = useState([])

    const parking = useRef(null)
    const user = useRef(null)
    const startTime = useRef(null)

    const bookingParking = () => {
        axios.post(`http://localhost:3001/user/bookingParking`,
        {
            parking: parking.current.value,
            user: user.current.value,
            startTime: startTime.current.value,            
        })
        .then(
            (res) => {
              console.log(res);
              setUserParking(res.data);
            },
            (err) => {
              console.log(err);
            })}

    return (
        <>
            
        </>
    )
}
