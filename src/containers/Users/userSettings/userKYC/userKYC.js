import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { FaRegThumbsUp } from 'react-icons/fa';
import './userkyc.scss';
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
import { mykycValidation } from '../../../../utils/validations';
import Sidebar from '../../../../components/SideBar/SideBar';
import NavigationBar from '../../../../components/NavBar/NavigationBar';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createIndustryReq } from '../../../../store/Industry/IndustryAction';
import MySettings from '../../../../components/MySettings';

const UserKYC = (props) => {
  const createAccount = (values) => {
    console.log(values);
  };

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [accountSetupForm, setAccountSetupForm] = useState({
    companyLegalName: 'Company Legal Name',
    cinNo: 'U72900MP2021PTC055479',
    companyPanNumber: 'AAAAA0000A',
    mcaRegisteredEmail: 'company@gmail.com',
    companyAdreess: '55 M, Indira Nagar, New Delhi, India',
    gstiNumber: '22AAAAA0000A1Z5',
    checkbox: false,
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
      <Container fluid className="kyccontainer">
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
              <h1>KYC</h1>
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
                        validationSchema={mykycValidation}
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
                                  <span className="lable">
                                    Company Legal Name
                                  </span>
                                  <Input
                                    error={
                                      touched.companyLegalName &&
                                      errors.companyLegalName
                                    }
                                    id={'companyLegalName'}
                                    inputClass={
                                      touched.companyLegalName &&
                                      errors.companyLegalName
                                        ? 'is-invalid'
                                        : ''
                                    }
                                    inputType={INPUT_TYPES.text}
                                    name="companyLegalName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.companyLegalName}
                                    placeholder="Company Legal Name"
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
                                  <span className="lable">
                                    Company PAN Number
                                  </span>
                                  <Input
                                    error={
                                      touched.companyPanNumber &&
                                      errors.companyPanNumber
                                    }
                                    id={'companyPanNumber'}
                                    inputClass={
                                      touched.companyPanNumber &&
                                      errors.companyPanNumber
                                        ? 'is-invalid'
                                        : ''
                                    }
                                    inputType={INPUT_TYPES.text}
                                    name="companyPanNumber"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.companyPanNumber}
                                    placeholder="Company PAN Number"
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
                                  <span className="lable">GSTIN</span>
                                  <Input
                                    error={
                                      touched.gstiNumber && errors.gstiNumber
                                    }
                                    id={'gstiNumber'}
                                    inputClass={
                                      touched.gstiNumber && errors.gstiNumber
                                        ? 'is-invalid'
                                        : ''
                                    }
                                    inputType={INPUT_TYPES.text}
                                    name="gstiNumber"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.gstiNumber}
                                    placeholder="GSTIN"
                                  />
                                </Col>

                                <Col
                                  sm={12}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                ></Col>

                                <div className="d-flex flex-column checkbox">
                                  <div className="logintxt">
                                    <input
                                      type="checkbox"
                                      name="checkbox"
                                      onChange={handleChange}
                                      value={values.checkbox}
                                      required={true}
                                    />
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit.
                                    </p>
                                  </div>
                                  {/* <div className="submitandsavbutton">
                                    <Button
                                      type="submit"
                                      className="butn b-c-p mt-4 p-3"
                                    >
                                      Submit
                                    </Button>
                                    <Button
                                      type="submit"
                                      className="butn mt-4 p-3 savebutton"
                                    >
                                      Save
                                    </Button>
                                  </div> */}
                                </div>
                              </Row>
                              <Row className="save-and-submit mt-4">
                                <Col
                                  sm={12}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <div className="checkbox">
                                    <div className="submitandsavbutton">
                                      <Button
                                        type="submit"
                                        className="butn b-c-p mt-4 p-3"
                                      >
                                        Submit
                                      </Button>
                                      <Button
                                        type="submit"
                                        className="butn mt-4 p-3 savebutton"
                                      >
                                        Save
                                      </Button>
                                    </div>
                                  </div>
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
// const mapStateToProps = (state) => ({
//   // studentList: state.User.studentList,
// });

// const mapDispatchToProps = (dispatch) => ({
//   myProfileReq: bindActionCreators(myProfileReq, dispatch),
// });

// myProfile.propTypes = {
//   myProfileReq: PropTypes.func,
// };

export default UserKYC;
