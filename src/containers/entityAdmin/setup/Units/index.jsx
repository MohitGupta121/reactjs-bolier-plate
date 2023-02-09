import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Button from '../../../../components/Button';
import {BUTTON_TYPES, INPUT_TYPES} from '../../../../components/constants';
import Input from '../../../../components/Input';
import {updateLocationLabel} from '../../../../store/Entity/EntityAction';
import '../../../../translation';
import Auth from '../../../../utils/Auth';
import {USER_TYPES} from '../../../../utils/Enum';
import {updateLocationLable} from '../../../../utils/validations';
import '../setup.scss';

const Units = ({updateLocation, entity, locationLabel}) => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [spinner, setSpinner] = useState(false);
  const {entityId} = useParams();
  const initialValue = entity.locationLabel || {plural: '', singular: ''};
  const handleUpdateSuccess = () => {
    navigate(`/setup/${entityId}/master-database`);
  };
  const description = Auth.getRoles().includes(USER_TYPES.USER)
    ? t('unitSetup.units.description')
        .replaceAll('[Unit]', locationLabel.singular)
        .replaceAll('[Units]', locationLabel.plural)
    : t('entitySetup.units.description');

  const isUnitUser = Auth.getRoles().includes(USER_TYPES.USER) ? true : false;
  const handleSubmitLocation = (values) => {
    if (JSON.stringify(values) === JSON.stringify(initialValue)) {
      handleUpdateSuccess();
      return;
    } else {
      setSpinner(true);
      const entityData = {
        data: {
          labels: [
            {
              key: 'singular',
              value: values.singular,
            },
            {
              key: 'plural',
              value: values.plural,
            },
          ],
        },
        id: entityId,
      };
      updateLocation(
        entityData,
        () => {
          setSpinner(false);
        },
        handleUpdateSuccess
      );
    }
  };
  return (
    <div className='entity-setup'>
      <div className='page-title'>{t('entitySetup.title')}</div>
      <Formik
        initialValues={initialValue}
        validationSchema={updateLocationLable}
        onSubmit={handleSubmitLocation}
      >
        {({values, errors, touched, handleSubmit, handleBlur, handleChange}) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className='mx-0'>
                <Col className='entity-content'>
                  <div className='entity-description'>
                    <div className='entity-icons'>
                      <i className='entity-icon icon-home'></i>
                    </div>
                    {isUnitUser && (
                      <div className='page-title'>{locationLabel?.plural || '[Units]'}</div>
                    )}
                    <div className='details'>{description}</div>
                    {!isUnitUser ? (
                      <>
                        <div className='input-title'>{t('entitySetup.units.inputTitle')}</div>
                        <div className='input-boxes'>
                          <div>
                            <Input
                              error={touched.singular && errors.singular}
                              inputType={INPUT_TYPES.text}
                              name='singular'
                              inputClass={touched.singular && errors.singular ? 'is-invalid' : ''}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.singular}
                            />
                            <div className='singular'>{t('entitySetup.units.singular')}</div>
                          </div>
                          <div>
                            <Input
                              error={touched.plural && errors.plural}
                              inputType={INPUT_TYPES.text}
                              name='plural'
                              inputClass={touched.plural && errors.plural ? 'is-invalid' : ''}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.plural}
                            />
                            <div className='plural'>{t('entitySetup.units.plural')}</div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </Col>
                <Col className='flow-image unit-images'>
                  <div>
                    <img
                      src={require('../../../../assets/images/units.png')}
                      className='image width-450'
                      alt='unit-image'
                    />
                    <div className='entity-names unit-names'>
                      <div className='entity-name unit-name'>{values.singular || '[Unit]'}</div>
                      <div className='entity-name unit-name'>
                        {t('entitySetup.entityName.kitchen')}
                      </div>
                      <div className='entity-name unit-name'>
                        {t('entitySetup.entityName.profile')}
                      </div>
                      <div className='entity-name unit-name'>
                        {t('entitySetup.entityName.tablet')}
                      </div>
                      <div className='entity-name unit-name'>
                        {t('entitySetup.entityName.team')}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className='text-center mt-4'>
                {isUnitUser ? (
                  <Button
                    className='next-btn'
                    title='Next'
                    variant={BUTTON_TYPES.outlineDark}
                    type={'submit'}
                    onButtonClick={() => navigate(`/setup/${entityId}/master-database`)}
                    isLoading={spinner}
                  />
                ) : (
                  <Button
                    className='next-btn'
                    title='Next'
                    variant={BUTTON_TYPES.outlineDark}
                    type={'submit'}
                    isLoading={spinner}
                  />
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className='back-link' onClick={() => navigate(`/setup/${entityId}/kitchens`)}>
        &lt; Back
      </div>
    </div>
  );
};

Units.propTypes = {
  updateLocation: PropTypes.func,
  entity: PropTypes.object,
  locationLabel: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    entity: state.Entity.currentEntity,
    locationLabel: state.UnitUser.locationLabel,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateLocation: bindActionCreators(updateLocationLabel, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Units);
