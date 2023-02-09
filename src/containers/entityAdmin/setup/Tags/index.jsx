import PropTypes from 'prop-types';
import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../../../../components/Button';
import {BUTTON_TYPES} from '../../../../components/constants';
import '../../../../translation';
import '../setup.scss';

const Tags = ({ entity }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { entityId } = useParams();
  const description1 = t('entitySetup.tags.description1').replaceAll(
    '[Unit]',
    entity.locationLabel?.singular,
    '[Units]',
    entity.locationLabel?.plural
  );
  const description2 = t('entitySetup.tags.description2').replaceAll(
    '[Unit]',
    entity.locationLabel?.singular,
    '[Units]',
    entity.locationLabel?.plural
  );
  return (
    <div className='entity-setup'>
      <div className='page-title'>{t('entitySetup.tags.headerTitle')}</div>
      <Row className='mx-0'>
        <Col className='entity-content'>
          <div className='entity-description'>
            <div className='entity-icons margin-40'>
              <i className='entity-icon icon-tags'></i>
            </div>
            <div className='title'>{t('entitySetup.tags.title')}</div>
            <div className='details'>{description1}</div>
            <div className='details'>{description2}</div>
          </div>
        </Col>
        <Col className='flow-image margin-0 tags-images'>
          <div>
            <img
              src={require('../../../../assets/images/tags.png')}
              className='image width-450'
              alt='unit-image'
            />
            <div className='entity-names tag-names'>
              <div className='entity-name tag-name'>
                {t('entitySetup.entityName.analyticsReport')}
              </div>
              <div className='entity-name tag-name'>
                {t('entitySetup.entityName.filterDataWithTags')}
              </div>
              <div className='entity-name tag-name'>{t('entitySetup.entityName.masterDb')}</div>
              <div className='entity-name'>{entity.locationLabel.plural || '[Units]'}</div>
            </div>
          </div>
        </Col>
      </Row>
      <div className='text-center mt-4'>
        <Button
          className='next-btn'
          title='Next'
          variant={BUTTON_TYPES.outlineDark}
          onButtonClick={() => navigate(`/setup/${entityId}/financial-code`)}
        />
      </div>
      <div className='back-link' onClick={() => navigate(`/setup/${entityId}/master-database`)}>
        &lt; Back
      </div>
    </div>
  );
};

Tags.propTypes = {
  entity: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    entity: state.Entity.currentEntity,
  };
};

export default connect(mapStateToProps, null)(Tags);
