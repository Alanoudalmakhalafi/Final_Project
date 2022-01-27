import React, { useEffect, useState } from "react";
import axios from "axios";
import "./bookingList.css";
import StripeCheckout from "react-stripe-checkout";

export default function Checkout({ e, setRefresh }) {
  const [isClicked, setIsClicked] = useState(true);

  const checkOut = (id) => {
    axios
      .put(`http://localhost:3001/user/checkOut`, {
        bookingId: id,
      })
      .then((res) => {
        console.log(res.data);
        setRefresh(true);

  
       });
  };

  const showCheckoutBox = () => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };
  return (
    <>
      <div className="bookingList">
        {e.endTime == undefined ? (
          <>
            <div className="bookingInfo">
              <p>{e.parking.StreetName}</p>
              <p>price per hour :</p>
              <p>{e.parking.price} SR</p>
              <p>start time :</p>
              <p>{e.startTime.split("T")[0]}</p>
              <p>{e.startTime.split("T")[1].split(":").slice(0, 2).join(":")}
              </p>


              {e.endTime ? (
                ""
              ) : (
                <>
                 
                  <button onClick={()=>{checkOut(e._id); setIsClicked(false)}}>Checkout</button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="checkoutInfo">
              <p>total Price :</p>
              <p>{e.totalPrice} SR</p>
              <p>end time :</p>
              <p>{e.endTime.split("T")[0]}</p>
              <p>{e.endTime.split("T")[1].split(":").slice(0, 2).join(":")} </p>

            </div>
          </>
        )}
      </div>
    </>
  );
}
