import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../../../../components/Button';
import {BUTTON_TYPES} from '../../../../components/constants';
import '../../../../translation';
import Auth from '../../../../utils/Auth';
import {USER_TYPES} from '../../../../utils/Enum';
import '../setup.scss';

const Profiles = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {entityId} = useParams();
  const description = Auth.getRoles().includes(USER_TYPES.USER)
    ? t('unitSetup.profiles.description')
    : t('entitySetup.profiles.description');

  t('entitySetup.profiles.description');
  return (
    <div className='entity-setup profiles'>
      <div className='page-title'>{t('entitySetup.title')}</div>
      <Row className='mx-0'>
        <Col className='entity-content'>
          <div className='entity-description'>
            <div className='entity-icons'>
              <i className='entity-icon icon-profile11' />
              <i className='entity-icon icon-profile1 position-top' />
            </div>
            <div className='title'>{t('entitySetup.profiles.title')}</div>
            <div className='details'>
              {description}
              <ul className='entity-setup-lists'>
                <li className='entity-setup-item'>- {t('entitySetup.profiles.list.list1')}</li>
                <li className='entity-setup-item'>- {t('entitySetup.profiles.list.list2')}</li>
                <li className='entity-setup-item'>- {t('entitySetup.profiles.list.list3')}</li>
              </ul>
            </div>
          </div>
        </Col>
        <Col className='flow-image profile-images'>
          <div>
            <img
              src={require('../../../../assets/images/profiles.png')}
              className='image width-450'
              alt='unit-image'
            />
            <div className='entity-names profile-names'>
              <div className='entity-name profile-name'>{t('entitySetup.entityName.profile')}</div>
              <div className='entity-name profile-name'>{t('entitySetup.entityName.tablet')}</div>
              <div className='entity-name profile-name'>{t('entitySetup.entityName.team')}</div>
            </div>
          </div>
        </Col>
      </Row>
      <div className='text-center mt-2'>
        <Button
          className='next-btn'
          title='Next'
          variant={BUTTON_TYPES.outlineDark}
          onButtonClick={() => navigate(`/setup/${entityId}/kitchens`)}
        />
      </div>
      <div className='back-link' onClick={() => navigate(`/setup/${entityId}/tablets`)}>
        &lt; Back
      </div>
    </div>
  );
};

export default Profiles;
