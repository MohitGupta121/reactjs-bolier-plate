import React from 'react';
import totalWasteIcon from '../../../assets/images/wn-1.jpeg';
import waterFootprintIcon from '../../../assets/images/wn-2.jpeg';
import carbonFootprintIcon from '../../../assets/images/wn-3.jpeg';

import './chart-dashboard.scss';
import { Row, Col } from 'react-bootstrap';
import Piechart from './Piechart';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Dropdown from '../../../components/Dropdown';
import { INPUT_TYPES, BUTTON_TYPES } from '../../../components/constants';
import FunnelChart from './FunnelChart';

const Dashboard = () => {
  const categoryFilters = [
    {
      name: 'ONE',
    },
    {
      name: 'TWO',
    },
    {
      name: 'THREE',
    },
    {
      name: 'FOUR',
    },
  ];

  const titlesFilter = [
    {
      name: '[UNIT]',
    },
    {
      name: 'KITCHEN',
    },
    {
      name: 'PROFILE',
    },
    {
      name: 'TABLET',
    },
  ];

  const dropdownOptions = [
    { value: 'selected', label: 'Select a [Category Name]' },
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'three', label: 'three' },
    { value: 'four', label: 'four' },
    { value: 'five', label: 'five' },
  ];

  const kindOfWaste = [
    {
      name: 'Catering Leftovers',
      percent: 80,
      value: 717,
      color: '#02AF50',
    },
    {
      name: 'Overproduction',
      percent: 8,
      value: 72,
    },
    {
      name: 'Whoops',
      percent: 4,
      value: 36,
    },
    {
      name: 'Trim, Bones, Shells',
      percent: 3,
      value: 27,
    },
    {
      name: 'Plaste Waste',
      percent: 2,
      value: 18,
    },
    {
      name: 'Poor Quality',
      percent: 2,
      value: 18,
    },
    {
      name: 'Odd and Ends',
      percent: 1,
      value: 9,
    },
  ];

  const wasteData = [
    {
      icon: totalWasteIcon,
      label: 'Total waste',
      large: '566 pounds of waste',
      small: '25 five gallon buckets',
    },
    {
      icon: waterFootprintIcon,
      label: 'water footprint',
      large: '50,314 gallons',
      small: '3049.3 showers',
    },
    {
      icon: carbonFootprintIcon,
      label: 'Carbon footprint',
      large: '1.1 tons of CO2 eq',
      small: '1263.7 pounds of coal burned',
    },
  ];

  return (
    <>
      <div className='categories-section'>
        <div className='page-title'>{'[Organization name]'}</div>
        <Row className='category-row-one'>
          {categoryFilters &&
            categoryFilters.map((filter) => {
              return (
                <Col key={filter.name} sm={3}>
                  <Dropdown
                    className='category-dropdown'
                    options={dropdownOptions}
                    label={`[CATEGORY ${filter.name}]`}
                  />
                </Col>
              );
            })}
        </Row>
        <hr className='category-seperator' />
        <div className='filter-plus-button'>
          <Row className='category-row-two'>
            {titlesFilter &&
              titlesFilter.map((filter) => {
                return (
                  <Col key={filter.name} sm={3}>
                    <Dropdown
                      className='category-dropdown'
                      options={dropdownOptions}
                      label={filter.name}
                    />
                  </Col>
                );
              })}
          </Row>
          <Button
            className='clear-btn'
            title='clear'
            variant={BUTTON_TYPES.outlineDark}
          />
        </div>
      </div>

      <hr className='hr-line' />

      <div className='daterange-and-button'>
        <Row>
          <Col sm={7} className='p-0'>
            <div className='datepicker'>
              <div className='daterange'>DATE RANGE:</div>
              <Input className='starting-date' inputType={INPUT_TYPES.date} />
              <span>to</span>
              <Input className='end-date' inputType={INPUT_TYPES.date} />
              <Button
                className='clear-date'
                variant={BUTTON_TYPES.outlineDark}
                title='clear date selection'
              />
            </div>
          </Col>
          <Col sm={5} className='track-btns'>
            <span>
              <Button
                className='track-trend'
                variant={BUTTON_TYPES.outlineDark}
                title='Track trends'
              />
              <Button
                className='line-items'
                variant={BUTTON_TYPES.outlineDark}
                title='line item entries'
              />
            </span>
          </Col>
        </Row>
      </div>

      <div className='charts-section'>
        <Row>
          <Col sm={2} className='p-0'>
            <div className='page-title waste-impact'>Waste impact</div>
            <div className='waste-impact'>
              {wasteData &&
                wasteData.map((data) => {
                  return (
                    <div key={data.label} className='total-waste'>
                      <img src={data.icon} />
                      <span className='waste-details'>
                        <span className='label'>{data.label}</span>
                        <div className='large'>{data.large}</div>
                        <div className='small'>{data.small}</div>
                      </span>
                    </div>
                  );
                })}

              <div className='foot-note'>
                <i className='bi bi-info-circle'></i>
                <span>These calculations are based on data from the</span>
                <br />
                <a href='#' target='_blank'>
                  ReFED Impact Calculator
                </a>
              </div>
            </div>
          </Col>
          <Col sm={5} className='p-0'>
            <div className='kind-of-waste'>
              <div className='page-title'>kind of waste</div>
              <div className='bordered-content'>
                <div className='chart-table'>
                  <ul>
                    {kindOfWaste &&
                      kindOfWaste.map((waste) => {
                        return (
                          <li key={waste.name}>
                            <span className='first'>{waste.name}</span>
                            <span className='second'>{waste.percent}%</span>
                            <span className='slace'> | </span>
                            <span className='third'>{waste.value}</span>
                            <span className='block-labs'>lbs</span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div>
                  <Piechart />
                </div>
              </div>
            </div>
          </Col>
          <Col sm={5}>
            <div className='where-it-went'>
              <div className='page-title'>where it went</div>
              <FunnelChart />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
