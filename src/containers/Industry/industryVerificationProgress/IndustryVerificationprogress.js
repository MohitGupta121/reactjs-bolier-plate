import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { AiOutlineFileSearch } from 'react-icons/ai';
import './industryverifyprogress.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import { INPUT_TYPES } from '../../../components/constants';
import Input from '../../../components/Input';
import { setUpValidation } from '../../../utils/validations';

export const IndustryVerificationProgress = () => {
  const createAccount = (values) => {
    console.log(values);
  };
  return (
    <Container fluid className="h-auto">
      <Row className="height100vh">
        <Col lg={4} className="sideContainer d-flex flex-column m-0 p-0">
          <h1 className="logoText pt-3 ps-3 ps-sm-4">CSX</h1>
          <div className="imgTextDiv d-flex flex-column justify-content-center ps-lg-5 ps-sm-4 ps-3 pe-lg-1 pe-sm-3 pe-2 w-100">
            <h1 className="imgTexth1">Be the one of 100X</h1>
            <p className="imgText mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </Col>
        <Col lg={8} className="p-0 h-auto d-flex  flex-column">
          <div className="loginReg d-flex justify-content-end pt-lg-3 pt-2 pe-4">
            <div className="loginRegSpace">
              <Link to={'/industryreg'} className="link me-3">
                Login
                <MdOutlineArrowDropDown />
              </Link>
              <Link to={'/userlist'} className="link me-3">
                Register
                <MdOutlineArrowDropDown />
              </Link>
            </div>
          </div>

          <div className="form tq-message d-flex justify-content-center">
            <div className="w-75  mt-1 text-center">
              <div className="searchicon mb-lg-4">
                <AiOutlineFileSearch />
              </div>
              <h1 className="pb-lg-1 mb-lg-1 mb-sm-3 mb-0">
                Verification In Progress
              </h1>
              <p>
                We are checking your details with{' '}
                <span className="fw-700">
                  {' '}
                  Ministry of Corporate Affairs (MCA).{' '}
                </span>
                You will be notified on your registered email address within
                <span className="fw-700"> 24 Hrs.</span>
              </p>

              <div>
                <button type="submit" className="btn mt-2 p-3">
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </Col>
        <Col className="p-0">
          <div className="curve-bg"></div>
        </Col>
      </Row>
    </Container>
  );
};
