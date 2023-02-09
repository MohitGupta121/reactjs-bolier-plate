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
import {unitUserList} from '../../../store/UnitUser/UnitUserAction';
import '../../../translation';
import './users-dashboard.scss';

const Users = ({users, unitUserList, locationLabel}) => {
  const {t} = useTranslation();
  const [spinner, setSpinner] = useState({
    unitLoading: false,
  });
  let description = t('dashboard.user.details');
  useEffect(() => {
    setSpinner({unitLoading: true});
    unitUserList('', () => setSpinner({unitLoading: false}, () => {}));
  }, []);

  if (users?.length) {
    description = t('dashboard.user.details')
      .replaceAll('[Unit]', locationLabel?.singular)
      .replaceAll('[Units]', locationLabel?.plural);
  }

  const getRoute = (unit) => {
    if (unit.completed_step === 1) {
      return `/setup/${unit.id}/introduction`;
    } else if (unit.completed_step === 2) {
      return `/setup/${unit.id}/containers`;
    } else {
      return `/setup/${unit.id}/introduction`;
    }
  };

  const navigate = useNavigate();
  return spinner.unitLoading ? (
    <Loader />
  ) : users?.length === 1 ? (
    <Navigate to={getRoute(users[0])} replace={true} />
  ) : (
    <div className={'container users-dashboard'}>
      <div className='page-title'>{t('dashboard.user.pageTitle')}</div>
      <div className='dashboard-details'>{description}</div>
      <Row className='dashboard-options'>
        <Col sm={6} className='padding-50 margin-auto'>
          {users?.length &&
            users.map((user, index) => {
              return (
                <div className='button-box' key={index}>
                  <DashedButton
                    className={user.completed_step === 4 ? '' : 'red-btn'}
                    title={user.name}
                    onButtonClick={() => navigate(getRoute(user))}
                  />
                </div>
              );
            })}
        </Col>
      </Row>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  unitUserList: PropTypes.func,
  locationLabel: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    users: state.UnitUser?.unitUserList,
    locationLabel: state.UnitUser?.locationLabel,
  };
};

const mapDispatchToProps = (dispatch) => ({
  unitUserList: bindActionCreators(unitUserList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
