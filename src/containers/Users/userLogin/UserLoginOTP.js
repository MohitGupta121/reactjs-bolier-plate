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
import { setUserOtpLoginValidation } from '../../../utils/validations';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { userLoginReqEmail } from '../../../store/users/UserAction';

const UserLoginOTP = (props) => {
  const [key, setKey] = useState('home');

  const [accountSetupForm, setAccountSetupForm] = useState({
    userMobile: '',
  });
  const loginOtpUser = (values) => {
    console.log(values);
    // props.userRegisterReq(values);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={accountSetupForm}
      onSubmit={loginOtpUser}
      validationSchema={setUserOtpLoginValidation}
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
                <Col sm={12} xs={12} className="mb-2 mb-sm-3 mb-lg-4">
                  <Input
                    error={touched.userMobile && errors.userMobile}
                    id={'userMobile'}
                    inputClass={
                      touched.userMobile && errors.userMobile
                        ? 'is-invalid'
                        : ''
                    }
                    inputType={INPUT_TYPES.number}
                    name="userMobile"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userMobile}
                    placeholder="Enter Mobile Number"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12} xs={12} className="mb-2 mb-sm-3 mb-lg-3">
                  <div className="d-flex flex-column align-items-center">
                    <div>
                      <Button type="submit" className="butn mt-2 p-3 ps-5 pe-5">
                        Generate OTP
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
  userRegisterReq: bindActionCreators(userLoginReqEmail, dispatch),
});

UserLoginOTP.propTypes = {
  userRegisterReq: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginOTP);
