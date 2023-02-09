import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from '../../../components/Button';
import { BUTTON_TYPES, INPUT_TYPES } from '../../../components/constants';
import Input from '../../../components/Input';
import { editUserValidation } from '../../../utils/validations';
import './EditUser.scss';

const EditUser = ({ onCancel, onSubmit, user }) => {
  const [users, setUsers] = useState(
    [
      { organizationName: 'Newput', entityName: 'Gurpreet' },
      { organizationName: 'Newput', entityName: 'Deepak' },
    ],
    null
  );

  const initialValues = user;

  const save = () => {
    onSubmit();
  };

  const cancel = () => {
    onCancel();
  };

  const removeAccess = (index) => {
    const userList = [...users];
    userList[index].restoreAccess = true;
    setUsers(userList);
  };

  const removeAllAccess = () => {
    let userList = [...users];
    userList = userList.map((user) => {
      user.restoreAccess = true;
      return user;
    });
    setUsers(userList);
  };

  return (
    <div className="edit-user">
      <div className="page-title">Edit User</div>
      <Formik
        initialValues={initialValues}
        validationSchema={editUserValidation}
        onSubmit={save}
      >
        {({
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm={6} xs={12} className="border-right">
                  <Input
                    label="First Name"
                    inputType={INPUT_TYPES.text}
                    className="edit-user-input"
                    name="first_name"
                    error={touched.first_name && errors.first_name}
                    inputClass={
                      touched.first_name && errors.first_name
                        ? 'is-invalid'
                        : ''
                    }
                    value={values.first_name}
                    id="first-name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    label="Last Name"
                    inputType={INPUT_TYPES.text}
                    className="edit-user-input"
                    name="last_name"
                    error={touched.last_name && errors.last_name}
                    inputClass={
                      touched.last_name && errors.last_name ? 'is-invalid' : ''
                    }
                    id="last-name"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    label="Email"
                    inputType={INPUT_TYPES.Email}
                    className="edit-user-input email-input"
                    name="email"
                    error={touched.email && errors.email}
                    inputClass={
                      touched.email && errors.email ? 'is-invalid' : ''
                    }
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Col>
                <Col sm={6} xs={12} className="padding-25">
                  <div className="access-title">Admin Access</div>
                  <Button
                    variant={BUTTON_TYPES.outlineDark}
                    className="red-btn remove-access-btn"
                    title={'REMOVE ALL ACCESS FOR THIS USER'}
                    onButtonClick={() => removeAllAccess()}
                  />
                  <table className="edit-user-table">
                    <thead>
                      <tr>
                        <th>Entity Admin</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => {
                        return (
                          <tr className="table-row" key={index}>
                            <td
                              className={
                                'org-name ' +
                                (user.restoreAccess ? 'strike-through' : '')
                              }
                            >
                              {user.organizationName} - {user.entityName}
                            </td>
                            <td className="remove-access">
                              <a
                                className={
                                  'remove-access-link ' +
                                  (user.restoreAccess ? 'restore-access' : '')
                                }
                                onClick={() => removeAccess(index)}
                              >
                                remove access
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Col>
              </Row>
              <div className="action-btn">
                <Button
                  variant={BUTTON_TYPES.outlineDark}
                  title={'Cancel'}
                  onButtonClick={() => cancel()}
                />
                <Button
                  variant={BUTTON_TYPES.outlineDark}
                  title={'Save'}
                  type="submit"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

EditUser.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  user: PropTypes.object,
};

export default EditUser;
