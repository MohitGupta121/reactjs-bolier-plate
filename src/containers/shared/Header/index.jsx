import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router';
import {bindActionCreators} from 'redux';
import Loader from '../../../components/Loader';
import ModalComponent from '../../../components/Modal/index';
import {
  acceptInvite,
  logout,
  setShowPendingInviteDialog,
} from '../../../store/shared/User/UserAction';
import '../../../translation';
import Auth from '../../../utils/Auth';
import {USER_TYPES} from '../../../utils/Enum';
import PendingInviteDialog from '../../shared/PendingInviteDialog';
import './header.scss';

const Header = ({
  logout,
  isLoggedOut,
  showPendingInviteDialog,
  setShowPendingInviteDialog,
  pendingOrganizationList,
  pendingEntityList,
  pendingUserList,
  acceptInvite,
}) => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const userRoles = Auth.getRoles();
  useEffect(() => {
    if (isLoggedOut) {
      handleLogoutSuccess();
      setShowPendingInviteDialog(false);
    }
  }, [isLoggedOut]);
  useEffect(() => {
    if (
      (Auth.isAuth() &&
        userRoles.includes(USER_TYPES.ORGANIZATION_ADMIN) &&
        pendingOrganizationList?.length) ||
      (userRoles.includes(USER_TYPES.ENTITY) && pendingEntityList?.length) ||
      (userRoles.includes(USER_TYPES.USER) && pendingUserList?.length)
    ) {
      setShowPendingInviteDialog(true);
    }
  }, [pendingOrganizationList?.length, pendingEntityList?.length, pendingUserList?.length]);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [spinner, setSpinner] = useState({logout: false, acceptInvite: false});
  let menuOption = [
    {title: t('header.menu.help'), link: '/help'},
    {title: t('header.menu.myDashboard'), link: '/dashboard'},
    {title: t('header.menu.myAccount'), link: '/my-account'},
    {title: t('header.menu.logout'), link: '/logout'},
  ];
  if (!Auth.isAuth()) {
    menuOption = [{title: 'Help', link: '/help'}];
  }

  const handleDisplay = () => {
    setMenuDisplay(!menuDisplay);
  };

  const navigateToLink = (link) => {
    if (link.includes('logout')) {
      setSpinner({logout: true});
      logout(
        '',
        () => {
          setSpinner({logout: false});
        },
        handleLogoutSuccess
      );
    } else {
      navigate(link);
      setMenuDisplay(false);
    }
  };

  const hidePendingInviteModal = () => {
    setShowPendingInviteDialog(false);
  };

  const acceptPendingInvite = () => {
    setSpinner({acceptInvite: true});
    acceptInvite(
      '',
      () => {
        setSpinner({acceptInvite: false});
      },
      () => {}
    );
  };

  const handleLogoutSuccess = () => {
    navigate('/login');
    setMenuDisplay(false);
  };

  return (
    <div className='header'>
      {spinner.logout ? <Loader className='overlay' /> : ''}
      <div className='title'>Waste Not 2.0</div>
      <Row className='menu mx-0'>
        <Col sm={6} xs={6}>
          <img
            onClick={() => navigate('/')}
            className='logo-img'
            alt='waste-not-2.0-logo'
            src={require('../../../assets/images/waste-not-logo.png')}
          />
        </Col>
        <Col className='d-flex justify-content-end' sm={6} xs={6}>
          <div id='hamburger-menu' style={{display: menuDisplay ? 'flex' : 'none'}}>
            <ul className='nav-link'>
              {menuOption.map((menu, index) => {
                return (
                  <li className='nav-items' key={index}>
                    <a
                      className={`nav-item${spinner.logout ? ' disable' : ''}`}
                      onClick={() => navigateToLink(menu.link)}
                    >
                      {menu.title}
                    </a>
                  </li>
                );
              })}
            </ul>
            <i className='icon-circle-cross cross-icon' onClick={handleDisplay}></i>
          </div>
          <div className='hamsburger-menu' style={{display: !menuDisplay ? 'flex' : 'none'}}>
            <i className='icon-hamsburger' onClick={handleDisplay}></i>
          </div>
        </Col>
      </Row>
      {showPendingInviteDialog && (
        <ModalComponent
          modalShow={showPendingInviteDialog}
          hideModal={() => hidePendingInviteModal()}
          dialogClassName={'modal-650w'}
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <PendingInviteDialog
            onSubmit={() => acceptPendingInvite()}
            pendingOrganizationList={pendingOrganizationList}
            pendingEntityList={pendingEntityList}
            pendingUserList={pendingUserList}
            isLoading={spinner.acceptInvite}
          ></PendingInviteDialog>
        </ModalComponent>
      )}
    </div>
  );
};

Header.propTypes = {
  logout: PropTypes.func,
  setShowPendingInviteDialog: PropTypes.func,
  showPendingInviteDialog: PropTypes.bool,
  isLoggedOut: PropTypes.bool,
  pendingOrganizationList: PropTypes.array,
  pendingEntityList: PropTypes.array,
  pendingUserList: PropTypes.array,
  acceptInvite: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isLoggedOut: state.User.isLoggedOut,
    showPendingInviteDialog: state.User.showPendingInviteDialog,
    pendingOrganizationList: state.Organization.pendingOrganizationList,
    pendingEntityList: state.Organization.pendingEntityList,
    pendingUserList: state.UnitUser.pendingUserList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: bindActionCreators(logout, dispatch),
  acceptInvite: bindActionCreators(acceptInvite, dispatch),
  setShowPendingInviteDialog: bindActionCreators(setShowPendingInviteDialog, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
