import PropTypes from 'prop-types';
import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router';
import DashedButton from '../../../components/DashedButton';
import '../../../translation';
import './dashboard.scss';

const Dashboard = () => {
  const {t} = useTranslation();
  const PROGRAM_ADMIN_CONFIG = {
    name: t('dashboard.programAdmin.name'),
    details: t('dashboard.programAdmin.details'),
    style: 'program-dashboard',
    data: [
      {
        id: 0,
        title: t('dashboard.programAdmin.title'),
        alertMsg: t('dashboard.programAdmin.alertMsg'),
        link: '/manage-program/organization/list-users',
        colspan: 6,
      },
      {
        id: 1,
        title: t('dashboard.programAdmin.manageContainer'),
        link: 'containers',
        colspan: 6,
      },
      {
        id: 2,
        title: t('dashboard.analyticsDashboard.title'),
        link: 'analytics-dashboard',
        colspan: 6,
      },
    ],
  };
  const navigate = useNavigate();
  return (
    <div className='container program-admin-dashboard'>
      <div className='page-title'>{PROGRAM_ADMIN_CONFIG.name}</div>
      {PROGRAM_ADMIN_CONFIG.details ? (
        <div className='dashboard-details'>{PROGRAM_ADMIN_CONFIG.details}</div>
      ) : null}
      <Row className='dashboard-options'>
        {PROGRAM_ADMIN_CONFIG.data.map((button) => {
          return (
            <Col lg={button.colspan} key={button.id} sm={12} className='padding-50 margin-auto'>
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
