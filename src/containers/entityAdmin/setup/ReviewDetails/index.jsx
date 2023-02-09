import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { bindActionCreators } from 'redux';
import Button from '../../../../components/Button';
import { BUTTON_TYPES } from '../../../../components/constants';
import { currentRoute } from '../../.././../store/Entity/AddUnit/AddUnitAction';
import './review-details.scss';

const ReviewDetails = ({ entity, currentUnit, currentRoute }) => {
  const { t } = useTranslation();
  const { entityId, unitId } = useParams();
  const [tagsComplete, setTagsComplete] = useState(false);
  const navigate = useNavigate();
  const description = t('reviewDetails.description').replaceAll(
    '[Unit]',
    entity.locationLabel?.singular
  );

  useEffect(() => {
    if (currentUnit.categories?.length) {
      currentUnit.categories.forEach((category) => {
        const selectedTags = category.tags.filter((tag) => tag.selected);
        if (selectedTags?.length) {
          setTagsComplete(true);
        }
      });
    }
  }, []);

  return (
    <div className='review-details'>
      <div className='entity-name'>{entity.name}</div>
      <div className='page-title'>
        {`${currentUnit.name} ${currentUnit.id_number ? '(' + currentUnit.id_number + ')' : ''}`}
        <i
          className='icon-pencil'
          onClick={() => navigate(`/setup/${entityId}/unit/${unitId}/update-unit`)}
        />
      </div>
      <div className='description'>{description}</div>
      <Row className='setup-summary'>
        <Col sm={4}>
          <div className='details-card'>
            <div className='header'>
              <i
                className='icon-pencil'

              />
              <div className='page-title'>{'Details'}</div>
            </div>
            <ul className='details-list user-details'>
              <li className='list-items'>{currentUnit.name}</li>
              {currentUnit.id_number ? <li className='list-items'>{currentUnit.id_number}</li> : ''}
              <li className='list-items'>{`Country: ${currentUnit.country}`}</li>
              <li className='list-items'>{`State: ${currentUnit.state}`}</li>
              <li className='list-items'>{`City: ${currentUnit.city}`}</li>
              <li className='list-items'>{`Street: ${currentUnit.street}`}</li>
              <li className='list-items'>{`Zip Code: ${currentUnit.zip_code}`}</li>
            </ul>
          </div>
        </Col>
        <Col sm={4}>
          <div className='details-card'>
            <div className={tagsComplete ? 'header' : 'header red-txt'}>
              <i
                className='icon-pencil'

              />
              <div className='page-title'>{'Tags'}</div>
            </div>
            <ul className='details-list'>
              {currentUnit.categories.map((category, index) => {
                const selected = category.tags.filter((tag) => tag.selected);
                return selected.length ? (
                  <li key={index} className='list-items dark'>
                    <div className='title'>{category.name}</div>
                    {selected.map((tag, tagIndex) => (
                      <div key={tagIndex} className='list-items'>
                        {tag.name}
                      </div>
                    ))}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </Col>
        <Col sm={4}>
          <div className='details-card'>
            <div className={currentUnit.users.length ? 'header' : 'header red-txt'}>
              <i
                className='icon-pencil'

              />
              <div className={'page-title'}>{`${entity.locationLabel.singular} users`}</div>
            </div>
            <ul className='details-list'>
              {currentUnit.users.map((user, index) => {
                return (
                  <li key={index} className='list-items'>
                    <Row>
                      <Col sm={4}>{`${user.first_name || '-'} ${user.last_name || '-'}`}</Col>
                      <Col>{user.email}</Col>
                    </Row>
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
      </Row>
      <div className='action-btns'>
        <Button
          variant={BUTTON_TYPES.outlineDark}
          title={t('reviewDetails.saveAndNext').replace('[UNIT]', entity.locationLabel.singular)}
        />
        <Button variant={BUTTON_TYPES.outlineDark} title={t('reviewDetails.exit')} type='submit' />
      </div>
    </div>
  );
};

ReviewDetails.propTypes = {
  entity: PropTypes.any,
  currentUnit: PropTypes.object,
  currentRoute: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    entity: state.Entity.currentEntity,
    currentUnit: state.AddUnit.currentUnit,
    currentRoute: state.AddUnit.currentRoute,
  };
};

const mapDispatchToProps = (dispatch) => ({
  currentRoute: bindActionCreators(currentRoute, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetails);
