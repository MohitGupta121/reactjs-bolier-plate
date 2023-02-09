import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { FaRegThumbsUp } from 'react-icons/fa';
import './createindustry.scss';
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
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createIndustryReq } from '../../../store/Industry/IndustryAction';

const CreateIndustry = (props) => {
  const createAccount = (values) => {
    console.log(values);
  };

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [accountSetupForm, setAccountSetupForm] = useState({
    companyName: '',
    iecNumber: '',
    companyAdreess: '',
    zipCode: '',
    cinNo: '',
    companyPanNumber: '',
    gstiNumber: '',
    mcaRegisteredEmail: '',
    checkbox: false,
    uploadCompanyPdf: null,
  });
  const registerUser = (values) => {
    // console.log(values);
    props.createIndustryReq(values, successCallback);
  };
  const successCallback = () => {
    console.log('callBack Called');
    // Navigate('/login');
  };
  const toUppercase = (event) => {
    const result = event.target.value.toUpperCase();

    setAccountSetupForm(result);
  };
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
              <h1>Create</h1>
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
                                  />
                                </Col>
                                <Col
                                  sm={12}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
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
                                  sm={12}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
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
                                >
                                  <Dropzone
                                    accept={'pdf'}
                                    maxFiles={1}
                                    maxSize={2000000}
                                    multiple={false}
                                    onDrop={(acceptedFiles) =>
                                      console.log('onDrop', acceptedFiles)
                                    }
                                    onDropAccepted={(acceptedFiles) => {
                                      setFieldValue(
                                        'uploadCompanyPdf',
                                        acceptedFiles[0]
                                      );
                                      console.log(
                                        'acceptedFiles',
                                        acceptedFiles
                                      );
                                    }}
                                    onDropRejected={(rejectedFiles) => {
                                      console.log(
                                        'rejectedFiles',
                                        rejectedFiles
                                      );
                                    }}
                                  >
                                    {({ getRootProps, getInputProps }) => (
                                      <section>
                                        <div {...getRootProps()}>
                                          <input {...getInputProps()} />
                                          <div className="uploadpdf">
                                            <span className="uploadpsficon">
                                              <svg
                                                width="28"
                                                height="34"
                                                viewBox="0 0 28 34"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M8 26H20V14H28L14 0L0 14H8V26ZM0 30H28V34H0V30Z"
                                                  fill="#FF0035"
                                                />
                                              </svg>
                                            </span>
                                            <p>Company.pdf</p>
                                            <span className="removepsficon">
                                              <svg
                                                width="40"
                                                height="40"
                                                viewBox="0 0 40 40"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M33.3335 3.33398H13.3335C11.5002 3.33398 10.0002 4.83398 10.0002 6.66732V26.6673C10.0002 28.5007 11.5002 30.0007 13.3335 30.0007H33.3335C35.1668 30.0007 36.6668 28.5007 36.6668 26.6673V6.66732C36.6668 4.83398 35.1668 3.33398 33.3335 3.33398ZM19.1668 15.834C19.1668 17.2173 18.0502 18.334 16.6668 18.334H15.0002V21.6673H12.5002V11.6673H16.6668C18.0502 11.6673 19.1668 12.784 19.1668 14.1673V15.834ZM27.5002 19.1673C27.5002 20.5507 26.3835 21.6673 25.0002 21.6673H20.8335V11.6673H25.0002C26.3835 11.6673 27.5002 12.784 27.5002 14.1673V19.1673ZM34.1668 14.1673H31.6668V15.834H34.1668V18.334H31.6668V21.6673H29.1668V11.6673H34.1668V14.1673ZM15.0002 15.834H16.6668V14.1673H15.0002V15.834ZM6.66683 10.0007H3.3335V33.334C3.3335 35.1673 4.8335 36.6673 6.66683 36.6673H30.0002V33.334H6.66683V10.0007ZM23.3335 19.1673H25.0002V14.1673H23.3335V19.1673Z"
                                                  fill="#FF0035"
                                                />
                                              </svg>
                                              Remove
                                            </span>
                                          </div>
                                        </div>
                                      </section>
                                    )}
                                  </Dropzone>
                                </Col>
                                <Col
                                  sm={12}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <div className="uploadpdf">
                                    <span className="uploadpsficon">
                                      <svg
                                        width="28"
                                        height="34"
                                        viewBox="0 0 28 34"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8 26H20V14H28L14 0L0 14H8V26ZM0 30H28V34H0V30Z"
                                          fill="#FF0035"
                                        />
                                      </svg>
                                    </span>
                                    <p>Upload GST Certificate*</p>
                                    {/* <span className="removepsficon">
                                      <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M33.3335 3.33398H13.3335C11.5002 3.33398 10.0002 4.83398 10.0002 6.66732V26.6673C10.0002 28.5007 11.5002 30.0007 13.3335 30.0007H33.3335C35.1668 30.0007 36.6668 28.5007 36.6668 26.6673V6.66732C36.6668 4.83398 35.1668 3.33398 33.3335 3.33398ZM19.1668 15.834C19.1668 17.2173 18.0502 18.334 16.6668 18.334H15.0002V21.6673H12.5002V11.6673H16.6668C18.0502 11.6673 19.1668 12.784 19.1668 14.1673V15.834ZM27.5002 19.1673C27.5002 20.5507 26.3835 21.6673 25.0002 21.6673H20.8335V11.6673H25.0002C26.3835 11.6673 27.5002 12.784 27.5002 14.1673V19.1673ZM34.1668 14.1673H31.6668V15.834H34.1668V18.334H31.6668V21.6673H29.1668V11.6673H34.1668V14.1673ZM15.0002 15.834H16.6668V14.1673H15.0002V15.834ZM6.66683 10.0007H3.3335V33.334C3.3335 35.1673 4.8335 36.6673 6.66683 36.6673H30.0002V33.334H6.66683V10.0007ZM23.3335 19.1673H25.0002V14.1673H23.3335V19.1673Z"
                                          fill="#FF0035"
                                        />
                                      </svg>
                                      Remove
                                    </span> */}
                                  </div>
                                </Col>
                                <Col
                                  sm={12}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <div className="uploadpdf">
                                    <span className="uploadpsficon">
                                      <svg
                                        width="28"
                                        height="34"
                                        viewBox="0 0 28 34"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8 26H20V14H28L14 0L0 14H8V26ZM0 30H28V34H0V30Z"
                                          fill="#FF0035"
                                        />
                                      </svg>
                                    </span>
                                    <p>Upload IEC Certificate</p>
                                    {/* <span className="removepsficon">
                                      <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M33.3335 3.33398H13.3335C11.5002 3.33398 10.0002 4.83398 10.0002 6.66732V26.6673C10.0002 28.5007 11.5002 30.0007 13.3335 30.0007H33.3335C35.1668 30.0007 36.6668 28.5007 36.6668 26.6673V6.66732C36.6668 4.83398 35.1668 3.33398 33.3335 3.33398ZM19.1668 15.834C19.1668 17.2173 18.0502 18.334 16.6668 18.334H15.0002V21.6673H12.5002V11.6673H16.6668C18.0502 11.6673 19.1668 12.784 19.1668 14.1673V15.834ZM27.5002 19.1673C27.5002 20.5507 26.3835 21.6673 25.0002 21.6673H20.8335V11.6673H25.0002C26.3835 11.6673 27.5002 12.784 27.5002 14.1673V19.1673ZM34.1668 14.1673H31.6668V15.834H34.1668V18.334H31.6668V21.6673H29.1668V11.6673H34.1668V14.1673ZM15.0002 15.834H16.6668V14.1673H15.0002V15.834ZM6.66683 10.0007H3.3335V33.334C3.3335 35.1673 4.8335 36.6673 6.66683 36.6673H30.0002V33.334H6.66683V10.0007ZM23.3335 19.1673H25.0002V14.1673H23.3335V19.1673Z"
                                          fill="#FF0035"
                                        />
                                      </svg>
                                      Remove
                                    </span> */}
                                  </div>
                                </Col>
                                <Col
                                  sm={12}
                                  xs={12}
                                  className="mb-2 mb-sm-3 mb-lg-4"
                                >
                                  <div className="uploadpdf">
                                    <span className="uploadpsficon">
                                      <svg
                                        width="28"
                                        height="34"
                                        viewBox="0 0 28 34"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8 26H20V14H28L14 0L0 14H8V26ZM0 30H28V34H0V30Z"
                                          fill="#FF0035"
                                        />
                                      </svg>
                                    </span>
                                    <p>Other Supporting Document</p>
                                    {/* <span className="removepsficon">
                                      <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M33.3335 3.33398H13.3335C11.5002 3.33398 10.0002 4.83398 10.0002 6.66732V26.6673C10.0002 28.5007 11.5002 30.0007 13.3335 30.0007H33.3335C35.1668 30.0007 36.6668 28.5007 36.6668 26.6673V6.66732C36.6668 4.83398 35.1668 3.33398 33.3335 3.33398ZM19.1668 15.834C19.1668 17.2173 18.0502 18.334 16.6668 18.334H15.0002V21.6673H12.5002V11.6673H16.6668C18.0502 11.6673 19.1668 12.784 19.1668 14.1673V15.834ZM27.5002 19.1673C27.5002 20.5507 26.3835 21.6673 25.0002 21.6673H20.8335V11.6673H25.0002C26.3835 11.6673 27.5002 12.784 27.5002 14.1673V19.1673ZM34.1668 14.1673H31.6668V15.834H34.1668V18.334H31.6668V21.6673H29.1668V11.6673H34.1668V14.1673ZM15.0002 15.834H16.6668V14.1673H15.0002V15.834ZM6.66683 10.0007H3.3335V33.334C3.3335 35.1673 4.8335 36.6673 6.66683 36.6673H30.0002V33.334H6.66683V10.0007ZM23.3335 19.1673H25.0002V14.1673H23.3335V19.1673Z"
                                          fill="#FF0035"
                                        />
                                      </svg>
                                      Remove
                                    </span> */}
                                  </div>
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
                                      FOR TRANSACTION TO INDEMNIFY EXCHANGE FOR
                                      ANY LOSS OF DUTY
                                    </p>
                                  </div>
                                  <div className="submitandsavbutton">
                                    <Button
                                      type="submit"
                                      className="butn b-c-p mt-4 p-3"
                                    >
                                      SUBMIT FOR VERYFICATION
                                    </Button>
                                    <Button
                                      type="submit"
                                      className="butn mt-4 p-3 savebutton"
                                    >
                                      Save
                                    </Button>
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
const mapStateToProps = (state) => ({
  // studentList: state.User.studentList,
});

const mapDispatchToProps = (dispatch) => ({
  createIndustryReq: bindActionCreators(createIndustryReq, dispatch),
});

CreateIndustry.propTypes = {
  createIndustryReq: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateIndustry);
