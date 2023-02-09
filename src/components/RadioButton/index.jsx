import PropTypes from 'prop-types';
import React from 'react';
import {Form} from 'react-bootstrap';
import './RadioButton.scss';

const RadioButton = ({id, label, value, selected, onChange, onBlur}) => {
  return (
    <Form.Check type='radio' id={id}>
      <Form.Check.Input
        type='radio'
        value={value}
        checked={selected}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
      />
      <Form.Check.Label>{label}</Form.Check.Label>
    </Form.Check>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

RadioButton.defaultProps = {
  id: 'radio',
  value: 'value',
  label: 'Radio',
  selected: false,
  onChange: (e) => e,
  onBlur: (e) => e,
};

export default RadioButton;
