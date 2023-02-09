import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MySettings.scss';
const MySettings = () => {
  return (
    <div className="mySettings">
      <Navbar
        className="d-lg-block p-2 navbar-dark profine-navbar"
        bg="none"
        expand="lg"
      >
        <div className="d-block p-lg-2">
          <h3 className="title">Settings</h3>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav className="myprofilenav me-auto d-lg-block flex flex-row justify-content-between">
            <Nav.Link as={Link} to="/myprofile">
              My Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/userkyc">
              KYC
            </Nav.Link>
            <Nav.Link as={Link} to="/changepassword">
              Change Password
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              Notification
            </Nav.Link>
          </Nav>
          {/* </Navbar.Collapse> */}
        </div>
      </Navbar>
    </div>
  );
};
export default MySettings;
