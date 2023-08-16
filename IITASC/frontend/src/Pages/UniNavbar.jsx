import React from 'react'
import {Navbar,Nav, Container,NavDropdown} from "react-bootstrap";
import { Route,Routes,Link } from "react-router-dom";

const UniNavbar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/home">Unimanage</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <NavDropdown title="Explore" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/Results">
                Results
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Schedules">
                Schedules
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/Account">
              Account
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/logout">
              Logout
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default UniNavbar;