import PropTypes from 'prop-types';
import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../../../../components/Button';
import {BUTTON_TYPES} from '../../../../components/constants';
import '../../../../translation';
import Auth from '../../../../utils/Auth';
import {USER_TYPES} from '../../../../utils/Enum';
import '../setup.scss';

const Kitchens = ({locationLabel}) => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {entityId} = useParams();
  const description = Auth.getRoles().includes(USER_TYPES.USER)
    ? t('unitSetup.kitchens.description')
        .replaceAll('[Unit]', locationLabel.singular)
        .replaceAll('[Units]', locationLabel.plural)
    : t('entitySetup.kitchens.description');
  return (
    <div className='entity-setup'>
      <div className='page-title'>{t('entitySetup.title')}</div>
      <Row className='mx-0'>
        <Col className='entity-content'>
          <div className='entity-description'>
            <div className='entity-icons'>
              <i className='entity-icon icon-kitchen' />
            </div>
            <div className='title'>{t('entitySetup.kitchens.title')}</div>
            <div className='details'>{description}</div>
          </div>
        </Col>
        <Col className='flow-image kitchen-images'>
          <div>
            <img
              src={require('../../../../assets/images/kitchens.png')}
              className='image width-450'
              alt='unit-image'
            />
            <div className='entity-names kitchen-names'>
              <div className='entity-name kitchen-name'>{t('entitySetup.entityName.kitchen')}</div>
              <div className='entity-name kitchen-name'>{t('entitySetup.entityName.profile')}</div>
              <div className='entity-name kitchen-name'>{t('entitySetup.entityName.tablet')}</div>
              <div className='entity-name kitchen-name'>{t('entitySetup.entityName.team')}</div>
            </div>
          </div>
        </Col>
      </Row>
      <div className='text-center mt-2 footer'>
        <Button
          className='next-btn'
          title='Next'
          variant={BUTTON_TYPES.outlineDark}
          onButtonClick={() => navigate(`/setup/${entityId}/units`)}
        />
      </div>
      <div className='back-link' onClick={() => navigate(`/setup/${entityId}/profiles`)}>
        &lt; Back
      </div>
    </div>
  );
};

Kitchens.propTypes = {
  locationLabel: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    locationLabel: state.UnitUser.locationLabel,
  };
};

export default connect(mapStateToProps, null)(Kitchens);
