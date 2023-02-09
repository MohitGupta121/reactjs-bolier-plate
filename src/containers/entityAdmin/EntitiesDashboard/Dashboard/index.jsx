import PropTypes from 'prop-types';
import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router';
import DashedButton from '../../../../components/DashedButton';
import '../../../../translation';
import './dashboard.scss';

const Dashboard = () => {
  const {t} = useTranslation();
  const ENTITY_ADMIN_CONFIG = {
    name: t('dashboard.entityAdmin.name'),
    details: t('dashboard.entityAdmin.details'),
    style: 'entity-dashboard',
    data: [
      {
        id: 0,
        title: t('dashboard.entityAdmin.title'),
        alertMsg: t('dashboard.entityAdmin.alertMsg'),
        link: '/manage-program/organization/list-users',
        colspan: 6,
      },
      {
        id: 1,
        title: t('dashboard.entityAdmin.manageTags'),
        colspan: 6,
      },
      {
        id: 2,
        title: t('dashboard.entityAdmin.setting'),
        colspan: 6,
      },
      {
        id: 3,
        title: t('dashboard.analyticsDashboard.title'),
        colspan: 6,
      },
    ],
  };
  const navigate = useNavigate();
  return (
    <div className='container entity-admin-dashboard'>
      <div className='page-title'>{ENTITY_ADMIN_CONFIG.name}</div>
      {ENTITY_ADMIN_CONFIG.details ? (
        <div className='dashboard-details'>{ENTITY_ADMIN_CONFIG.details}</div>
      ) : null}
      <Row className='dashboard-options'>
        {ENTITY_ADMIN_CONFIG.data.map((button) => {
          return (
            <Col lg={button.colspan} key={button.id} sm={12} className='padding-50'>
              <div className='button-box'>
                <DashedButton
                  title={button.title}
                  alertMsg={button.alertMsg}
                  subtitle={button.subtitle}
                  hoverText={button.hoverText}
                  onButtonClick={() => navigate(button.link ? button.link : '')}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

Dashboard.propTypes = {
  userRole: PropTypes.any,
  id: PropTypes.any,
};

export default Dashboard;
