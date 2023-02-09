import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../../../../components/Button';
import {BUTTON_TYPES} from '../../../../components/constants';
import '../../../../translation';
import Auth from '../../../../utils/Auth';
import {USER_TYPES} from '../../../../utils/Enum';
import './introduction.scss';

const Introduction = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {entityId} = useParams();
  const description = Auth.getRoles().includes(USER_TYPES.USER)
    ? t('unitSetup.introduction.description')
    : t('entitySetup.introduction.description');

  return (
    <div className='start-waste-mgmt'>
      <img
        src={require('../../../../assets/images/waste-not-logo.png')}
        className='logo-img'
        alt='waste-not-2.0-logo'
      />
      <h2 className='page-title'>{t('entitySetup.introduction.title')}</h2>
      <div className='start-waste-mgmt-title'>{description}</div>
      <Button
        className='getting-started'
        variant={BUTTON_TYPES.outlineDark}
        title="Let's get started"
        onButtonClick={() => navigate(`/setup/${entityId}/tablets`)}
      />
    </div>
  );
};

export default Introduction;
