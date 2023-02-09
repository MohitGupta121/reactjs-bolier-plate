import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import './user.scss';
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  FormSelect,
} from 'react-bootstrap';
import { Form, Formik } from 'formik';
import { INPUT_TYPES } from '../../../components/constants';
import Input from '../../../components/Input';
import { setUserValidation } from '../../../utils/validations';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { userRegisterReq } from '../../../store/users/UserAction';

const UserRegister = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [accountSetupForm, setAccountSetupForm] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    password: '',
    confirmPassword: '',
    checkBox: false,
  });
  const registerUser = (values) => {
    // console.log(values);
    delete values.confirmPassword;
    props.userRegisterReq(values, successCallback);
  };
  const successCallback = () => {
    console.log('callBack Called');
    Navigate('/login');
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
          <div className="loginReg w-100 d-flex justify-content-end pt-lg-3 pt-2 pe-4">
            <div className="loginRegSpace">
              <Link to={'/login'} className="link me-3">
                Login
                <MdOutlineArrowDropDown />
              </Link>
              <Link to={'/register'} className="link me-3">
                Register
                <MdOutlineArrowDropDown />
              </Link>
            </div>
          </div>
          <div className="form mt-lg-2 d-flex flex-column align-items-center">
            <div className="w-75 mt-lg-1 mt-1">
              <h1 className="pb-lg-1 mt-lg-5 mb-lg-4 mb-sm-3 mb-0">
                User Registration
              </h1>
              <Formik
                enableReinitialize
                initialValues={accountSetupForm}
                onSubmit={registerUser}
                validationSchema={setUserValidation}
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
                    <Form>
                      <Row>
                        <Col sm={12} xs={12} className="mb-2 mb-sm-3 mb-lg-4">
                          <FormSelect
                            name="userType"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.userType}
                            className={
                              touched.userType && errors.userType
                                ? 'is-invalid form-control'
                                : 'form-control form-select'
                            }
                            aria-label="Default select example"
                          >
                            <option key="blankChoice" hidden>
                              Please Select User Type
                            </option>
                            <option value="INDUSTRY">I am Industry</option>
                            <option value="AGENT">I am Agent</option>
                          </FormSelect>
                          {touched.userType && errors.userType ? (
                            <div className="error-message">
                              {errors.userType}
                            </div>
                          ) : null}
                        </Col>
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
                            error={touched.email && errors.email}
                            id={'email'}
                            inputClass={
                              touched.email && errors.email ? 'is-invalid' : ''
                            }
                            inputType={INPUT_TYPES.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            placeholder="MCA Registered Email"
                          />
                        </Col>
                        <Col sm={6} xs={12} className="mb-2 mb-sm-3 mb-lg-3">
                          <Input
                            error={touched.password && errors.password}
                            id={'password'}
                            inputClass={
                              touched.password && errors.password
                                ? 'is-invalid'
                                : ''
                            }
                            inputType={INPUT_TYPES.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
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
                              name="checkBox"
                              onChange={handleChange}
                              value={values.checkBox}
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
                <Link to={'/login'} className="linkLogin">
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

const mapStateToProps = (state) => ({
  // studentList: state.User.studentList,
});

const mapDispatchToProps = (dispatch) => ({
  userRegisterReq: bindActionCreators(userRegisterReq, dispatch),
});

UserRegister.propTypes = {
  userRegisterReq: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
