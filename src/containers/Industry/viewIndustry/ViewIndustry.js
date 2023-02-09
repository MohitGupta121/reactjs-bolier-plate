import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { FaRegThumbsUp } from 'react-icons/fa';
import './viewindustry.scss';
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
import { INPUT_TYPES } from '../../../components/constants';
import Input from '../../../components/Input';
import {
  createIndustryValidation,
  setUpValidation,
} from '../../../utils/validations';
import Sidebar from '../../../components/SideBar/SideBar';
import NavigationBar from '../../../components/NavBar/NavigationBar';

export const ViewIndustry = () => {
  const createAccount = (values) => {
    console.log(values);
  };

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [accountSetupForm, setAccountSetupForm] = useState({
    userType: '',
    companyName: '',
    iecNumber: '',
    companyAdreess: '',
    zipCode: '',
    compantPanNumber: '',
    gstiNumber: '',
    lastName: '',
    mobileNo: '',
    mcaRegisteredEmail: '',
    newPassword: '',
    confirmPassword: '',
  });
  const registerUser = (values) => {
    console.log(values);
  };

  return (
    <>
      <Container fluid className="viewindustrycontainer">
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
              <h1>View</h1>
            </div>
            <Container>
              <Row className="">
                <Col lg={7} className="">
                  <div className="form mt-lg-0 ms-lg-3 p-3">
                    <div className="mt-lg-1 mt-1">
                      <Formik
                        enableReinitialize
                        initialValues={accountSetupForm}
                        onSubmit={registerUser}
                        validationSchema={createIndustryValidation}
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
                                  sm={12}
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
                                  />
                                </Col>
                                <Col
                                  sm={12}
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
                                  />
                                </Col>
                                <Col
                                  sm={12}
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
                                  />
                                </Col>
                                <Col
                                  sm={12}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">Company Address</span>
                                  <Input
                                    error={
                                      touched.companyAdreess &&
                                      errors.companyAdreess
                                    }
                                    id={'companyAddress'}
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
                                  sm={12}
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
                                  sm={12}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <span className="lable">
                                    Please Select Exporter Type
                                  </span>
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
                                      Please Select Exporter Type
                                    </option>
                                    <option value="industry">
                                      I am Industry
                                    </option>
                                    <option value="agent">I am Agent</option>
                                  </FormSelect>
                                  {touched.userType && errors.userType ? (
                                    <div className="error-message">
                                      {errors.userType}
                                    </div>
                                  ) : null}
                                </Col>
                                <Col
                                  sm={12}
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
                                  sm={12}
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

                                {/* <div className="d-flex flex-column checkbox">
                                <div className="logintxt">
                                  <input
                                    type="checkbox"
                                    name="checkbox"
                                    required={true}
                                  />
                                  <p>
                                    FOR TRANSACTION TO INDEMNIFY EXCHANGE FOR
                                    ANY LOSS OF DUTY
                                  </p>
                                </div>
                                <div className="submitandsavbutton">
                                  <Button
                                    type="submit"
                                    className="butn mt-4 p-3"
                                  >
                                    UPDATE
                                  </Button>
                                  <Button
                                    type="submit"
                                    className="butn mt-4 p-3 savebutton"
                                  >
                                    Reset
                                  </Button>
                                </div>
                              </div> */}
                              </Row>
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>
                  </div>
                </Col>
                <Col lg={5} className="ps-lg-3 pe-lg-5">
                  <div className="viewsidebar p-3">
                    <div className="d-flex flex-column checkbox">
                      <div className="submitandsavbutton">
                        <Button
                          type="submit"
                          className="butn b-c-p mt-4 mb-2 p-3"
                        >
                          REQUEST REVIEW
                        </Button>
                        <Button
                          type="submit"
                          className="butn mt-4 mb-2 p-3 savebutton"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="reviewstatus mt-3 mb-4">
                      <p>Status: Review Pending</p>
                    </div>
                    <hr />
                    <div className="uploadeddocument mt-4 mb-4">
                      <p className="ud">Uploaded Document</p>
                      <div className="ud-content mb-3">
                        <div className="icon">
                          <svg
                            width="37"
                            height="37"
                            viewBox="0 0 37 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.3 0H11.1C9.065 0 7.4 1.665 7.4 3.7V25.9C7.4 27.935 9.065 29.6 11.1 29.6H33.3C35.335 29.6 37 27.935 37 25.9V3.7C37 1.665 35.335 0 33.3 0ZM17.575 13.875C17.575 15.4105 16.3355 16.65 14.8 16.65H12.95V20.35H10.175V9.25H14.8C16.3355 9.25 17.575 10.4895 17.575 12.025V13.875ZM26.825 17.575C26.825 19.1105 25.5855 20.35 24.05 20.35H19.425V9.25H24.05C25.5855 9.25 26.825 10.4895 26.825 12.025V17.575ZM34.225 12.025H31.45V13.875H34.225V16.65H31.45V20.35H28.675V9.25H34.225V12.025ZM12.95 13.875H14.8V12.025H12.95V13.875ZM3.7 7.4H0V33.3C0 35.335 1.665 37 3.7 37H29.6V33.3H3.7V7.4ZM22.2 17.575H24.05V12.025H22.2V17.575Z"
                              fill="#FF0035"
                            />
                          </svg>
                        </div>
                        <div className="text ms-3">
                          <p>Name of Documetn.PDF</p>
                          <p className="download">Download</p>
                        </div>
                      </div>
                      <div className="ud-content mb-3">
                        <div className="icon">
                          <svg
                            width="37"
                            height="37"
                            viewBox="0 0 37 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.3 0H11.1C9.065 0 7.4 1.665 7.4 3.7V25.9C7.4 27.935 9.065 29.6 11.1 29.6H33.3C35.335 29.6 37 27.935 37 25.9V3.7C37 1.665 35.335 0 33.3 0ZM17.575 13.875C17.575 15.4105 16.3355 16.65 14.8 16.65H12.95V20.35H10.175V9.25H14.8C16.3355 9.25 17.575 10.4895 17.575 12.025V13.875ZM26.825 17.575C26.825 19.1105 25.5855 20.35 24.05 20.35H19.425V9.25H24.05C25.5855 9.25 26.825 10.4895 26.825 12.025V17.575ZM34.225 12.025H31.45V13.875H34.225V16.65H31.45V20.35H28.675V9.25H34.225V12.025ZM12.95 13.875H14.8V12.025H12.95V13.875ZM3.7 7.4H0V33.3C0 35.335 1.665 37 3.7 37H29.6V33.3H3.7V7.4ZM22.2 17.575H24.05V12.025H22.2V17.575Z"
                              fill="#FF0035"
                            />
                          </svg>
                        </div>
                        <div className="text ms-3">
                          <p>Name of Documetn.PDF</p>
                          <p className="download">Download</p>
                        </div>
                      </div>
                      <div className="ud-content mb-3">
                        <div className="icon">
                          <svg
                            width="37"
                            height="37"
                            viewBox="0 0 37 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.3 0H11.1C9.065 0 7.4 1.665 7.4 3.7V25.9C7.4 27.935 9.065 29.6 11.1 29.6H33.3C35.335 29.6 37 27.935 37 25.9V3.7C37 1.665 35.335 0 33.3 0ZM17.575 13.875C17.575 15.4105 16.3355 16.65 14.8 16.65H12.95V20.35H10.175V9.25H14.8C16.3355 9.25 17.575 10.4895 17.575 12.025V13.875ZM26.825 17.575C26.825 19.1105 25.5855 20.35 24.05 20.35H19.425V9.25H24.05C25.5855 9.25 26.825 10.4895 26.825 12.025V17.575ZM34.225 12.025H31.45V13.875H34.225V16.65H31.45V20.35H28.675V9.25H34.225V12.025ZM12.95 13.875H14.8V12.025H12.95V13.875ZM3.7 7.4H0V33.3C0 35.335 1.665 37 3.7 37H29.6V33.3H3.7V7.4ZM22.2 17.575H24.05V12.025H22.2V17.575Z"
                              fill="#FF0035"
                            />
                          </svg>
                        </div>
                        <div className="text ms-3">
                          <p>Name of Documetn.PDF</p>
                          <p className="download">Download</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="commentssection mt-lg-4">
                      <p className="ud">Comments</p>
                      <div className="comment-content mb-3">
                        <div className="text">
                          <p>System: 24 April 2022, 12:00 PM</p>
                          <p className="comnt">
                            Dear Scrip Holder, We faced some issue to verify
                            your scrip. our executive will connect you shortly.
                            or feel free to reach us 1800 132543
                          </p>
                        </div>
                      </div>
                      <div className="comment-content mb-3">
                        <div className="text">
                          <p>System: 24 April 2022, 12:00 PM</p>
                          <p className="comnt">
                            Dear Scrip Holder, We faced some issue to verify
                            your scrip. our executive will connect you shortly.
                            or feel free to reach us 1800 132543
                          </p>
                        </div>
                      </div>
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
