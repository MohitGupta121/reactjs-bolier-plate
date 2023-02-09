import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from '../../../components/Button';
import { BUTTON_TYPES, INPUT_TYPES } from '../../../components/constants';
import Input from '../../../components/Input';
import ModalComponent from '../../../components/Modal';
import './AccountPreference.scss';

const AccountPreference = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const onSubmit = () => {
    setShowChangePasswordModal(false);
  };
  const onCancel = () => {
    setShowChangePasswordModal(false);
  };
  return (
    <>
      <div className="account-preference">
        <div className="page-title">ACCOUNT PREFERENCES</div>
        <div>
          <Row>
            <Col sm={6}>
              <Input
                className="account-preference-input"
                id={'first-name'}
                label={'First Name'}
                placeholder={'Current[First]'}
                inputType={INPUT_TYPES.text}
              />
            </Col>
            <Col sm={6}>
              <Input
                className="account-preference-input"
                id={'last-name'}
                label={'Last Name'}
                placeholder={'Current[Last]'}
                inputType={INPUT_TYPES.text}
              />
            </Col>
            <Col md={6}>
              <Input
                className="account-preference-input"
                id={'login-email'}
                label={'Login Email'}
                placeholder={'name@email.com'}
                inputType={INPUT_TYPES.email}
              />
            </Col>
            <Col md={6}>
              <Input
                className="account-preference-input"
                id={'password'}
                label={'Password'}
                placeholder={'**********'}
                inputType={INPUT_TYPES.password}
              />
            </Col>
            <Col sm={12}>
              <div
                className="change-password-link"
                onClick={() => setShowChangePasswordModal(true)}
              >
                change password
              </div>
            </Col>
          </Row>
        </div>
        <div className="action-btn">
          <Button
            className="px-3 px-sm-4 py-1"
            variant={BUTTON_TYPES.outlineDark}
            type="submit"
            title="Cancel"
          />
          <Button
            className="px-3 px-sm-4 py-1"
            variant={BUTTON_TYPES.outlineDark}
            type="submit"
            title={'Save'}
          />
        </div>
      </div>
      <ModalComponent
        modalShow={showChangePasswordModal}
        hideModal={() => setShowChangePasswordModal(false)}
        dialogClassName={'modal-650w'}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      ></ModalComponent>
    </>
  );
};

export default AccountPreference;
