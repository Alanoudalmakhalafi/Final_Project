import React from "react";
import img from "./parkingYards.png"
import { Navbar, Container, Nav} from 'react-bootstrap';


export default function NavBar() {
  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={img}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />

          </Navbar.Brand>
          <Nav><Nav.Link href="/Signup&Login">SignUp/LogIn</Nav.Link></Nav>
          
        </Container>
      </Navbar>
    </div>
  );
}
