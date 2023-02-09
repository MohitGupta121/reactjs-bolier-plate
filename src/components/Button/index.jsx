import PropTypes from 'prop-types';
import React from 'react';
import {Button} from 'react-bootstrap';
import Loader from '../Loader';
import './Button.scss';

const ButtonComponent = ({
  disabled,
  isLoading,
  variant,
  title,
  className,
  onButtonClick,
  type,
  icon,
  id,
  showSpinnerIcon,
}) => {
  return (
    <>
      <Button
        className={`custom-btn ${className}`}
        variant={variant}
        disabled={disabled || isLoading}
        onClick={() => onButtonClick()}
        type={type}
        id={id}
      >
        {icon ? <i className={icon} /> : null}
        {isLoading ? (
          showSpinnerIcon ? (
            <>
              <Loader />
              {title}
            </>
          ) : (
            'Loading...'
          )
        ) : (
          title
        )}
      </Button>
    </>
  );
};

ButtonComponent.propTypes = {
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  icon: PropTypes.string,
  show: PropTypes.bool,
  showSpinnerIcon: PropTypes.bool,
  id: PropTypes.any,
};

ButtonComponent.defaultProps = {
  disabled: false,
  className: '',
  variant: 'primary',
  title: 'Button',
  onButtonClick: (event) => event,
  type: 'button',
  showSpinnerIcon: false,
};

export default ButtonComponent;
