import React,{useEffect, useState} from 'react'
import axios from 'axios';


export default function Checkout({ e , setRefresh}) {
    const [isClicked, setIsClicked] = useState(true)

    const checkOut = (id) =>{
        axios.put(`http://localhost:3001/user/checkOut`,{
              bookingId:id
          }).then((res) => {
              console.log(res.data)
              setRefresh(true)
          })
      }


    const showCheckoutBox = () => {
        if (isClicked) {
          setIsClicked(false);
        } else {
          setIsClicked(true);
        }
      }; 
  return (
    <>
      <div className='bookingList'>
                {isClicked ? (<>

                <div className='bookingInfo'>
                    <p>{e.parking.StreetName}</p>
                    <p>price per hour :</p>
                    <p>{e.parking.price} SR</p>
                    <p>start time :</p>
                    <p>{e.startTime}</p>
                    {e.IsChecked ? "":
                    
                    <button onClick={()=>{checkOut(e._id); showCheckoutBox()}}>Checkout</button>
                    }
                    </div>
                </>) : (<>

                    <div className='checkoutInfo'>
                    <p>total Price :</p>
                    <p>{e.totalPrice} SR</p>
                    <p>end time :</p>
                    <p>{e.endTime}</p>
                    </div>
                </>)}
                    </div>
                    
      
    </>
  );
}
