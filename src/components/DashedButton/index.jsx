import PropTypes from 'prop-types';
import React from 'react';
import {Button} from 'react-bootstrap';
import './style.scss';

const DashedButton = ({title, subtitle, className, alertMsg, hoverText, onButtonClick}) => {
  const [showHoverText, setHover] = React.useState(false);

  const handleMouseEnter = () => {
    if (hoverText) {
      setHover(true);
    }
  };

  const titleSection = (
    <>
      <div className='title-text'>{title}</div>
      {subtitle ? <div className='subtitle-text'>{subtitle}</div> : null}

      {alertMsg ? <div className='alert-msg'>{alertMsg}</div> : null}
    </>
  );

  const onHoverText = hoverText ? <div className='hover-text'>{hoverText}</div> : null;

  return (
    <Button
      className={`dashed-button ${className}`}
      variant='outline-dark'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHover(false)}
      onClick={() => onButtonClick()}
    >
      {showHoverText ? onHoverText : titleSection}
    </Button>
  );
};

DashedButton.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  alertMsg: PropTypes.string,
  hoverText: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

DashedButton.defaultProps = {
  title: '',
  subtitle: '',
  alertMsg: '',
  hoverText: '',
  className: '',
  onButtonClick: (event) => event,
};

export default DashedButton;
