import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router';
import {bindActionCreators} from 'redux';
import DashedButton from '../../../components/DashedButton';
import Loader from '../../../components/Loader';
import {containersList} from '../../../store/shared/Container/ContainerAction';
import '../../../translation';
import './dashboard.scss';

const Dashboard = ({containersList, containers}) => {
  const {t} = useTranslation();
  const [spinner, setSpinner] = useState({containerLoading: false});
  useEffect(() => {
    containersList({unit: 1}, () => setSpinner({containerLoading: false}));
  }, []);
  const pendingContainer = containers?.filter((c) => c.status === 2);
  const GLOBAL_ADMIN_CONFIG = {
    name: t('dashboard.globalAdmin.title'),
    data: [
      {
        id: 0,
        title: t('dashboard.manageProgram.title'),
        hoverText: t('dashboard.manageProgram.hoverText'),
        link: '/manage-program/organization/list-users',
        colspan: 6,
      },
      {
        id: 1,
        title: t('dashboard.containerLibrary.title'),
        alertMsg: t('dashboard.containerLibrary.alertMsg').replace(
          '{{count}}',
          pendingContainer?.length
        ),
        link: '/containers',
        colspan: 6,
      },
      {
        id: 2,
        title: t('dashboard.globalUsers.title'),
        subtitle: t('dashboard.globalUsers.subtitle'),
        link: '/global-users',
        colspan: 6,
      },
      {
        id: 3,
        title: t('dashboard.analyticsDashboard.title'),
        subtitle: t('dashboard.analyticsDashboard.subtitle'),
        link: '/analytics-dashboard',
        colspan: 6,
      },
    ],
  };
  const navigate = useNavigate();
  return spinner.containerLoading ? (
    <Loader />
  ) : (
    <div className='container global-admin-dashboard'>
      <div className='page-title'>{GLOBAL_ADMIN_CONFIG.name}</div>
      {GLOBAL_ADMIN_CONFIG.details ? (
        <div className='dashboard-details'>{GLOBAL_ADMIN_CONFIG.details}</div>
      ) : null}
      <Row className='dashboard-options'>
        {GLOBAL_ADMIN_CONFIG.data.map((button) => {
          return (
            <Col lg={button.colspan} key={button.id} sm={12}>
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
  containersList: PropTypes.func,
  containers: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    containers: state.Container.containers?.containers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  containersList: bindActionCreators(containersList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
