import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router';
import {Outlet} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Loader from '../../../../components/Loader';
import {getUnitById} from '../../../../store/Entity/AddUnit/AddUnitAction';

const UnitSetup = ({unitDetails}) => {
  const [spinner, setSpinner] = useState({unitLoading: false});
  const {unitId} = useParams();
  useEffect(() => {
    setSpinner({unitLoading: true});
    unitDetails({unitId}, () => setSpinner({unitLoading: false}));
  }, []);
  return spinner.unitLoading ? (
    <Loader />
  ) : (
    <div className='unit-setup'>
      <Outlet />
    </div>
  );
};

UnitSetup.propTypes = {
  unitDetails: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  unitDetails: bindActionCreators(getUnitById, dispatch),
});

export default connect(null, mapDispatchToProps)(UnitSetup);
