import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import {INPUT_TYPES} from '../constants/Input.constant';
import Input from '../Input';
import './single-select.scss';

const SingleSelect = ({
  icon,
  onClick,
  value,
  error,
  options,
  touched,
  readOnly,
  showIcon,
  handleBlur,
  setShowIcon,
  placeholder,
  handleChange,
  onInputChange,
  setFieldValue,
  setShowOptions,
}) => {
  const ulRef = useRef();
  const searchInputRef = useRef();

  useEffect(() => {
    searchInputRef?.current?.addEventListener('click', (event) => {
      if (ulRef.current) {
        ulRef.current.style.display = 'block';
      }
      onClick();
      onInputChange(event);
      event.stopPropagation();
    });

    document.addEventListener('click', () => {
      if (ulRef.current) {
        ulRef.current.style.display = 'none';
      }
    });
  }, []);

  const selectValue = (index) => {
    setFieldValue('name', options[index].name);
    setShowOptions(true);
    setShowIcon(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && value) {
      event.preventDefault();
      setShowOptions(true);
      setShowIcon(true);
    }
  };

  return (
    <div className={`single-select ${showIcon ? 'p-10' : ''}`}>
      <Input
        type={INPUT_TYPES.search}
        readOnly={readOnly}
        className={`${icon && !readOnly && !showIcon ? 'add-category' : ''}`}
        icon={!readOnly && icon && !showIcon ? icon : null}
        name='name'
        placeholder={placeholder}
        inputRef={searchInputRef}
        inputClass={touched && error ? 'is-invalid' : ''}
        onChange={(e) => {
          handleChange(e);
          onInputChange(e);
        }}
        error={touched && error}
        onBlur={handleBlur}
        value={value}
        onKeyDown={handleKeyDown}
      />
      <ul className='dropdown-list' ref={ulRef}>
        {options.length > 0 && !readOnly && (
          <>
            <li className='options-list small-text'>
              Use any name or select from these commonly used Categories:
            </li>
            {options?.map((option, index) => {
              return (
                <li
                  className='options-list'
                  key={`${option.name}-${index}`}
                  onClick={() => selectValue(index)}
                >
                  {option.name}
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};

SingleSelect.propTypes = {
  error: PropTypes.any,
  icon: PropTypes.string,
  value: PropTypes.any,
  id: PropTypes.string,
  touched: PropTypes.any,
  label: PropTypes.string,
  onClick: PropTypes.func,
  readOnly: PropTypes.bool,
  options: PropTypes.array,
  showIcon: PropTypes.bool,
  variant: PropTypes.string,
  handleBlur: PropTypes.func,
  setShowIcon: PropTypes.func,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  setShowOptions: PropTypes.func,
};

export default SingleSelect;
