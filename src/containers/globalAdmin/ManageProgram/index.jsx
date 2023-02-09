import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router';
import {Outlet} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Input from '../../../components/Input';
import Loader from '../../../components/Loader';
import {organizationList, selectOrganization} from '../../../store/Organization/OrganizationAction';
import '../../../translation';
import Auth from '../../../utils/Auth';
import {USER_TYPES} from '../../../utils/Enum';
import {ICONS, INPUT_TYPES} from '.././../../components/constants';
import AddOrganization from './AddOrganization';
import './manage-program.scss';

const ManageProgram = ({
  organizationList,
  organization,
  selectOrganization,
  currentOrganization,
}) => {
  const [spinner, setSpinner] = useState({listLoading: false});
  const {t} = useTranslation();
  const navigate = useNavigate();
  const showBackLink =
    (Auth.getRoles().includes(USER_TYPES.GLOBAL_ADMIN) ||
      Auth.getRoles().includes(USER_TYPES.SUPER_ADMIN)) &&
    window.location.href.includes('entity-list') &&
    currentOrganization?.id !== 'add-organization';
  const pageTitle = Auth.getRoles().includes(USER_TYPES.ORGANIZATION_ADMIN)
    ? t('manageOrganization.title')
    : t('manageProgram.title');

  const navigateToAddOrganization = () => {
    selectOrganization('add-organization');
  };
  const navigateToOrganization = (id) => {
    selectOrganization(id);
  };

  useEffect(() => {
    setSpinner({listLoading: true});
    organizationList('', () => setSpinner({listLoading: false}));
  }, []);

  return !spinner.listLoading ? (
    <div className='manage-program'>
      <div className='page-title'>{pageTitle}</div>
      <div className='search-org'>
        <Input
          id={'search-org'}
          icon={ICONS.search}
          placeholder={t('manageProgram.searchPlaceHolder')}
          inputType={INPUT_TYPES.text}
        />
      </div>
      <Row className='tabled-section'>
        <Col sm={3} className='p-0 list-sidebar'>
          <ul className='organization-lists'>
            {organization?.organization.map((org) => {
              return (
                <li
                  className={'org-list ' + (currentOrganization?.id == org.id ? 'selected' : '')}
                  key={'org' + org.id}
                  onClick={() => navigateToOrganization(org.id)}
                >
                  <div className='org-name'>
                    <span className='org-intitals'>{org.name?.substring(1, 0)}</span>
                    <span className='org-name'>{org.name}</span>
                  </div>
                  {currentOrganization?.id == org.id ? (
                    <i className='arrow-right icon-navigate' />
                  ) : (
                    ''
                  )}
                </li>
              );
            })}
          </ul>
          {Auth.getRoles().includes(USER_TYPES.GLOBAL_ADMIN) ||
          Auth.getRoles().includes(USER_TYPES.SUPER_ADMIN) ? (
            <ul className='organization-lists h-auto'>
              <li
                className={
                  'org-list add-new ' +
                  (currentOrganization?.id === 'add-organization' ? 'selected' : '')
                }
                onClick={() => navigateToAddOrganization()}
              >
                <div className='org-name add-org'>
                  <span className='icon-plus'></span>
                  <span className='add-org-txt'>{t('manageProgram.addNewOrganizationTitle')}</span>
                </div>
                {currentOrganization?.id === 'add-organization' ? (
                  <i className='arrow-right icon-navigate' />
                ) : (
                  ''
                )}
              </li>
            </ul>
          ) : (
            ''
          )}
        </Col>
        <Col sm={9} className='list'>
          {currentOrganization?.id === 'add-organization' ? <AddOrganization /> : <Outlet />}
        </Col>
        <Col sm={3}></Col>
        <Col sm={9}>
          <div className={'exit-link ' + (!showBackLink ? 'flex-end' : '')}>
            {showBackLink ? (
              <a
                className='waste-not-link'
                onClick={() => navigate('/manage-program/organization/list-users')}
              >
                &lt; {t('manageProgram.backLink')} {currentOrganization.name}
              </a>
            ) : (
              ''
            )}
            <a className='waste-not-link' onClick={() => navigate('/dashboard')}>
              {t('manageProgram.saveAndExit')}
            </a>
          </div>
        </Col>
      </Row>
    </div>
  ) : (
    <Loader />
  );
};

ManageProgram.propTypes = {
  organizationList: PropTypes.func,
  organization: PropTypes.any,
  loader: PropTypes.object,
  selectOrganization: PropTypes.func,
  currentOrganization: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    organization: state.Organization,
    loader: state.Loader,
    currentOrganization: state.Organization.currentOrganization,
  };
};

const mapDispatchToProps = (dispatch) => ({
  organizationList: bindActionCreators(organizationList, dispatch),
  selectOrganization: bindActionCreators(selectOrganization, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProgram);
