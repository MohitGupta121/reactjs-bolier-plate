import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { MdDashboard } from 'react-icons/md';
import { BsFillBellFill } from 'react-icons/bs';
import { FaWallet } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './navigationbar.scss';

const NavigationBar = () => {
  return (
    <Navbar
      className="topnavbar navbar-dark navbars-bg-primary"
      // bg="primary"
      expand="lg"
    >
      <Container className="justify-content-end">
        {/* <Navbar.Brand href="#home">CSX</Navbar.Brand> */}
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar className=" me-lg-5" id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link as={Link} to="">
              <span>
                <svg
                  width="22"
                  height="27"
                  viewBox="0 0 22 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 27C12.5125 27 13.75 25.7538 13.75 24.2308H8.25C8.25 25.7538 9.47375 27 11 27ZM19.25 18.6923V11.7692C19.25 7.51846 16.995 3.96 13.0625 3.01846V2.07692C13.0625 0.927692 12.1412 0 11 0C9.85875 0 8.9375 0.927692 8.9375 2.07692V3.01846C4.99125 3.96 2.75 7.50462 2.75 11.7692V18.6923L0 21.4615V22.8462H22V21.4615L19.25 18.6923Z"
                    fill="#3A5998"
                  />
                </svg>
              </span>
            </Nav.Link>
            <div>
              <Nav.Link as={Link} to="" className="navwallet">
                <span>
                  <svg
                    width="31"
                    height="29"
                    viewBox="0 0 31 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.2989 15.4103C24.6 15.4103 24.8713 15.229 24.9865 14.951C25.1017 14.673 25.0381 14.3527 24.8252 14.1398C24.6123 13.927 24.2923 13.8634 24.0143 13.9785C23.736 14.0939 23.5547 14.3653 23.5547 14.6664C23.5552 15.077 23.8881 15.4098 24.2989 15.4104V15.4103Z"
                      fill="#3A5998"
                    />
                    <path
                      d="M28.9724 21.9776V18.2305H24.1813C22.9118 18.2246 21.7411 17.5442 21.108 16.4438C20.4748 15.3433 20.4748 13.9889 21.108 12.8885C21.7411 11.7881 22.9119 11.1075 24.1813 11.1018H28.9724V7.355C28.9717 6.70771 28.7144 6.08712 28.2567 5.62932C27.7989 5.17154 27.1783 4.91403 26.531 4.91357H19.6926L19.686 4.92024L19.6793 4.91357H10.1465L10.1398 4.92024L10.1332 4.91357H6.42483C5.77753 4.91409 5.15714 5.17157 4.69941 5.62932C4.24168 6.08707 3.98412 6.70773 3.9834 7.355V15.9476C6.44945 15.317 9.06742 15.9607 10.9603 17.6631C12.8527 19.3652 13.7693 21.9005 13.4028 24.4194H26.5314C27.1787 24.4186 27.7993 24.1611 28.2571 23.7034C28.7148 23.2456 28.9721 22.6252 28.9728 21.978L28.9724 21.9776Z"
                      fill="#3A5998"
                    />
                    <ellipse
                      cx="6.07288"
                      cy="22.816"
                      rx="6.07288"
                      ry="6.07288"
                      fill="#00A51A"
                    />
                    <path
                      d="M4.75508 24.5508L6.1377 23.1201L6.11351 22.4198L5.81502 22.1342L4.23802 23.7706L3.9899 23.5326L5.56728 21.8966L5.20586 21.5466L4.56178 21.5691L3.30514 22.8682L3.05405 22.6292L5.35151 20.2525L5.59931 20.4906L4.90066 21.2142L5.34067 21.1965L5.80623 21.6455L6.29315 21.1435L6.53953 21.3843L6.05616 21.8879L6.4525 22.2701L6.48822 23.2559L5.45486 24.3245L8.17022 24.8036L8.10996 25.1443L4.75508 24.5508Z"
                      fill="#FBFBFF"
                    />
                    <path
                      d="M17.7871 1.80368L20.0357 4.05229H23.6427L19.5907 0L17.7871 1.80368Z"
                      fill="#00A51A"
                    />
                    <path
                      d="M11.0083 4.05252H18.8177L14.9131 0.147949L11.0083 4.05252Z"
                      fill="#00A51A"
                    />
                    <path
                      d="M21.479 14.6667C21.4798 15.3829 21.7647 16.07 22.2714 16.5768C22.7782 17.0833 23.465 17.3685 24.1815 17.3692H30.1611L30.1613 11.9639H24.1815C23.465 11.9646 22.7782 12.2498 22.2714 12.7563C21.7647 13.2631 21.4797 13.9501 21.479 14.6667H21.479ZM25.9049 14.6667C25.9049 15.0924 25.7357 15.5009 25.4346 15.802C25.1335 16.1033 24.7249 16.2723 24.299 16.2723C23.8733 16.2726 23.4647 16.1033 23.1637 15.8022C22.8623 15.5009 22.6931 15.0924 22.6931 14.6667C22.6931 14.2407 22.8623 13.8321 23.1634 13.5311C23.4647 13.23 23.873 13.0607 24.299 13.0607C24.7247 13.061 25.133 13.2305 25.4341 13.5316C25.7351 13.8326 25.9044 14.2407 25.9049 14.6666L25.9049 14.6667Z"
                      fill="#3A5998"
                    />
                  </svg>
                </span>{' '}
                INR 12,23,000.00
              </Nav.Link>
              <Nav.Link as={Link} to="" className="navwallet">
                <span className="quickdeposit">Quick Deposit</span>
              </Nav.Link>
            </div>

            <NavDropdown title="Jon Deo" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">My Wallet</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
