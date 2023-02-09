import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import './UserLogin.scss';
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  FormSelect,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { Form, Formik } from 'formik';
import { INPUT_TYPES } from '../../../components/constants';
import Input from '../../../components/Input';
import { setResetPasswordValidation } from '../../../utils/validations';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { userRegisterReq } from '../../../store/users/UserAction';
import UserLoginMail from './UserLoginMail';
import UserLoginOTP from './UserLoginOTP';

const ResetPassword = (props) => {
  const [accountSetupForm, setAccountSetupForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const resetPassword = (values) => {
    console.log(values);
    // props.userRegisterReq(values);
  };
  return (
    <Container fluid className="h-auto user-login">
      <Row className="">
        <Col
          lg={4}
          className="sideContainer height100vh d-flex flex-column m-0 p-0"
        >
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

          <Container fluid>
            <Row className="justify-content-md-center">
              <Col
                sm={12}
                xs={12}
                className="form mt-lg-5  mb-2 mb-sm-3 mb-lg-4"
              >
                <h1 className="text-center pb-lg-1 mt-lg-5 mb-lg-4 mb-sm-3 mb-0">
                  Reset Password
                </h1>
              </Col>
              <Col sm={9} xs={12} className="mb-2 mb-sm-3 mb-lg-4">
                <Formik
                  enableReinitialize
                  initialValues={accountSetupForm}
                  onSubmit={resetPassword}
                  validationSchema={setResetPasswordValidation}
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
                        <Container>
                          <Row>
                            <Col
                              sm={12}
                              xs={12}
                              className="mb-2 mb-sm-3 mb-lg-3"
                            >
                              <Input
                                error={
                                  touched.newPassword && errors.newPassword
                                }
                                id={'newPassword'}
                                inputClass={
                                  touched.newPassword && errors.newPassword
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
                          </Row>

                          <Row>
                            <Col
                              sm={12}
                              xs={12}
                              className="mb-2 mb-sm-3 mb-lg-3"
                            >
                              <Input
                                error={
                                  touched.confirmPassword &&
                                  errors.confirmPassword
                                }
                                id={'confirmPassword'}
                                inputClass={
                                  touched.confirmPassword &&
                                  errors.confirmPassword
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
                          </Row>

                          <Row>
                            <Col
                              sm={12}
                              xs={12}
                              className="mb-2 mb-sm-3 mb-lg-3"
                            >
                              <div className="d-flex flex-column align-items-center">
                                <div>
                                  <Button
                                    type="submit"
                                    className="butn mt-2 p-3 ps-5 pe-5"
                                  >
                                    Confirm
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="p-0">
          <div className="curve-bg"></div>
        </Col>
      </Row>
    </Container>
  );
};

// const mapStateToProps = (state) => ({
//   // studentList: state.User.studentList,
// });

// const mapDispatchToProps = (dispatch) => ({
//   userRegisterReq: bindActionCreators(userRegisterReq, dispatch),
// });

// forgetpassword.propTypes = {
//   userRegisterReq: PropTypes.func,
// };

export default ResetPassword;
