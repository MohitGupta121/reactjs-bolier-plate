import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {bindActionCreators} from 'redux';
import Button from '../../../../components/Button';
import {BUTTON_TYPES} from '../../../../components/constants';
import SearchbarDropdown from '../../../../components/SearchbarDropdown';
import {addUnit, getUnitList} from '../../../../store/Entity/AddUnit/AddUnitAction';
import '../../../../translation';
import {addUnitValidation} from '../../../../utils/validations';
import './addUnit.scss';

const AddUnit = ({entity, getUnitList, currentUnit, units, addUnit}) => {
  const [unitList, setUnitList] = useState(units);
  const {entityId} = useParams();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState({addUnitSpinner: false});
  const [unitDetails, setUnitDetails] = useState({
    name: '',
  });

  useEffect(() => {
    getUnitList(
      {entityId: entityId},
      () => {}
    );
  }, []);

  const submitHandler = (values) => {
    setSpinner({addUnitSpinner: true});
    const unitData = {
      data: {
        name: values.name,
      },
      id: entityId,
    };

    if (unitDetails.name.toString().length) {
      navigate(`/setup/${entityId}/unit/${unitDetails.name}/update-unit`);
      setSpinner({addUnitSpinner: false});
    } else {
      addUnit(
        unitData,
        () => setSpinner({addUnitSpinner: false}),
        () => {
          navigate(`/setup/${entityId}/unit/${currentUnit.id}/update-unit`);
        }
      );
    }
  };

  const onNameChange = (e) => {
    setUnitList(
      units.filter((option) => option.name.toLowerCase().includes(e.target.value?.toLowerCase()))
    );
  };

  const description = t('addUnit.pageTitle').replaceAll('[Unit]', entity.locationLabel?.singular);

  useEffect(() => {
    if (currentUnit.id) {
      navigate(`/setup/${entityId}/unit/${currentUnit.id}/update-unit`);
    }
  }, [currentUnit.id]);

  const [addUnitForm] = useState({name: ''});

  return (
    <div className='add-unit'>
      <div className='entity-name'>{entity.name}</div>
      <div className='add-unit-header'>
        {t('addUnit.addAUnit').replaceAll('[Unit]', entity.locationLabel?.singular)}
      </div>
      <div className='add-unit-page-title'>{description}</div>
      <Formik
        enableReinitialize
        initialValues={addUnitForm}
        validationSchema={addUnitValidation}
        onSubmit={(values) => submitHandler(values)}
      >
        {({values, touched, errors, handleSubmit, handleBlur, handleChange, setFieldValue}) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className='unit-search'>
                <SearchbarDropdown
                  options={unitList}
                  onInputChange={(e) => onNameChange(e)}
                  placeholder={`${t('addUnit.placeholder').replaceAll(
                    '[Unit]',
                    entity.locationLabel?.singular
                  )}`}
                  error={errors.name}
                  touched={touched.name}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values.name}
                  name={'name'}
                  setFieldValue={setFieldValue}
                  setDetails={setUnitDetails}
                  noIcon={true}
                />
                <Button
                  title={t('addUnit.buttons.addBtn')}
                  variant={BUTTON_TYPES.outlineDark}
                  className='add-btn'
                  isLoading={spinner.addUnitSpinner}
                  disabled={!values.name}
                  onButtonClick={() => submitHandler(values)}
                  type={'submit'}
                />
              </div>
              <div className='btns'>
                <Button
                  title={t('addUnit.buttons.exitSetup')}
                  variant={BUTTON_TYPES.outlineDark}
                  className='exit-setup'
                />
                <Button
                  title={t('addUnit.buttons.next')}
                  variant={BUTTON_TYPES.outlineDark}
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
AddUnit.propTypes = {
  getUnitList: PropTypes.func,
  currentUnit: PropTypes.object,
  entity: PropTypes.object,
  units: PropTypes.array,
  addUnit: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    entity: state.Entity.currentEntity,
    currentUnit: state.AddUnit.currentUnit,
    units: state.AddUnit.unitList.units,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addUnit: bindActionCreators(addUnit, dispatch),
  getUnitList: bindActionCreators(getUnitList, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUnit);
