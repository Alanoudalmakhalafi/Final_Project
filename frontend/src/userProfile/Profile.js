import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Profile() {
  const [isClicked, setIsClicked] = useState(true);
  const [Profile, setProfile] = useState([]);
  
  const Email = useRef(null);
  const Phone = useRef(null);
  const Password = useRef(null);

  let decodedData
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
   decodedData = jwt_decode(storedToken, { payload: true });
    console.log(decodedData);
  }
  const [TokenId, setTokenId] = useState(decodedData.id)

  const showUpdateInput = () => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  }; 

  useEffect(() => {
    axios.get(`http://localhost:3001/admin/${TokenId}`).then((res) => {
      console.log(res.data);
      setProfile(res.data);
    });
  }, []); 

  const updatingProfile = (id) => {
    axios
      .put(`http://localhost:3001/admin/updateAdmin/${id}`, {
        email: Email.current.value,
        phone: Phone.current.value,
        password: Password.current.value,
      })
      .then(
        (res) => {
          console.log(res.data);
          setProfile(res.data);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  return (
    <>
      <Sidebar />

                
      {(function () {
        
        if (TokenId !== undefined) {
          return(
            <>
            {isClicked ? (
              <>
                <button onClick=
                {showUpdateInput}>
                  isClicked
                </button>
                <h5>{Profile.email}</h5>
                <h5>{Profile.phone}</h5>
                <h5 type={Password}>{Profile.password}</h5>
              </>
            ) : (
             
              <>
                <input ref={Email} placeholder="Email" required />
                <input ref={Phone} placeholder="Phone number" />
                <input ref={Password} placeholder="Password" required />

                <button
                  onClick={(e) => {
                    updatingProfile(e._id);
                    showUpdateInput();
                  }}
                >
                  save change
                </button>
              </>
            )}
            </>
          )
          
        }else{
          <h1>you have to Signup</h1>
        }
      })()}
    </>
  );
}
