import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import './modal-testing.scss';
import { Col, Container, Row, Button, Modal } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import { INPUT_TYPES } from '../../components/constants';
import Input from '../../components/Input';
import { setUserValidation } from '../../utils/validations';
import ModalComponent from '../../components/Modal';

export const ModalTesting = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);

  const openEditUserPopup = () => {
    setShowEditUserModal(true);
  };
  const openRemoveUserPopup = () => {
    setShowRemoveUserModal(true);
  };

  return (
    <Container fluid className="h-auto">
      <ModalComponent
        modalShow={showEditUserModal}
        hideModal={() => setShowEditUserModal(false)}
        dialogClassName={'modal-650w'}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <EditUser
          user={currentUser}
          onSubmit={() => editUser()}
          onCancel={() => setShowEditUserModal(false)}
        /> */}
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditUserModal(false)}
          >
            Ok
          </Button>
        </Modal.Footer>
      </ModalComponent>

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
          <div className="form mt-lg-5 d-flex flex-column align-items-center">
            <div className="w-75 mt-lg-5 mt-1">
              <h1 className="pb-lg-1 mb-lg-4 mb-sm-3 mb-0 text-center">
                Open Modal
              </h1>

              <Row>
                <div className="d-flex flex-column align-items-center">
                  <div>
                    <Button
                      type="submit"
                      className="butn mt-2 p-3"
                      onClick={() => {
                        openEditUserPopup();
                      }}
                    >
                      CREATE ACCOUNT
                    </Button>
                  </div>
                </div>
              </Row>
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
