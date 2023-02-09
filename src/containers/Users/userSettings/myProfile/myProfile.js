import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { FaRegThumbsUp } from 'react-icons/fa';
import './myprofile.scss';
import {
  Col,
  Container,
  Row,
  Card,
  Modal,
  FormSelect,
  Button,
} from 'react-bootstrap';
import { Form, Formik } from 'formik';
import { INPUT_TYPES } from '../../../../components/constants';
import Input from '../../../../components/Input';
import { myProfileValidation } from '../../../../utils/validations';
import Sidebar from '../../../../components/SideBar/SideBar';
import NavigationBar from '../../../../components/NavBar/NavigationBar';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createIndustryReq } from '../../../../store/Industry/IndustryAction';
import MySettings from '../../../../components/MySettings';

const MyProfile = (props) => {
  const createAccount = (values) => {
    console.log(values);
  };

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [accountSetupForm, setAccountSetupForm] = useState({
    firstName: 'Lons',
    lastName: 'Jackson',
    companyName: 'Lons & Sons Private Limited',
    cinNo: 'U72900MP2021PTC055479',
    mobileNo: '8959850005',
    mcaRegisteredEmail: 'company@gmail.com',
    companyAdreess: '55 M, Indira Nagar, New Delhi, India',
    zipCode: '452010',
    iecNumber: 'ID-8959850005',
    exporterType: 'Exporter Type here',
    // gstiNumber: '',
    // checkbox: false,
  });
  const registerUser = (values) => {
    console.log(values);
    // props.createIndustryReq(values, successCallback);
  };
  // const successCallback = () => {
  //   console.log('callBack Called');
  //   // Navigate('/login');
  // };
  // const toUppercase = (event) => {
  //   const result = event.target.value.toUpperCase();

  //   setAccountSetupForm(result);
  // };
  return (
    <>
      <Container fluid className="createindustrycontainer">
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
              <h1>My Profile</h1>
            </div>
            <Container>
              <Row className="">
                <Col lg={3} className="">
                  <MySettings />
                </Col>
                <Col lg={9} className="">
                  <div className="form mt-lg-0 ms-lg-3 p-3">
                    <div className="mt-lg-1 mt-1">
                      <Formik
                        enableReinitialize
                        initialValues={accountSetupForm}
                        onSubmit={registerUser}
                        validationSchema={myProfileValidation}
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
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">First Name</span>
                                  <Input
                                    error={
                                      touched.firstName && errors.firstName
                                    }
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
                                    disabled
                                  />
                                </Col>
                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">Last Name</span>
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
                                    disabled
                                  />
                                </Col>
                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">Company Name</span>
                                  <Input
                                    error={
                                      touched.companyName && errors.companyName
                                    }
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
                                    disabled
                                  />
                                </Col>
                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">CIN No</span>
                                  <Input
                                    error={touched.cinNo && errors.cinNo}
                                    id={'cinNo'}
                                    inputClass={
                                      touched.cinNo && errors.cinNo
                                        ? 'is-invalid'
                                        : ''
                                    }
                                    inputType={INPUT_TYPES.text}
                                    name="cinNo"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.cinNo}
                                    placeholder="CIN"
                                    disabled
                                  />
                                </Col>
                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">Mobile No</span>
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
                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">
                                    MCA Registered Email
                                  </span>
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
                                    disabled
                                  />
                                </Col>

                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">Company Address</span>
                                  <Input
                                    error={
                                      touched.companyAdreess &&
                                      errors.companyAdreess
                                    }
                                    id={'companyAdreess'}
                                    inputClass={
                                      touched.companyAdreess &&
                                      errors.companyAdreess
                                        ? 'is-invalid'
                                        : ''
                                    }
                                    inputType={INPUT_TYPES.text}
                                    name="companyAdreess"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.companyAdreess}
                                    placeholder="Company Address"
                                  />
                                </Col>
                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">ZIP Code</span>
                                  <Input
                                    error={touched.zipCode && errors.zipCode}
                                    id={'zipCode'}
                                    inputClass={
                                      touched.zipCode && errors.zipCode
                                        ? 'is-invalid'
                                        : ''
                                    }
                                    inputType={INPUT_TYPES.number}
                                    name="zipCode"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.zipCode}
                                    placeholder="ZIP Code"
                                  />
                                </Col>
                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">IEC Number</span>
                                  <Input
                                    error={
                                      touched.iecNumber && errors.iecNumber
                                    }
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
                                    disabled
                                  />
                                </Col>
                                <Col
                                  sm={6}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">
                                    Exporter Type here
                                  </span>
                                  <Input
                                    error={
                                      touched.exporterType &&
                                      errors.exporterType
                                    }
                                    id={'exporterType'}
                                    inputClass={
                                      touched.exporterType &&
                                      errors.exporterType
                                        ? 'is-invalid'
                                        : ''
                                    }
                                    inputType={INPUT_TYPES.text}
                                    name="exporterType"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.exporterType}
                                    placeholder="Exporter Type"
                                    disabled
                                  />
                                </Col>

                                <Col
                                  sm={12}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                ></Col>

                                <div className="d-flex flex-column checkbox">
                                  {/* <div className="logintxt">
                                    <input
                                      type="checkbox"
                                      name="checkbox"
                                      onChange={handleChange}
                                      value={values.checkbox}
                                      required={true}
                                    />
                                    <p>
                                      FOR TRANSACTION TO INDEMNIFY EXCHANGE FOR
                                      ANY LOSS OF DUTY
                                    </p>
                                  </div> */}
                                  <div className="submitandsavbutton">
                                    <Button
                                      type="submit"
                                      className="butn b-c-p mt-4 p-3"
                                    >
                                      Update
                                    </Button>
                                    {/* <Button
                                      type="submit"
                                      className="butn mt-4 p-3 savebutton"
                                    >
                                      Save
                                    </Button> */}
                                  </div>
                                </div>
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
// const mapStateToProps = (state) => ({
//   // studentList: state.User.studentList,
// });

// const mapDispatchToProps = (dispatch) => ({
//   myProfileReq: bindActionCreators(myProfileReq, dispatch),
// });

// myProfile.propTypes = {
//   myProfileReq: PropTypes.func,
// };

export default MyProfile;
