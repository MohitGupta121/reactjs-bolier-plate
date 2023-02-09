import PropTypes from 'prop-types';
import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router';
import {Navigate} from 'react-router-dom';
import DashedButton from '../../../../components/DashedButton';
import '../../../../translation';
import './dashboard.scss';

const Dashboard = ({currentOrganization, organization}) => {
  const {t} = useTranslation();
  const ORGANIZATION_ADMIN_CONFIG = {
    name: t('dashboard.organizationAdmin.name'),
    details: t('dashboard.organizationAdmin.details'),
    style: 'organization-dashboard',
    data: [
      {
        id: 0,
        title: t('dashboard.organizationAdmin.title'),
        link: '/manage-program/entity-list',
        colspan: 12,
      },
      {
        id: 1,
        title: t('dashboard.analyticsDashboard.title'),
        colspan: 12,
        link: 'analytics-dashboard',
      },
    ],
  };
  if (currentOrganization?.id) {
    ORGANIZATION_ADMIN_CONFIG.name.replaceAll('[Organization name]', currentOrganization.name);
  }
  const navigate = useNavigate();

  return currentOrganization?.id ? (
    <div className='container organization-admin-dashboard'>
      <Row>
        <Col sm={12} lg={6} className={'margin-auto'}>
          <div>
            <div className='page-title'>
              {ORGANIZATION_ADMIN_CONFIG.name.replaceAll(
                '[Organization name]',
                currentOrganization?.name
              )}
            </div>
            {ORGANIZATION_ADMIN_CONFIG.details ? (
              <div className='dashboard-details'>{ORGANIZATION_ADMIN_CONFIG.details}</div>
            ) : null}
            <Row className='dashboard-options'>
              {ORGANIZATION_ADMIN_CONFIG.data.map((button) => {
                return (
                  <Col lg={button.colspan} key={button.id} sm={12} className='padding-50'>
                    <div className='button-box'>
                      <DashedButton
                        title={button.title?.replaceAll(
                          '[Organization name]',
                          currentOrganization.name
                        )}
                        className='dashed-btn'
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
        </Col>
      </Row>
      {organization?.organization?.length > 1 ? (
        <div className='waste-not-link' onClick={() => navigate('/dashboard')}>
          &lt; {t('dashboard.backToDashboard')}
        </div>
      ) : (
        ''
      )}
    </div>
  ) : (
    <Navigate to={'/dashboard'} />
  );
};

Dashboard.propTypes = {
  currentOrganization: PropTypes.object,
  organization: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    currentOrganization: state.Organization.currentOrganization,
    organization: state.Organization,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
