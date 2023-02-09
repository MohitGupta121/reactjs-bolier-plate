import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { setUserLoginValidation } from '../../../utils/validations';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { userLoginReqEmail } from '../../../store/users/UserAction';

const UserLoginMail = (props) => {
  const [key, setKey] = useState('home');
  const navigate = useNavigate();

  const [accountSetupForm, setAccountSetupForm] = useState({
    email: '',
    password: '',
  });
  const loginUser = (values) => {
    console.log(values);
    props.userLoginReqEmail(values, successCB);
  };
  const successCB = () => {
    console.log('successCB');
    navigate('/login');
  };
  return (
    <Formik
      enableReinitialize
      initialValues={accountSetupForm}
      onSubmit={loginUser}
      validationSchema={setUserLoginValidation}
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
              <Row className="">
                <Col sm={12} xs={12} className="mb-2 mb-sm-3 mb-lg-4">
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
                    placeholder="Enter Email Id"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12} xs={12} className="mb-2 mb-sm-3 mb-lg-3">
                  <Input
                    error={touched.password && errors.password}
                    id={'password'}
                    inputClass={
                      touched.password && errors.password ? 'is-invalid' : ''
                    }
                    inputType={INPUT_TYPES.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Enter Password"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12} xs={12} className="mb-2 mb-sm-3 mb-lg-3">
                  <div className="d-flex flex-column align-items-center">
                    <div>
                      <Button type="submit" className="butn mt-2 p-3 ps-5 pe-5">
                        Login
                      </Button>
                    </div>
                    <div className="logintxt mt-2">
                      <Link to={'/forgetpassword'} className="forgettxt">
                        Forget Password?
                      </Link>
                    </div>
                    <div className="logintxt mt-2">
                      Need an account?
                      <Link to={'/register'} className="registernow">
                        Register Now
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
};
const mapStateToProps = (state) => ({
  // studentList: state.User.studentList,
});

const mapDispatchToProps = (dispatch) => ({
  userLoginReqEmail: bindActionCreators(userLoginReqEmail, dispatch),
});

UserLoginMail.propTypes = {
  userLoginReqEmail: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginMail);
