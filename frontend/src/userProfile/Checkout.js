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

        axios
          .post("/orders/create", { userId: decodedData.id })

          .then(async (res) => {
            try {
              const res = await axios.post("/payment", {
                tokenId: token.id,
                amount: total * 3.75 * 100,
              });
            } catch (error) {}

            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
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
        {isClicked ? (
          <>
            <div className="bookingInfo">
              <p>{e.parking.StreetName}</p>
              <p>price per hour :</p>
              <p>{e.parking.price} SR</p>
              <p>start time :</p>
              <p>{e.startTime}</p>

              <StripeCheckout
                stripeKey="pk_test_51KG1ymCh49zQHfRHvoXz0OPDR2AmP7ypTJIvpvIuMr2PaKkfJe1Qs8LAWxPg3ZQ09a4Xkn2bAvBICs5rm57O2Sdm00GNCBQN0W"
                token={checkOut(e._id)}
                billingAddress
                shippingAddress
                amount={e.totalPrice}
                // name={cartItems}
              >
                <button
                  onClick={() => {
                    setIsClicked(false);
                  }}
                >
                  Checkout
                </button>
              </StripeCheckout>

              {e.IsChecked ? (
                ""
              ) : (
                <>
                  {/* <StripeCheckout
                      stripeKey="pk_test_51KG1ymCh49zQHfRHvoXz0OPDR2AmP7ypTJIvpvIuMr2PaKkfJe1Qs8LAWxPg3ZQ09a4Xkn2bAvBICs5rm57O2Sdm00GNCBQN0W"
                      token={checkOut(e._id)}
                      billingAddress
                      shippingAddress
                      amount={e.totalPrice}
                      // name={cartItems}
                    >
                      <button onClick={()=>{setIsClicked(false)}}>Checkout</button>
                    </StripeCheckout> */}
                  {/* <button onClick={()=>{checkOut(e._id); setIsClicked(false)}}>Checkout</button> */}
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
              <p>{e.endTime}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
