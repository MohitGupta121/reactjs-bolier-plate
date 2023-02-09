import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {useNavigate} from 'react-router';

import Button from '../../../components/Button';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {
  getUnitList,
  searchEntityUnitUsers,
  searchEntityUnits,
} from '../../../store/Entity/AddUnit/AddUnitAction';
import {BUTTON_TYPES, INPUT_TYPES} from '../../../components/constants';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import {useParams} from 'react-router';
import './unit-management.scss';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {ICONS} from '../../../components/constants';
import Multiselect from '../../../components/Multiselect';
import Loader from '../../../components/Loader';

const ManageUnits = ({
  getEntityUnits,
  entity,
  unitList,
  dropdownOptions,
  searchEntityUnits,
  searchEntityUnitUsers,
}) => {
  const [spinner, setSpinner] = useState(false);
  const [userOptions, setUserOptions] = useState();
  const [unitsData, setUnitsData] = useState();
  const {t} = useTranslation();
  const {entityId, unitId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSpinner(true);
    handleFetch({pageSize: 5});
  }, []);

  useEffect(() => {
    setUserOptions(dropdownOptions.users);
    setUnitsData(dropdownOptions.units);
  }, [dropdownOptions]);

  const handleFetch = ({pageSize}) => {
    getEntityUnits(
      {
        entityId: entityId,
        unitData: {
          page: 1,
          page_size: pageSize,
          units: [],
          tags: [],
          users: [],
        },
      },
      () => setSpinner(false)
    );
  };

  const searchUnitUsers = (data) => {
    searchEntityUnitUsers(
      {
        id: entityId,
        data: data,
      },
      () => {}
    );
  };

  const searchUnits = (data) => {
    searchEntityUnits(
      {
        id: entityId,
        data: data,
      },
      () => {}
    );
  };

  const description = t('unitManagement.description').replaceAll(
    '[Unit]',
    entity.locationLabel.singular
  );
  const title = t('unitManagement.title').replaceAll('[Unit]', entity.locationLabel.singular);
  const addBtn = t('unitManagement.addBtn').replaceAll('[Unit]', entity.locationLabel.singular);

  return (
    <div className='unit-management'>
      <div className='entity-name'>{entity.name}</div>
      <div className='page-title'>{title}</div>
      <div className='description'>{description}</div>
      <div className='action-btns'>
        <Button
          title={addBtn}
          variant={BUTTON_TYPES.outlineDark}
          onButtonClick={() => navigate(`/setup/${entityId}/add-unit`)}
        />
        <Button
          title={t('unitManagement.manageBtn')}
          variant={BUTTON_TYPES.outlineDark}
          onButtonClick={() => navigate(`/setup/${entityId}/manage-tags`)}
        />
      </div>
      <Input
        className='search-bar'
        inputType={INPUT_TYPES.text}
        icon={ICONS.search}
        placeholder='Search'
      />
      {spinner ? (
        <Loader />
      ) : (
        <InfiniteScroll
          pageStart={0}
          loadMore={() => handleFetch({pageSize: unitList.units.length + 5})}
          hasMore={unitList.units?.length < unitList.count}
          useWindow={false}
          loader={
            <div key='loading' className='loader'>
              Loading ...
            </div>
          }
        >
          <div className='div_maintb'>
            <table>
              <tbody>
                <tr>
                  <th colSpan={3}>
                    <Checkbox label='select all' />
                  </th>
                  <th>
                    <div>{entity.locationLabel.singular}</div>
                    <Multiselect
                      variant={BUTTON_TYPES.outlineDark}
                      placeholder={`Select ${entity.locationLabel.singular}`}
                      options={unitsData}
                      getSearchList={searchUnits}
                    />
                  </th>
                  {unitList.units[0]?.categories.map((category, index) => {
                    return (
                      <th key={index}>
                        <div>{category.name.toUpperCase()}</div>
                        <Multiselect
                          variant={BUTTON_TYPES.outlineDark}
                          placeholder={`Select ${entity.locationLabel.singular}`}
                          options={dropdownOptions.units}
                          getSearchList={searchUnits}
                        />
                      </th>
                    );
                  })}
                  <th>
                    <div>{`${entity.locationLabel.singular.toUpperCase()} USERS`}</div>
                    <Multiselect
                      variant={BUTTON_TYPES.outlineDark}
                      placeholder={`Select ${entity.locationLabel.singular}`}
                      options={userOptions}
                      getSearchList={searchUnitUsers}
                    />
                  </th>
                </tr>
                {unitList.units.map((unit, index) => {
                  return (
                    <tr key={index}>
                      <td className='fixed'>
                        <Checkbox />
                      </td>
                      <td className='fixed'>
                        <i
                          className='icon-pencil link-icon'
                          onClick={() => navigate(`/setup/${entityId}/unit/${unitId}/update-unit`)}
                        />
                      </td>
                      <td className='fixed'>
                        <i
                          className='icon-chart-line link-icon'
                          onClick={() => navigate('/analytics-dashboard')}
                        />
                      </td>
                      <td className='fixed'>{`${unit.name} ${
                        unit.id_number ? '(' + unit.id_number + ')' : ''
                      }`}</td>
                      {unit?.categories.map((category, index) => {
                        return (
                          <td key={index}>
                            {category.tags.length
                              ? category.tags.map((tag, tagIndex) => {
                                  return (
                                    <div key={tagIndex}>{`${tag.name} ${
                                      tag.display_name ? '(' + tag.display_name + ')' : ''
                                    }`}</div>
                                  );
                                })
                              : '- - -'}
                          </td>
                        );
                      })}
                      <td className='last-column'>
                        {unit.users.length
                          ? unit.users.map((user, index) => {
                              return (
                                <Row key={index} className='mx-0 align-items-center users'>
                                  <Col sm={4} className='pl-0'>
                                    {`${user.first_name || '- - -'} ${user.last_name || '- - -'}`}
                                  </Col>
                                  <Col sm={6} className='px-0'>
                                    {user.email}
                                  </Col>
                                  <Col sm={2} className='action-icons'>
                                    <i className='icon-pencil link-icon' />
                                    <i className='icon-remove-user link-icon' />
                                  </Col>
                                </Row>
                              );
                            })
                          : '- - -'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
      )}
      <div className='text-center mt-5'>
        <Button
          variant={BUTTON_TYPES.outlineDark}
          title={'Done'}
          onButtonClick={() => navigate('./dashboard')}
        />
      </div>
    </div>
  );
};

ManageUnits.propTypes = {
  unitList: PropTypes.any,
  entity: PropTypes.object,
  entityUnits: PropTypes.any,
  getEntityUnits: PropTypes.any,
  dropdownOptions: PropTypes.any,
  searchEntityUnits: PropTypes.func,
  searchEntityUnitUsers: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    unitList: state.AddUnit.unitList,
    entity: state.Entity.currentEntity,
    entityUnits: state.Entity.entityUnits,
    dropdownOptions: state.AddUnit.dropdownOptions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getEntityUnits: bindActionCreators(getUnitList, dispatch),
  searchEntityUnits: bindActionCreators(searchEntityUnits, dispatch),
  searchEntityUnitUsers: bindActionCreators(searchEntityUnitUsers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUnits);
