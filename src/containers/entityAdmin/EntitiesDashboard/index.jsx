/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router';
import {Navigate} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import DashedButton from '../../../components/DashedButton';
import Loader from '../../../components/Loader';
import {organizationEntityList} from '../../../store/Organization/OrganizationAction';
import '../../../translation';
import './entities-dashboard.scss';

const EntitiesDashboard = ({entities, organizationEntityList, isOrg}) => {
  const {t} = useTranslation();
  const [spinner, setSpinner] = useState({
    entityLoading: false,
  });

  useEffect(() => {
    setSpinner({entityLoading: true});
    organizationEntityList({}, () => setSpinner({entityLoading: false}));
  }, []);

  const getRoute = (entity) => {
    if (entity.completed_step === 1) {
      if (entity.location_label?.length) {
        if (Object.keys(entity?.accounting_label)?.length) {
          if (entity.primary_language) {
            return `/setup/${entity.id}/containers`;
          } else {
            return `/setup/${entity.id}/update-general-setting`;
          }
        } else {
          return `/setup/${entity.id}/master-database`;
        }
      } else {
        return `/setup/${entity.id}/introduction`;
      }
    } else if (entity.completed_step === 2) {
      return `/setup/${entity.id}/containers`;
    } else if (entity.completed_step === 3) {
      return `/setup/${entity.id}/manage-tags`;
    } else if (entity.completed_step === 4) {
      return `/dashboard/${entity.id}`;
    } else {
      return `/setup/${entity.id}/introduction`;
    }
  };

  const navigate = useNavigate();
  return spinner.entityLoading ? (
    <Loader />
  ) : !isOrg && entities.length === 1 ? (
    <Navigate to={getRoute(entities[0])} replace={true} />
  ) : (
    <div
      className={isOrg ? 'container entity-admin-dashboard' : 'container entity-admin-dashboard'}
    >
      <div className='page-title'>
        {isOrg
          ? t('dashboard.entityAdmin.entityAdminAccess')
          : t('dashboard.entityAdmin.pageTitle')}
      </div>
      <div className='dashboard-details'>
        {isOrg ? t('dashboard.entityAdmin.manageTxt1') : t('dashboard.entityAdmin.manageTxt')}
      </div>
      <Row className='dashboard-options'>
        <Col sm={isOrg ? 12 : 5} className='padding-25 margin-auto'>
          {entities.length &&
            entities.map((entity, index) => {
              return (
                <div className='button-box' key={index}>
                  <DashedButton
                    className={entity.completed_step === 4 ? 'small-btn' : 'small-btn red-btn'}
                    title={entity.name}
                    onButtonClick={() => navigate(getRoute(entity))}
                  />
                </div>
              );
            })}
        </Col>
      </Row>
    </div>
  );
};

EntitiesDashboard.propTypes = {
  organizationEntityList: PropTypes.func,
  entities: PropTypes.array,
  currentEntity: PropTypes.object,
  isOrg: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    entities: state.Organization.entities,
    currentEntity: state.Entity.currentEntity,
  };
};

const mapDispatchToProps = (dispatch) => ({
  organizationEntityList: bindActionCreators(organizationEntityList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesDashboard);
