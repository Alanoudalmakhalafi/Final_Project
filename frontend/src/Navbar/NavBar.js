import React from "react";
import img from "./parkingYards.png";
import { Navbar, Container, Nav } from "react-bootstrap";
import { RiAdminFill } from "react-icons/ri";
import { BiLogInCircle } from "react-icons/bi";


export default function NavBar() {
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
            <Nav.Link href="/Signup&Login">Login <BiLogInCircle/></Nav.Link>
            <Nav.Link href="/AdminProfile"><RiAdminFill /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
