import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./profile.css"

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
    if(TokenId !== undefined){
    axios.get(`http://localhost:3001/admin/${TokenId}`).then((res) => {
      console.log(res.data);
      setProfile(res.data);
    });
  }
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
    <div className="profilePage">
      <Sidebar />

                
      {(function () {
        
        if (TokenId !== undefined) {
          return(
            <>
            <div className="Settings">
            <h1>Profile Settings</h1>
            {isClicked ? (
              <>
              <div className="profileCard">
                <div className="profileContent">
                <label>Email</label>
                <input  value={Profile.email}></input>
                <label>Phone</label>
                <input value={Profile.phone}></input>
                <label>Password</label>
                <input type={Password}></input>

                <button className="UpdateProfileBtn" onClick=
                {showUpdateInput}>
                  Update your profile
                </button>
                </div>
                </div>
              </>
            ) : (
             
              <>
              <div  className="profileCard">
              <div className="profileContent">

              <label>Email</label>
                <input ref={Email} placeholder="Email" required />
                <label>Phone</label>
                <input ref={Phone} placeholder="Phone number" />
                <label>Password</label>
                <input ref={Password} placeholder="Password" required />

                <button onClick={(e) => {updatingProfile(Profile._id); showUpdateInput(); }} > save change </button>
                </div>
                </div>
              </>
            )}</div>
            </>
          )
          
        }else{
          <h1>you have to Signup</h1>
        }
      })()}
      </div>
    </>
  );
}

