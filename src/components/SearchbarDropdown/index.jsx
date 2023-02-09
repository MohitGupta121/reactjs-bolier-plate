import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import {INPUT_TYPES} from '../constants';
import Input from '../Input';
import './searchDropdown.scss';

const SearchbarDropdown = ({
  options,
  onInputChange,
  placeholder,
  handleChange,
  handleBlur,
  value,
  name,
  touched,
  setFieldValue,
  setDetails,
  error,
  noIcon,
}) => {
  const ulRef = useRef();
  const searchInputRef = useRef();

  useEffect(() => {
    searchInputRef?.current?.addEventListener('click', (event) => {
      event.stopPropagation();
      if (ulRef.current) {
        ulRef.current.style.display = 'block';
      }
      onInputChange(event);
    });
    document.addEventListener('click', () => {
      if (ulRef.current) {
        ulRef.current.style.display = 'none';
      }
    });
  }, []);

  const submitHandler = (option) => {
    setFieldValue(name, option.name);
    if (setDetails) {
      setDetails((prev) => {
        return {...prev, [name]: option.id};
      });
    }
  };

  return (
    <div className='search-bar-dropdown'>
      <Input
        type={INPUT_TYPES.text}
        placeholder={placeholder}
        inputRef={searchInputRef}
        onChange={(e) => {
          handleChange(e);
          onInputChange(e);
        }}
        inputClass={touched && error && !noIcon ? 'is-invalid' : ''}
        error={touched && error}
        onBlur={handleBlur}
        value={value}
        name={name}
      />
      <ul id='results' className='dropdown-list' ref={ulRef}>
        {options.map((option, index) => {
          return (
            <li
              key={index}
              onClick={() => submitHandler(option)}
              className='list-items'
            >
              {option.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

SearchbarDropdown.propTypes = {
  error: PropTypes.any,
  name: PropTypes.string,
  value: PropTypes.any,
  touched: PropTypes.any,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  options: PropTypes.any,
  onInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  setFieldValue: PropTypes.func,
  setDetails: PropTypes.func,
  noIcon: PropTypes.bool,
};

export default SearchbarDropdown;
