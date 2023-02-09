import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { INPUT_TYPES } from '../../../../components/constants';
import Input from '../../../../components/Input';
import MySettings from '../../../../components/MySettings';
import NavigationBar from '../../../../components/NavBar/NavigationBar';
import Sidebar from '../../../../components/SideBar/SideBar';
import { ChangPasswordValidation } from '../../../../utils/validations';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePassword } from '../../../../store/users/UserAction';

export const ChangPassword = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [changPasswordForm, setChangPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSuccess = () => {
    console.log('Handle Success');
  };
  const ChangPassword = (values) => {
    props.changePassword(values, handleSuccess);
    // console.log(values);
  };
  return (
    <>
      <Container fluid className="changepasswordcontainer">
        <Row>
          <Col
            xs={12}
            lg={2}
            className="p-0 h-100vh sidebar-bg-primary position-fixed-n"
            id="sidebar-wrapper"
          >
            <Sidebar />
          </Col>
          <Col
            xs={12}
            lg={10}
            className="p-0 createindustryform"
            id="page-content-wrapper"
          >
            <NavigationBar />
            <div className="toptitle mb-lg-3">
              <h1>Change Password</h1>
            </div>
            <Container>
              <Row className="">
                <Col lg={3} className="">
                  <MySettings />
                </Col>
                <Col lg={9} xs={12} className="">
                  <div className="form mt-lg-0 ms-lg-3 p-3">
                    <div className="mt-lg-1 mt-1">
                      <Formik
                        enableReinitialize
                        initialValues={changPasswordForm}
                        onSubmit={ChangPassword}
                        validationSchema={ChangPasswordValidation}
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
                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4 me-lg-5"
                                >
                                  <span className="lable">Old Password</span>
                                  <Input
                                    error={
                                      touched.oldPassword && errors.oldPassword
                                    }
                                    id={'oldPassword'}
                                    inputClass={
                                      touched.oldPassword && errors.oldPassword
                                        ? 'is-invalid'
                                        : ''
                                    }
                                    inputType={INPUT_TYPES.password}
                                    name="oldPassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.oldPassword}
                                    // placeholder="Old Password"
                                  />
                                </Col>
                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">New Password</span>
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
                                    // placeholder="Old Password"
                                  />
                                </Col>
                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">
                                    Confirm Password
                                  </span>
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
                                    // placeholder="Old Password"
                                  />
                                </Col>
                                <Col
                                  sm={12}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <Button type="submit">Update Password</Button>
                                </Col>
                              </Row>
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

ChangPassword.propTypes = {
  changePassword: PropTypes.func,
  // users:PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    // users: state.User.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  changePassword: bindActionCreators(changePassword, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangPassword);
