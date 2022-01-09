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
  const NewPassword = useRef(null);


  let decodedData
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
   decodedData = jwt_decode(storedToken, { payload: true });
    console.log(decodedData);
  }
  const TokenId = decodedData.id

  const showUpdateInput = () => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  }

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

  const updatePassword = (id) => {
    axios
    .put(`http://localhost:3001/user/updatePassword/${id}`,{

      password: Password.current.value,
      NewPassword: NewPassword.current.value,

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
                <input placeholder="Email"  value={Profile.email}></input>
                <input placeholder="Phone"  value={Profile.phone}></input>

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

                <input ref={Email} placeholder="Email" required />
                <input ref={Phone} placeholder="Phone number" required/>
                <h5>password update</h5>
                <input type="password" ref={Password} placeholder="current password" required />
                
                <input type="password" ref={NewPassword} placeholder="new password" required />
                
                <button onClick={(e) => {updatingProfile(Profile._id); showUpdateInput(); updatePassword(Profile._id) }} >
                 save change </button>
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

