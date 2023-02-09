import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Card } from 'react-bootstrap';
import { Router } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import './LandingPageNavBar.scss';
import { Link } from 'react-router-dom';

const LandingPageNavBar = () => {
  return (
    <div className="landingpagecontent">
      <Navbar collapseOnSelect expand="lg" variant="dark" className="bg-pri ">
        <Container fluid className="dashboardnavbar">
          <h1 className="navbar-brand pt-3 ps-3 ps-sm-4">CSX</h1>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="navbar-toggle"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto middlenavs">
              {/* <NavDropdown title="Resource" id="resource">
                <NavDropdown.Item href="#action/1.1">...</NavDropdown.Item>
                <NavDropdown.Item href="#action/1.2">...</NavDropdown.Item>
                <NavDropdown.Item href="#action/1.3">...</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <NavDropdown title="Company" id="company">
                <NavDropdown.Item href="#action/2.1">...</NavDropdown.Item>
                <NavDropdown.Item href="#action/2.2">...</NavDropdown.Item>
                <NavDropdown.Item href="#action/2.3">...</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown> */}
              <Nav.Link href="/contactus">Resource</Nav.Link>
              <Nav.Link href="/contactus">Company</Nav.Link>
              <Nav.Link href="/contactus">Contact Us</Nav.Link>
            </Nav>
            <Nav className="lastnav">
              <Nav.Link as={Link} to="/login">
                Login
                <MdOutlineArrowDropDown />
              </Nav.Link>
              {/* <Nav.Link href="/login">Login </Nav.Link> */}
              <Nav.Link as={Link} to="/register">
                Signup
                <MdOutlineArrowDropDown />
              </Nav.Link>
              {/* <Nav.Link href="/register" className='link'>Signup </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default LandingPageNavBar;
