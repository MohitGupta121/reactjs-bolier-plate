import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../../components/Button';
import { BUTTON_TYPES } from '../../../components/constants';
import './RemoveUser.scss';

const RemoveUser = ({ onCancel, onSubmit, user, editUser }) => {
  const removeAllAccess = () => {

  };
  const userData = user;
  return (
    <div className='remove-user'>
      <div className='page-title'>REMOVE THIS USER’S ENTITY ADMIN ACCESS TO [ENTITY NAME]?</div>
      <div className='user-details'>
        <div className='user-name'>{`${userData.first_name} ${userData.last_name}`}</div>
        <div className='user-email'>{userData.email}</div>
      </div>
      <div className='remove-user-description'>
        The user will no longer have Entity Admin access to [Entity Name] but may still be Entity
        Admin for oher Entities (edit the user to view and manage all of their permissions).
      </div>
      <div className='action-btn'>
        <div>
          <Button
            variant={BUTTON_TYPES.outlineDark}
            className='red-btn'
            title="remove user's access to this [unit]"
            onButtonClick={() => removeAllAccess()}
          />
          <div className='align-btn'>
            <Button
              className='modal-btn'
              variant={BUTTON_TYPES.outlineDark}
              type='submit'
              title='Cancel'
              onButtonClick={() => onCancel(false)}
            />
            <Button
              className='modal-btn'
              variant={BUTTON_TYPES.outlineDark}
              type='submit'
              title={'Edit User'}
              onButtonClick={() => {
                onSubmit();
                editUser();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

RemoveUser.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  user: PropTypes.object,
  editUser: PropTypes.func,
};

export default RemoveUser;
