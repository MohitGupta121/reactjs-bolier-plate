import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Button from '../../../../components/Button';
import { BUTTON_TYPES, INPUT_TYPES } from '../../../../components/constants';
import Dropdown from '../../../../components/Dropdown';
import Input from '../../../../components/Input';
import Loader from '../../../../components/Loader';
import Radio from '../../../../components/RadioButton';
import { updateGeneralSettings } from '../../../../store/Entity/EntityAction';
import {
  languageList,
  measurementList,
} from '../../../../store/shared/Miscellaneous/MiscellaneousAction';
import '../../../../translation';
import { generalSettingValidation } from '../../../../utils/validations';
import './generalSettings.scss';

const GeneralSettings = ({
  updateGeneralSettings,
  languageList,
  language,
  measurementList,
  getMeasurementList,
  entity,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { entityId } = useParams();
  const [spinner, setSpinner] = useState({
    updateSetting: false,
    languageLoading: false,
    measurementLoading: false,
  });
  const [languageTitle, setLanguageTitle] = useState([]);
  const [measurementOptions, setMeasurmentOptions] = useState([]);

  useEffect(() => {
    setSpinner({
      languageLoading: true,
      measurementLoading: true,
    });
    languageList(
      '',
      () => setSpinner({ languageLoading: false }),
      () => {
        setLanguageTitle(language);
      }
    );
    getMeasurementList(
      '',
      () => setSpinner({ measurementLoading: false }),
      () => {
        setMeasurmentOptions(measurementList);
      }
    );
    const formValue = generalSettingForm;
    if (entity.primary_language || entity?.location_label?.length) {
      formValue.primaryLang = language.filter(
        (lang) => lang.id === entity.primary_language
      )[0];
      if (entity.secondary_language) {
        formValue.secondaryLang = language.filter(
          (lang) => lang.id === entity.secondary_language
        )[0];
      }
      if (entity.measurement_unit_id) {
        formValue.measurementUnit = measurementList.filter(
          (measurment) => measurment.id === entity.measurement_unit_id
        )[0];
      }
      if (entity.location_label[0].key === 'singular') {
        formValue.singular = entity.location_label[0].value;
      }
      if (entity.location_label[1].key === 'plural') {
        formValue.plural = entity.location_label[1].value;
      }
      if (entity.help_option.key === 'email') {
        formValue.email = entity.help_option.value;
        formValue.helpOptionSelection = 1;
      }
      if (entity.help_option.key === 'link') {
        formValue.link = entity.help_option.value;
        formValue.helpOptionSelection = 2;
      }
      setGeneralSettingForm(formValue);
    }
  }, [language.length, measurementList.length]);

  const emailInputHandler = (e, setFieldValue) => {
    setFieldValue('helpOptionSelection', 1);
  };

  const linkInputHandler = (e, setFieldValue) => {
    setFieldValue('helpOptionSelection', 2);
  };

  const submitHandler = (values) => {
    setSpinner({ updateSetting: true });
    const generalSettingData = {
      data: {
        primary_language: values.primaryLang?.id,
        secondary_language: values.secondaryLang?.id,
        measurement_unit_id: values.measurementUnit?.id,
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
        help_option: {
          key: values.helpOptionSelection === 1 ? 'email' : 'link',
          value: values.helpOptionSelection === 1 ? values.email : values.link,
        },
      },
      id: entityId,
    };

    if (JSON.stringify(values) === JSON.stringify(generalSettingForm)) {
      navigate(`/setup/${entityId}/containers`);
      return;
    }

    updateGeneralSettings(
      generalSettingData,
      () => {
        setSpinner({ updateSetting: false });
      },
      () => {
        navigate(`/setup/${entityId}/containers`);
      }
    );
  };

  const [generalSettingForm, setGeneralSettingForm] = useState({
    primaryLang: '',
    secondaryLang: '',
    measurementUnit: '',
    singular: '',
    plural: '',
    email: '',
    link: '',
    helpOptionSelection: 1,
  });

  const changePrimaryLanguage = (language, setValue) => {
    setValue('primaryLang', language);
  };
  const changeSecondaryLanguage = (language, setValue) => {
    setValue('secondaryLang', language);
  };
  const changeMeasurementUnit = (measurementList, setValue) => {
    setValue('measurementUnit', measurementList);
  };

  const helpDescription = t(
    'entitySetup.generalSettings.generalSettingHelp.helpDirection'
  ).replaceAll('[ENTITY]', entity.name);

  return spinner.languageLoading || spinner.measurementLoading ? (
    <Loader />
  ) : (
    <div>
      <div className='general-settings'>
        <div className='entity-name'>{entity.name}</div>
        <div className='header-name'>
          {t('entitySetup.generalSettings.header')}
        </div>
        <Formik
          enableReinitialize
          initialValues={generalSettingForm}
          onSubmit={(values) => submitHandler(values)}
          validationSchema={generalSettingValidation}
        >
          {({
            values,
            touched,
            errors,
            handleSubmit,
            handleBlur,
            handleChange,
            setFieldValue,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div>
                  <Row>
                    <Col xs={6} className='primary-dropdown'>
                      <Dropdown
                        label={t(
                          'entitySetup.generalSettings.primaryDropdown.label'
                        )}
                        error={touched.primaryLang && errors.primaryLang}
                        options={languageTitle}
                        name='primaryLang'
                        onBlur={handleBlur}
                        onChange={(option) =>
                          changePrimaryLanguage(option, setFieldValue)
                        }
                        selectedValue={values.primaryLang}
                      />
                    </Col>
                    <Col xs={6} className='secondary-dropdown'>
                      <Dropdown
                        label={t(
                          'entitySetup.generalSettings.secondaryDropdown.label'
                        )}
                        options={languageTitle.filter(
                          (lang) => lang !== values.primaryLang
                        )}
                        error={touched.secondaryLang && errors.secondaryLang}
                        name='secondaryLang'
                        onBlur={handleBlur}
                        onChange={(option) =>
                          changeSecondaryLanguage(option, setFieldValue)
                        }
                        selectedValue={values.secondaryLang}
                      />
                    </Col>
                    <Col xs={6} className='measurment-dropdown'>
                      <Dropdown
                        label={t(
                          'entitySetup.generalSettings.measurmentDropdown.label'
                        )}
                        options={measurementOptions}
                        error={
                          touched.measurementUnit && errors.measurementUnit
                        }
                        name='measurementUnit'
                        onBlur={handleBlur}
                        onChange={(option) =>
                          changeMeasurementUnit(option, setFieldValue)
                        }
                        selectedValue={values.measurementUnit}
                      />
                    </Col>
                    <Col xs={6} className='measurment-unit-type'>
                      <div className='locationwise-measurment'>
                        {t(
                          'entitySetup.generalSettings.locationwiseMeasurment'
                        )}
                      </div>
                      <div className='input-boxes location'>
                        <div>
                          <Input
                            error={touched.singular && errors.singular}
                            inputType={INPUT_TYPES.text}
                            name='singular'
                            inputClass={
                              touched.singular && errors.singular
                                ? 'is-invalid'
                                : ''
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.singular}
                          />
                          <div className='singular'>
                            {t(
                              'entitySetup.generalSettings.singularUnit.singular'
                            )}
                          </div>
                        </div>
                        <div>
                          <Input
                            error={touched.plural && errors.plural}
                            inputType={INPUT_TYPES.text}
                            name='plural'
                            inputClass={
                              touched.plural && errors.plural
                                ? 'is-invalid'
                                : ''
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.plural}
                          />
                          <div className='plural'>
                            {t('entitySetup.generalSettings.pluralUnit.plural')}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} className='general-setting-help'>
                      <div className='help'>
                        {t(
                          'entitySetup.generalSettings.generalSettingHelp.help'
                        )}
                      </div>
                      <div className='help-direction'>{helpDescription}</div>
                      <Col xs={6} className='link-generator'>
                        <Radio
                          label={t(
                            'entitySetup.generalSettings.linkGenerator.email.label'
                          )}
                          value='email'
                          id='email'
                          name='help-btn'
                          onChange={(e) => emailInputHandler(e, setFieldValue)}
                          selected={
                            values.helpOptionSelection === 1 ? true : false
                          }
                        />
                        <div
                          hidden={
                            values.helpOptionSelection === 1 ? false : true
                          }
                          className='hidden-input-field email-input'
                        >
                          <Input
                            name='email'
                            value={values.email}
                            placeholder={t(
                              'entitySetup.generalSettings.linkGenerator.email.placeholder'
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputType={INPUT_TYPES.text}
                            inputClass={
                              touched.email && errors.email ? 'is-invalid' : ''
                            }
                            error={touched.email && errors.email}
                          />
                        </div>
                      </Col>
                      <Col xs={6} className='link-generator'>
                        <Radio
                          label={t(
                            'entitySetup.generalSettings.linkGenerator.customLink.label'
                          )}
                          value='link'
                          id='link'
                          name='help-btn'
                          onChange={(e) => linkInputHandler(e, setFieldValue)}
                          selected={
                            values.helpOptionSelection === 2 ? true : false
                          }
                        />
                        <div
                          hidden={
                            values.helpOptionSelection === 2 ? false : true
                          }
                          className='hidden-input-field link-input'
                        >
                          <Input
                            id={'link'}
                            name='link'
                            placeholder={t(
                              'entitySetup.generalSettings.linkGenerator.customLink.placeholder'
                            )}
                            value={values.link}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputType={INPUT_TYPES.text}
                            inputClass={
                              touched.link && errors.link ? 'is-invalid' : ''
                            }
                            error={touched.link && errors.link}
                          />
                        </div>
                      </Col>
                    </Col>
                    <Col xs={12} className='btn'>
                      <Button
                        isLoading={spinner.updateSetting}
                        className='custom-btn next-btn'
                        title={t('entitySetup.generalSettings.submitButton')}
                        variant={BUTTON_TYPES.outlineDark}
                        type={'submit'}
                        disabled={
                          values.primaryLang &&
                            values.measurementUnit &&
                            values.singular &&
                            values.plural &&
                            (values.email || values.link)
                            ? false
                            : true
                        }
                      />
                    </Col>
                  </Row>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className='back-link' >
        &lt; Back
      </div>
    </div>
  );
};

GeneralSettings.propTypes = {
  updateGeneralSettings: PropTypes.func,
  languageList: PropTypes.func,
  language: PropTypes.array,
  measurementList: PropTypes.array,
  getMeasurementList: PropTypes.func,
  entity: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    language: state.Miscellaneous.languageList,
    measurementList: state.Miscellaneous.measurementList,
    entity: state.Entity.currentEntity,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateGeneralSettings: bindActionCreators(updateGeneralSettings, dispatch),
  languageList: bindActionCreators(languageList, dispatch),
  getMeasurementList: bindActionCreators(measurementList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
