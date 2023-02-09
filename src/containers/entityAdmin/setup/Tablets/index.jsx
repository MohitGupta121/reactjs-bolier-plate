import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../../../../components/Button';
import {BUTTON_TYPES} from '../../../../components/constants';
import '../../../../translation';
import '../setup.scss';

const Tablets = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {entityId} = useParams();
  return (
    <div className='entity-setup tablets'>
      <div className='page-title'>{t('entitySetup.title')}</div>
      <Row className='mx-0'>
        <Col className='entity-content'>
          <div className='entity-description'>
            <div className='entity-icons tablet-icons'>
              <i className='entity-icon icon-tablet' />
              <i className='entity-icon icon-tablet middle' />
              <i className='entity-icon icon-tablet' />
            </div>
            <div className='title'>{t('entitySetup.tablets.title')}</div>
            <div className='details'>
              {t('entitySetup.tablets.startTxt')}
              <span className='bold-text'>{t('entitySetup.tablets.boldDescrption')}</span>
              {t('entitySetup.tablets.endTxt')}
            </div>
          </div>
        </Col>
        <Col className='flow-image tablet-images'>
          <div className='flow-chart'>
            <img
              src={require('../../../../assets/images/tablets.png')}
              className='image'
              alt='tablets-image'
            />
            <div className='entity-names tablet-names'>
              <div className='entity-name tablet-name'>{t('entitySetup.entityName.tablet')}</div>
              <div className='entity-name tablet-name'>{t('entitySetup.entityName.team')}</div>
            </div>
          </div>
        </Col>
      </Row>
      <div className='text-center mt-4'>
        <Button
          className='next-btn'
          title='Next'
          variant={BUTTON_TYPES.outlineDark}
          onButtonClick={() => navigate(`/setup/${entityId}/profiles`)}
        />
      </div>
      <div className='back-link' onClick={() => navigate(`/setup/${entityId}/introduction`)}>
        &lt; Back
      </div>
    </div>
  );
};

export default Tablets;
