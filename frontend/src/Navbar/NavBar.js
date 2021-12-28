import React from "react";
import img from "./parkingYards.png";
import { Navbar, Container, Nav } from "react-bootstrap";
import { RiAdminFill } from "react-icons/ri";
import {useNavigate} from 'react-router-dom'
import jwt_decode from "jwt-decode";


export default function NavBar() {
  let navigate = useNavigate()

  let decodedData
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
   decodedData = jwt_decode(storedToken, { payload: true });
    console.log(decodedData);
  }

  const logout = (e)=>{
    e.preventDefault()
    localStorage.removeItem("token")
    navigate('/Signup&Login')
  }

  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={img}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav>
          {decodedData ? (
             <>
             <Nav.Link href="/Signup&Login"><a onClick={(e)=>logout(e)}>Logout</a></Nav.Link>
             </>) : null }
     {!decodedData ? (
         <>
         <Nav.Link href="/Signup&Login">Login </Nav.Link>
         </>
     ) : null}
            <Nav.Link href="/Profile"><RiAdminFill /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
