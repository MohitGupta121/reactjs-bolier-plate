import PropTypes from 'prop-types';
import React from 'react';
import {Form} from 'react-bootstrap';
import './Checkbox.scss';

const Checkbox = ({id, label, selected, onChange, name,className}) => {
  return (
    <Form.Check type='checkbox' id={id} className={className}>
      <Form.Check.Input
        type='checkbox'
        checked={selected}
        onChange={() => onChange()}
        name={name}
      />
    {label ? <Form.Check.Label>{label}</Form.Check.Label> : null}
    </Form.Check>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
};

Checkbox.defaultProps = {
  id: 'checkbox',
  selected: false,
  onChange: (e) => e,
  name: 'checkbox',
};

export default Checkbox;
