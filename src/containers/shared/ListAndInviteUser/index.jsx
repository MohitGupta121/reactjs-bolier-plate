import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from '../../../components/Button';
import { BUTTON_TYPES, INPUT_TYPES } from '../../../components/constants';
import Input from '../../../components/Input';
import ModalComponent from '../../../components/Modal';
import { User } from '../../shared/Models/user';
import EditUser from '../EditUser';
import RemoveUser from '../RemoveUser';
import './list-and-invite-users.scss';

const ListAndInviteUsers = ({
  inviteRole,
  inviteType,
  spinner,
  formArray,
  fieldArrayProps,
  hideFirstCross,
  hideSendBtn,
  noList,
}) => {
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const { form, remove, push } = fieldArrayProps;
  const { touched, values, errors, handleBlur, handleChange } = form;
  let formsList = 0;

  const openEditUserPopup = () => {
    setShowEditUserModal(true);
  };
  const openRemoveUserPopup = () => {
    setShowRemoveUserModal(true);
  };

  const editUser = () => {
    setShowEditUserModal(false);
  };

  const deleteUser = () => {
    setShowRemoveUserModal(false);
  };

  const handleInviteAnother = () => {
    if (errors[formArray]?.length) {
      return;
    } else {
      push(new User());
    }
  };

  return (
    <>
      {values[formArray]?.length > 0 ? (
        <>
          <div className="readonly">
            {values[formArray].map((user, index) => {
              if (!user.editable && !user.error && !noList) {
                return (
                  <Row key={index} className={'m-0 user-row border-bottom'}>
                    <Col sm={7} className="email">
                      {user?.email}
                    </Col>
                    <Col sm={5} className="action-icon">
                      <i
                        className="icons icon-pencil"
                        onClick={() => {
                          setCurrentUser(user);
                          openEditUserPopup();
                        }}
                      />
                      <ModalComponent
                        modalShow={showEditUserModal}
                        hideModal={() => setShowEditUserModal(false)}
                        dialogClassName={'modal-650w'}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <EditUser
                          user={currentUser}
                          onSubmit={() => editUser()}
                          onCancel={() => setShowEditUserModal(false)}
                        />
                      </ModalComponent>
                      <i
                        className="icons icon-remove-user"
                        onClick={() => {
                          openRemoveUserPopup();
                          setCurrentUser(user);
                        }}
                      />
                      <ModalComponent
                        modalShow={showRemoveUserModal}
                        hideModal={() => setShowRemoveUserModal(false)}
                        dialogClassName={'modal-650w'}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <RemoveUser
                          user={currentUser}
                          editUser={openEditUserPopup}
                          onSubmit={() => deleteUser()}
                          onCancel={() => setShowRemoveUserModal(false)}
                        />
                      </ModalComponent>
                      <i
                        className="icons icon-circle-tick"
                        tooltip="ACCEPTED"
                      />
                    </Col>
                  </Row>
                );
              }
            })}
          </div>
          <div className="editable">
            {values[formArray].map((user, index) => {
              if (user.editable || user.error) {
                formsList++;
                return (
                  <div className="invite-forms" key={index}>
                    <Input
                      className="multi-form-input email-input"
                      error={
                        errors &&
                        errors[formArray] &&
                        errors[formArray][index] &&
                        errors[formArray][index]?.email &&
                        touched &&
                        touched[formArray] &&
                        touched[formArray][index] &&
                        touched[formArray][index]?.email &&
                        errors[formArray][index]?.email
                      }
                      inputClass={
                        errors &&
                        errors[formArray] &&
                        errors[formArray][index] &&
                        errors[formArray][index]?.email &&
                        touched &&
                        touched[formArray] &&
                        touched[formArray][index] &&
                        touched[formArray][index]?.email &&
                        errors[formArray][index]?.email
                          ? 'is-invalid'
                          : ''
                      }
                      id={'email'}
                      name={`${formArray}.${index}.email`}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Email"
                      inputType={INPUT_TYPES.email}
                      value={user.email}
                    />
                    <i
                      className={'icon-remove-user cross-icon'}
                      style={{
                        display:
                          hideFirstCross && index === 0 ? 'none' : 'inline',
                      }}
                      onClick={() => {
                        remove(index);
                        formsList--;
                      }}
                    />
                    {user.error ? (
                      <div className="response-error">{user.error}</div>
                    ) : (
                      ''
                    )}
                  </div>
                );
              }
            })}
          </div>
        </>
      ) : null}
      <div className="action-item">
        <span
          className="invite-admin"
          onClick={() => {
            handleInviteAnother();
          }}
        >
          + invite {formsList > 0 ? 'another' : 'an'} {inviteType.toUpperCase()}{' '}
          {inviteRole ? inviteRole.toUpperCase() : 'ADMIN'}
        </span>
        {!hideSendBtn && (
          <Button
            className={!formsList ? 'send-btn hidden' : 'send-btn'}
            type="submit"
            variant={BUTTON_TYPES.outlineDark}
            title="SEND"
            isLoading={spinner}
          />
        )}
      </div>
    </>
  );
};

ListAndInviteUsers.propTypes = {
  inviteType: PropTypes.string,
  formArray: PropTypes.string,
  spinner: PropTypes.bool,
  fieldArrayProps: PropTypes.any,
  hideSendBtn: PropTypes.bool,
  hideFirstCross: PropTypes.bool,
  noList: PropTypes.bool,
  inviteRole: PropTypes.string,
};

export default ListAndInviteUsers;
