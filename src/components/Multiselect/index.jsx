import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-bootstrap';
import Checkbox from '../Checkbox';
import {ICONS} from '../constants/Icons.constant';
import {INPUT_TYPES} from '../constants/Input.constant';
import Input from '../Input';
import {debounce} from 'lodash';
import './Multiselect.scss';

const Multiselect = ({options, variant, placeholder, getSearchList}) => {
  const selectedList = options
    .filter((item) => item.selected)
    .map((item) => item.name)
    .join(',');
  const [filters, setFilters] = useState(selectedList);
  const [searchList, setSearchList] = useState();
  const [searchText, setSearchText] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setSearchList(options);
  }, [options]);

  const handleChangeWithLib = debounce((e) => {
    getSearchList({
      keyword: e.target.value,
    });
  }, 1000);

  const toggleCheckbox = (index) => {
    const list = [...searchList];
    list[index].selected = !list[index].selected;
    setSearchList(list);
  };

  const applyFilters = () => {
    const selectedList = searchList
      .filter((item) => item.selected)
      .map((item) => item.name)
      .join(',');
    setFilters(selectedList);
  };

  return (
    <Dropdown autoClose={true}>
      <Dropdown.Toggle variant={variant} id='dropdown-basic'>
        {filters || placeholder}
      </Dropdown.Toggle>
      <Dropdown.Menu show={show}>
        <Input
          type={INPUT_TYPES.search}
          className='search-input'
          placeholder={'Search'}
          label=''
          icon={ICONS.search}
          onChange={handleChangeWithLib}
        />
        <ul className='dropdown-list'>
          {searchList?.map((option, index) => {
            return (
              <li key={`dropdown_${option.label}-${index}`}>
                <Checkbox
                  label={option.name}
                  id={option.id.toString()}
                  selected={option.selected}
                  onChange={() => toggleCheckbox(index)}
                />
              </li>
            );
          })}
        </ul>
        <hr />
        <div className='apply-filters'>
          <a
            className='filter'
            onClick={() => {
              setShow(false);
              setSearchList([]);
              setSearchText('');
            }}
          >
            Cancel
          </a>
          <a className='filter' onClick={() => applyFilters()}>
            Apply
          </a>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

Multiselect.propTypes = {
  id: PropTypes.string,
  options: PropTypes.any,
  label: PropTypes.string,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  getSearchList: PropTypes.func,
};

Multiselect.defaultProps = {
  options: [],
  id: 'Dropdown',
  label: 'Dropdown',
  variant: 'primary',
  placeholder: 'Select All',
};

export default Multiselect;
