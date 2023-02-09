import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router';
import {Outlet} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Loader from '../../../components/Loader';
import {getEntityById} from '../../../store/Entity/EntityAction';
import {unitDetailsById} from '../../../store/UnitUser/UnitUserAction';
import '../../../translation';
import Auth from '../../../utils/Auth';
import {USER_TYPES} from '../../../utils/Enum';
import './setup.scss';

const Setup = ({entityDetails, unitDetailsById}) => {
  const [spinner, setSpinner] = useState({entityLoading: false, unitLoading: false});
  const {entityId} = useParams();

  useEffect(() => {
    if (entityId) {
      if (Auth.getRoles().includes(USER_TYPES.USER)) {
        setSpinner({unitLoading: true});
        unitDetailsById({id: entityId}, () => setSpinner({unitLoading: false}));
      } else {
        setSpinner({entityLoading: true});
        entityDetails({id: entityId}, () => setSpinner({entityLoading: false}));
      }
    }
  }, []);
  return spinner.entityLoading || spinner.unitLoading ? (
    <Loader />
  ) : (
    <div className='entity-setup'>
      <Outlet />
    </div>
  );
};

Setup.propTypes = {
  entityDetails: PropTypes.func,
  unitDetailsById: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  entityDetails: bindActionCreators(getEntityById, dispatch),
  unitDetailsById: bindActionCreators(unitDetailsById, dispatch),
});

export default connect(null, mapDispatchToProps)(Setup);
