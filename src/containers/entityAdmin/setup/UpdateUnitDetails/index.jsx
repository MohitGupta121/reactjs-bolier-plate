import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Button from '../../../../components/Button';
import {BUTTON_TYPES, INPUT_TYPES} from '../../../../components/constants';
import Input from '../../../../components/Input';
import SearchbarDropdown from '../../../../components/SearchbarDropdown';
import {getUnitList, updateUnit} from '../../../../store/Entity/AddUnit/AddUnitAction';
import {
  cityList,
  countryList,
  stateList,
} from '../../../../store/shared/Miscellaneous/MiscellaneousAction';
import '../../../../translation';
import {updateUnitValidation} from '../../../../utils/validations';
import './UpdateUnitDetails.scss';
const UpdateUnitDetails = ({
  entity,
  getUnitList,
  unitCountryList,
  countryList,
  unitStateList,
  stateList,
  unitCityList,
  cityList,
  currentUnit,
  updateUnit,
  currentRoute,
}) => {
  const {entityId, unitId} = useParams();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState({updateUnit: false});
  const [countryListDetails, setCountryListDetails] = useState([]);
  const [stateListDetails, setStateListDetails] = useState([]);
  const [cityListDetails, setCityListDetails] = useState([]);
  const [unitDetails, setUnitDetails] = useState({
    city: '',
    state: '',
    country: '',
  });
  useEffect(() => {
    getUnitList(
      {entityId},
      () => {},
      () => {}
    );
    countryList(
      {keyword: ''},
      () => {},
      () => {}
    );
  }, []);
  useEffect(() => {
    getStateList();
  }, [unitDetails.country]);

  useEffect(() => {
    getCityList();
  }, [unitDetails.state]);

  const getStateList = () => {
    if (unitDetails.country.toString().length) {
      stateList({countryId: unitDetails.country});
    }
  };
  const getCityList = () => {
    if (unitDetails.state.toString().length) {
      cityList({stateId: unitDetails.state});
    }
  };

  const submitHandler = (values) => {
    setSpinner({updateUnit: true});
    const addUnitData = {
      data: {
        name: values.name,
        id_number: values.id,
        street: values.street,
        zip_code: values.zipCode,
        city_id: unitDetails.city,
      },
      id: unitId,
    };

    updateUnit(
      addUnitData,
      () => setSpinner({updateUnit: false}),
      () => {
        navigate(currentRoute ? currentRoute : `/setup/${entityId}/unit/${unitId}/assign-tags`);
      }
    );
  };
  const [addUnitForm] = useState({
    name: currentUnit.name,
    id: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const onCountryChange = (e) => {
    setCountryListDetails(
      unitCountryList.filter((option) => option.name.includes(e.target.value.toLowerCase()))
    );
  };
  const onStateChange = (e) => {
    setStateListDetails(
      unitStateList.filter((option) => option.name.includes(e.target.value.toLowerCase()))
    );
  };
  const onCityChange = (e) => {
    setCityListDetails(
      unitCityList.filter((option) => option.name.includes(e.target.value.toLowerCase()))
    );
  };
  return (
    <div className='update-unit'>
      <div className='entity-name'>{entity.name}</div>
      <div className='add-unit-header'>
        {t('addUnit.addAUnit').replaceAll('[Unit]', entity.locationLabel?.singular)}
      </div>
      <div className='add-unit-page-title'>
        {t('addUnit.pageTitle').replaceAll('[Unit]', entity.locationLabel?.singular)}
      </div>
      <Formik
        enableReinitialize
        initialValues={addUnitForm}
        validationSchema={updateUnitValidation}
        onSubmit={(values) => submitHandler(values)}
      >
        {({values, touched, errors, handleSubmit, handleBlur, handleChange, setFieldValue}) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className='unitDetails'>
                <Col sm={6} className='input-fields'>
                  <div>
                    <Input
                      placeholder='Name'
                      className='unitForm inputField'
                      error={touched.name && errors.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputType={INPUT_TYPES.text}
                      value={values.name}
                    />
                    <Input
                      placeholder={
                        entity?.accounting_label?.unit?.value ||
                        '[ID number name set by entity admin]'
                      }
                      className='unitForm inputField'
                      error={touched.id && errors.id}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputType={INPUT_TYPES.text}
                      name={'id'}
                      value={values.id}
                      inputClass={touched.id && errors.id ? 'is-invalid' : ''}
                    />
                    <SearchbarDropdown
                      onInputChange={onCountryChange}
                      placeholder='Country'
                      options={countryListDetails}
                      error={errors.country}
                      touched={touched.country}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      value={values.country}
                      name={'country'}
                      setFieldValue={setFieldValue}
                      setDetails={setUnitDetails}
                    />
                    <SearchbarDropdown
                      onInputChange={onStateChange}
                      placeholder='State/Province/Region'
                      options={stateListDetails}
                      error={errors.state}
                      touched={touched.state}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      name={'state'}
                      value={values.state}
                      setDetails={setUnitDetails}
                    />
                    <SearchbarDropdown
                      onInputChange={onCityChange}
                      placeholder='City'
                      options={cityListDetails}
                      error={errors.city}
                      touched={touched.city}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      name={'city'}
                      value={values.city}
                      setDetails={setUnitDetails}
                    />
                    <Input
                      placeholder='Street'
                      className='unitForm inputField'
                      error={touched.street && errors.street}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputType={INPUT_TYPES.text}
                      name={'street'}
                      value={values.street}
                      inputClass={touched.street && errors.street ? 'is-invalid' : ''}
                    />
                    <Input
                      placeholder='ZIP/Postal Code'
                      className='unitForm inputField'
                      error={touched.zipCode && errors.zipCode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputType={INPUT_TYPES.text}
                      name={'zipCode'}
                      value={values.zipCode}
                      inputClass={touched.zipCode && errors.zipCode ? 'is-invalid' : ''}
                    />
                  </div>
                </Col>
              </Row>
              <div className='btns'>
                <Button
                  title={t('addUnit.buttons.saveAndExit')}
                  variant={BUTTON_TYPES.outlineDark}
                  className='exit-setup'
                />
                <Button
                  title={t('addUnit.buttons.next')}
                  variant={BUTTON_TYPES.outlineDark}
                  isLoading={spinner.updateUnit}
                  className='next'
                  type={'submit'}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
UpdateUnitDetails.propTypes = {
  entity: PropTypes.object,
  getUnitList: PropTypes.func,
  addUnitList: PropTypes.array,
  unitCountryList: PropTypes.array,
  unitStateList: PropTypes.array,
  unitCityList: PropTypes.array,
  countryList: PropTypes.func,
  stateList: PropTypes.func,
  cityList: PropTypes.func,
  updateUnit: PropTypes.func,
  currentUnit: PropTypes.object,
  currentRoute: PropTypes.string,
};
const mapStateToProps = (state) => {
  return {
    entity: state.Entity.currentEntity,
    addUnitList: state.AddUnit.unitList.units,
    currentUnit: state.AddUnit.currentUnit,
    unitCountryList: state.Miscellaneous.countryList,
    unitStateList: state.Miscellaneous.stateList,
    unitCityList: state.Miscellaneous.cityList,
    currentRoute: state.AddUnit.currentRoute,
  };
};
const mapDispatchToProps = (dispatch) => ({
  updateUnit: bindActionCreators(updateUnit, dispatch),
  getUnitList: bindActionCreators(getUnitList, dispatch),
  countryList: bindActionCreators(countryList, dispatch),
  stateList: bindActionCreators(stateList, dispatch),
  cityList: bindActionCreators(cityList, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateUnitDetails);
