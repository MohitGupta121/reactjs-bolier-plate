import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import './industry.scss';
import { Col, Container, Row, Button, Modal } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import { INPUT_TYPES } from '../../../components/constants';
import Input from '../../../components/Input';
import { setUpValidation } from '../../../utils/validations';

export const IndustryRegisrer = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [accountSetupForm, setAccountSetupForm] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    cinNo: '',
    mobileNo: undefined,
    mcaRegisteredEmail: '',
    companyAdreess: '',
    zipCode: '',
    iecNumber: '',
    exporterType: '',
    newPassword: '',
    confirmPassword: '',
  });
  const createAccount = (values) => {
    console.log(values);
  };
  return (
    <Container fluid className="h-auto">
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="d-flex">
            <span className="pe-lg-2 text-danger">
              *Note: Fill the details according to MCA{' '}
            </span>
            <a
              className="pe-lg-2 "
              target="blank"
              href="https://www.mca.gov.in/mcafoportal/viewCompanyMasterData.do"
            >
              {' '}
              click
            </a>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

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
          <div className="loginReg w-100 d-flex justify-content-end pt-lg-3 pt-2 pe-4">
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
          <div className="form mt-lg-2 d-flex flex-column align-items-center">
            <div className="w-75 mt-lg-1 mt-1">
              <h1 className="pb-lg-1 mb-lg-4 mb-sm-3 mb-0">
                Industry Registration
              </h1>
              <Formik
                enableReinitialize
                initialValues={accountSetupForm}
                onSubmit={createAccount}
                validationSchema={setUpValidation}
              >
                {({
                  values,
                  touched,
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                }) => {
                  return (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-4">
                          <Input
                            error={touched.firstName && errors.firstName}
                            id={'firstName'}
                            inputClass={
                              touched.firstName && errors.firstName
                                ? 'is-invalid'
                                : ''
                            }
                            inputType={INPUT_TYPES.text}
                            name="firstName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            placeholder="First Name"
                          />
                        </Col>
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-4 ">
                          <Input
                            error={touched.lastName && errors.lastName}
                            id={'lastName'}
                            inputClass={
                              touched.lastName && errors.lastName
                                ? 'is-invalid'
                                : ''
                            }
                            inputType={INPUT_TYPES.text}
                            name="lastName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            placeholder="Last Name"
                          />
                        </Col>
                        {/* <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-4 ">
                          <Input
                            error={touched.companyName && errors.companyName}
                            id={'companyName'}
                            inputClass={
                              touched.companyName && errors.companyName
                                ? 'is-invalid'
                                : ''
                            }
                            inputType={INPUT_TYPES.text}
                            name="companyName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.companyName}
                            placeholder="Company Name"
                          />
                        </Col>
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-4">
                          <Input
                            error={touched.cinNo && errors.cinNo}
                            id={'cinNo'}
                            inputClass={
                              touched.cinNo && errors.cinNo ? 'is-invalid' : ''
                            }
                            inputType={INPUT_TYPES.text}
                            name="cinNo"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cinNo}
                            placeholder="CIN"
                          />
                        </Col> */}
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-4">
                          <Input
                            error={touched.mobileNo && errors.mobileNo}
                            id={'mobileNo'}
                            inputClass={
                              touched.mobileNo && errors.mobileNo
                                ? 'is-invalid'
                                : ''
                            }
                            inputType={INPUT_TYPES.number}
                            name="mobileNo"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.mobileNo}
                            placeholder="Mobile No"
                          />
                        </Col>
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-4">
                          <Input
                            error={
                              touched.mcaRegisteredEmail &&
                              errors.mcaRegisteredEmail
                            }
                            id={'mcaRegisteredEmail'}
                            inputClass={
                              touched.mcaRegisteredEmail &&
                              errors.mcaRegisteredEmail
                                ? 'is-invalid'
                                : ''
                            }
                            inputType={INPUT_TYPES.email}
                            name="mcaRegisteredEmail"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.mcaRegisteredEmail}
                            placeholder="MCA Registered Email"
                          />
                        </Col>
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-4">
                          <Input
                            error={
                              touched.companyAdreess && errors.companyAdreess
                            }
                            id={'companyAdreess'}
                            inputClass={
                              touched.companyAdreess && errors.companyAdreess
                                ? 'is-invalid'
                                : ''
                            }
                            inputType={INPUT_TYPES.text}
                            name="companyAdreess"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.companyAdreess}
                            placeholder="Company Adreess"
                          />
                        </Col>
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-3">
                          <Input
                            error={touched.zipCode && errors.zipCode}
                            id={'zipCode'}
                            inputClass={
                              touched.zipCode && errors.zipCode
                                ? 'is-invalid'
                                : ''
                            }
                            inputType={INPUT_TYPES.text}
                            name="zipCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.zipCode}
                            placeholder="ZIP Code"
                          />
                        </Col>
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-3">
                          <Input
                            error={touched.iecNumber && errors.iecNumber}
                            id={'iecNumber'}
                            inputClass={
                              touched.iecNumber && errors.iecNumber
                                ? 'is-invalid'
                                : ''
                            }
                            inputType={INPUT_TYPES.text}
                            name="iecNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.iecNumber}
                            placeholder="IEC Number"
                          />
                        </Col>
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-3 ">
                          <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </Col>
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-3">
                          <Input
                            error={touched.newPassword && errors.newPassword}
                            id={'newPassword'}
                            inputClass={
                              touched.iecNumber && errors.iecNumber
                                ? 'is-invalid'
                                : ''
                            }
                            inputType={INPUT_TYPES.password}
                            name="newPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.newPassword}
                            placeholder="New Password"
                          />
                        </Col>
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-3">
                          <Input
                            error={
                              touched.confirmPassword && errors.confirmPassword
                            }
                            id={'confirmPassword'}
                            inputClass={
                              touched.iecNumber && errors.iecNumber
                                ? 'is-invalid'
                                : ''
                            }
                            inputType={INPUT_TYPES.password}
                            name="confirmPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.confirmPassword}
                            placeholder="Confirm Password"
                          />
                        </Col>
                        <div className="d-flex flex-column align-items-center">
                          <div className="logintxt">
                            <input
                              type="checkbox"
                              name="checkbox"
                              required={true}
                            />{' '}
                            By clicking you are agree with{' '}
                            <Link to={'/'} className="linkTC">
                              T&C
                            </Link>{' '}
                            and{' '}
                            <Link to={'/'} className="linkTC">
                              Usage Policy
                            </Link>
                          </div>
                          <div>
                            <Button type="submit" className="butn mt-2 p-3">
                              CREATE ACCOUNT
                            </Button>
                          </div>
                        </div>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
              <div className="d-flex justify-content-center pt-1 mt-3 my-lg-3 mt-sm-1 ">
                <p className="logintxt">Already have account</p>
                <Link to={'/industryreg'} className="linkLogin">
                  LOGIN
                </Link>
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
