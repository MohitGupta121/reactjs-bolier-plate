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
import {organizationList, selectOrganization} from '../../../store/Organization/OrganizationAction';
import '../../../translation';
import Auth from '../../../utils/Auth';
import {USER_TYPES} from '../../../utils/Enum';
import {default as EntityDashboard} from '../../entityAdmin/EntitiesDashboard';
import './organizations.scss';

const OrganizationsDashboard = ({organization, organizationList, selectOrganization}) => {
  const {t} = useTranslation();
  const isEntity = Auth.getRoles().includes(USER_TYPES.ENTITY);
  const [spinner, setSpinner] = useState({listLoading: false});
  useEffect(() => {
    setSpinner({listLoading: true});
    organizationList('', () => {
      setSpinner({listLoading: false});
    });
  }, []);

  const navigate = useNavigate();
  return spinner.listLoading ? (
    <Loader />
  ) : !isEntity && organization?.organization?.length === 1 ? (
    <Navigate to={`/dashboard/${organization?.organization[0].id}`} />
  ) : (
    <div className='container organization-admin-dashboard'>
      <div className='page-title'>{t('dashboard.organizationAdmin.pageTitle')}</div>
      <Row>
        {organization?.organization.length ? (
          <Col sm={6} className='padding-25 margin-auto'>
            <div className='page-title'>
              {t('dashboard.organizationAdmin.organizationAdminAccess')}
            </div>
            <div className='dashboard-details'>{t('dashboard.organizationAdmin.manageTxt')}</div>
            {organization?.organization.map((org, index) => {
              return (
                <div className='button-box' key={index}>
                  <DashedButton
                    className='small-btn'
                    title={org.name}
                    onButtonClick={() => {
                      navigate(`/dashboard/${org.id}`);
                      selectOrganization(org.id);
                    }}
                  />
                </div>
              );
            })}
          </Col>
        ) : (
          ''
        )}

        {isEntity ? (
          <Col
            sm={12}
            lg={6}
            className={
              organization?.organization?.length
                ? 'padding-25 margin-auto border-left'
                : 'padding-25 margin-auto'
            }
          >
            <EntityDashboard isOrg={true} />
          </Col>
        ) : (
          ''
        )}
      </Row>
    </div>
  );
};

OrganizationsDashboard.propTypes = {
  organizationList: PropTypes.func,
  organization: PropTypes.any,
  selectOrganization: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    organization: state.Organization,
  };
};

const mapDispatchToProps = (dispatch) => ({
  organizationList: bindActionCreators(organizationList, dispatch),
  selectOrganization: bindActionCreators(selectOrganization, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsDashboard);
