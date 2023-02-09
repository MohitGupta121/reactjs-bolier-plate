import PropTypes from 'prop-types';
import React from 'react';
import {Spinner} from 'react-bootstrap';
import {LOADER_TYPES} from '../constants';
import './Loader.scss';

const Loader = ({variant, className}) => {
  return (
    <div className={`${className} loader`}>
      <Spinner animation='border' variant={variant}>
        <span className='visually-hidden'> Loading...</span>
      </Spinner>
    </div>
  );
};

Loader.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
};

Loader.defaultProps = {
  variant: LOADER_TYPES.dark,
};

export default Loader;
