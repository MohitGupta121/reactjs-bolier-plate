import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';
import { BUTTON_TYPES } from '../../../components/constants';
import '../../../translation';
import Auth from '../../../utils/Auth';
import { USER_TYPES } from '../../../utils/Enum';
import './PendingInviteDialog.scss';

const PendingInviteDialog = ({
  onSubmit,
  pendingOrganizationList,
  pendingEntityList,
  pendingUserList,
  isLoading,
}) => {
  const { t } = useTranslation();
  const config = {
    organization: t('pendingInvite.organization'),
    entity: t('pendingInvite.entity'),
    user: t('pendingInvite.user'),
  };
  const userRoles = Auth.getRoles();
  return (
    <div className='pending-invite text-center'>
      {userRoles.includes(USER_TYPES.ORGANIZATION_ADMIN) && pendingOrganizationList?.length ? (
        <>
          <div className='page-title'>{config.organization}</div>
          {pendingOrganizationList.map((user, index) => {
            return (
              <div key={index} className='user-name'>
                {user.name}
              </div>
            );
          })}
        </>
      ) : null}
      {userRoles.includes(USER_TYPES.ENTITY) && pendingEntityList?.length ? (
        <>
          <div className='page-title'>{config.entity}</div>
          {pendingEntityList?.map((user, index) => {
            return (
              <div key={index} className='user-name'>
                {user.name}
              </div>
            );
          })}
        </>
      ) : null}

      {userRoles.includes(USER_TYPES.USER) && pendingUserList?.length ? (
        <>
          <div className='page-title'>{config.user}</div>
          {pendingUserList.map((user, index) => {
            return (
              <div key={index} className='user-name'>
                {user.name}
              </div>
            );
          })}
        </>
      ) : null}

      <div className='close-btn'>
        <Button
          variant={BUTTON_TYPES.outlineDark}
          title={t('pendingInvite.btnTitle')}
          isLoading={isLoading}
          onButtonClick={() => onSubmit()}
        />
      </div>
    </div>
  );
};

PendingInviteDialog.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  pendingOrganizationList: PropTypes.array,
  pendingEntityList: PropTypes.array,
  pendingUserList: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default PendingInviteDialog;
