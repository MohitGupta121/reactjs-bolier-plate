import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../../store/shared/User/UserAction';
import './Login.scss';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';
import LandinaImage from '../../../assets/images/dashboard-image.png';
import LandingPageNavBar from '../../../components/LandingPageNavBar';

const Login = ({ login }) => {
  return (
    <div className="landing-page">
      <Container fluid className="">
        <LandingPageNavBar />
      </Container>
      <Container className="pt-lg-3">
        <Row className="row-background pt-lg-5 ">
          <Col sm={6} xs={12}>
            <div className="text-container">
              <h1>Lorem ipsum dolor sit amet, consectetur</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
                sit amet, consectetur adipiscing elit.dolor sit amet,
                consectetur adipiscing elit.Lorem ipsum dolor
              </p>
              <div>
                <h4>
                  <Link to="/register" className="link">
                    Get Start With CSX
                    <FaLongArrowAltRight className="CSX-Primary-Blue" />
                  </Link>
                </h4>
              </div>
            </div>
          </Col>
          <Col sm={6} xs={12}>
            <img className="landingimage" src={LandinaImage} alt="CSX Image" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(login, dispatch),
});

export default connect(null, mapDispatchToProps)(Login);
