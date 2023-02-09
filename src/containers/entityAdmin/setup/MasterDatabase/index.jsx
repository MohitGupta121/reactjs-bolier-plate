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

const MasterDatabase = ({entity, locationLabel}) => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {entityId} = useParams();
  const description = Auth.getRoles().includes(USER_TYPES.USER)
    ? t('entitySetup.masterDb.description')
        .replaceAll('[Unit]', locationLabel.singular || '[Unit]')
        .replaceAll('[Units]', locationLabel?.plural || '[Units]')
    : t('entitySetup.masterDb.description')
        .replaceAll('[Unit]', entity.locationLabel?.singular || '[Unit]')
        .replaceAll('[Units]', entity.locationLabel?.plural || '[Units]');
  return (
    <div className='entity-setup'>
      <div className='page-title'>{t('entitySetup.title')}</div>
      <Row className='mx-0'>
        <Col className='entity-content'>
          <div className='entity-description'>
            <div className='entity-icons'>
              <i className='entity-icon icon-cloud-upload' />
            </div>
            <div className='title'>{t('entitySetup.masterDb.title')}</div>
            <div className='details'>{description}</div>
          </div>
        </Col>
        <Col className='flow-image margin-0 master-db-images'>
          <div>
            <img
              src={require('../../../../assets/images/master-db.png')}
              className='image width-450'
              alt='unit-image'
            />
            <div className='entity-names masterdb-names'>
              <div className='entity-name masterdb-name'>
                {entity.locationLabel?.singular || locationLabel?.singular || '[Unit]'}
              </div>
              <div className='entity-name masterdb-name'>{t('entitySetup.entityName.kitchen')}</div>
              <div className='entity-name masterdb-name'>{t('entitySetup.entityName.profile')}</div>
              <div className='entity-name masterdb-name'>{t('entitySetup.entityName.tablet')}</div>
              <div className='entity-name masterdb-name'>{t('entitySetup.entityName.team')}</div>
            </div>
          </div>
        </Col>
      </Row>
      <div className='text-center mt-2'>
        <Button
          className='next-btn'
          title='Next'
          variant={BUTTON_TYPES.outlineDark}
          onButtonClick={() => navigate(`/setup/${entityId}/tags`)}
        />
      </div>
      <div className='back-link' onClick={() => navigate(`/setup/${entityId}/units`)}>
        &lt; Back
      </div>
    </div>
  );
};

MasterDatabase.propTypes = {
  entity: PropTypes.object,
  locationLabel: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    entity: state.Entity.currentEntity,
    locationLabel: state.UnitUser.locationLabel,
  };
};

export default connect(mapStateToProps, null)(MasterDatabase);
