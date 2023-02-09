import {Form, Formik} from 'formik';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Button from '../../../../components/Button';
import {BUTTON_TYPES, INPUT_TYPES} from '../../../../components/constants';
import Input from '../../../../components/Input';
import {updateFinancialCode} from '../../../../store/Entity/EntityAction';
import '../../../../translation';
import {financialCodes} from '../../../../utils/validations';
import '../setup.scss';
import './FinancialCode.scss';

const FinancialCode = ({updateFinancialCode, entity}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState({setCode: false});
  const [unitName, setUnitName] = useState(false);
  const {entityId} = useParams();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (Object.keys(entity.accounting_label).length) {
      setInitialValues(entity.accounting_label);
    } else {
      setInitialValues({
        unit: {
          is_associate: 1,
          value: '',
        },
        kitchen: {
          is_associate: 0,
          value: '',
        },
        profile: {
          is_associate: 0,
          value: '',
        },
      });
    }
    patchValue(entity.accounting_label, entity.locationLabel);
  }, [Object.keys(entity).length]);

  const FINANCIAL_CONFIG = [
    {
      type: 'unit',
      title: t('entitySetup.financialCode.config.unit.title'),
      description: t('entitySetup.financialCode.config.unit.description'),
      icon: 'icon-home home-icon',
      btn: [
        {
          title: t('entitySetup.financialCode.config.yesBtnTxt'),
          selected: true,
        },
        {
          title: t('entitySetup.financialCode.config.noBtnTxt'),
        },
      ],
    },
    {
      type: 'kitchen',
      title: t('entitySetup.financialCode.config.kitchen.title'),
      description: t('entitySetup.financialCode.config.kitchen.description'),
      icon: 'icon-kitchen',
      btn: [
        {
          title: t('entitySetup.financialCode.config.yesBtnTxt'),
          selected: null,
        },
        {
          title: t('entitySetup.financialCode.config.noBtnTxt'),
          selected: null,
        },
      ],
    },
    {
      type: 'profile',
      title: t('entitySetup.financialCode.config.profile.title'),
      description: t('entitySetup.financialCode.config.profile.description'),
      icon: 'icon-profile1',
      btn: [
        {
          title: t('entitySetup.financialCode.config.yesBtnTxt'),
          selected: null,
        },
        {
          title: t('entitySetup.financialCode.config.noBtnTxt'),
          selected: null,
        },
      ],
    },
    {
      type: 'tag',
      title: t('entitySetup.financialCode.config.tags.title'),
      description: t('entitySetup.financialCode.config.tags.description'),
      icon: 'icon-tags',
      btn: [],
    },
  ];

  const [financialConfig, setFinancialConfig] = useState(FINANCIAL_CONFIG);

  const selectCode = (choice, index, setFieldValue) => {
    const data = [...financialConfig];
    const title = financialConfig[index].type;
    data[index].btn.map((btn) => (btn.selected = false));
    if (choice === 'yes') {
      setFieldValue(`${title}.is_associate`, 1);
      data[index].btn[0].selected = true;
    } else {
      setFieldValue(`${title}.is_associate`, 0);
      setFieldValue(`${title}.value`, '');
      data[index].btn[1].selected = true;
    }
    setFinancialConfig(data);
  };

  const patchValue = (accountingLabel, locationLabel) => {
    const data = [...financialConfig];
    const updatedConfig = data.map((config) => {
      const temp = {...config};
      Object.keys(config).forEach((item) => {
        if (typeof temp[item] === 'string') {
          temp[item] = temp[item].replaceAll('[Unit]', locationLabel?.singular);
          temp[item].replaceAll('[Units]', locationLabel?.plural);
        }
        return item;
      });
      config = temp;
      if (Object.getPrototypeOf(accountingLabel) === Object.prototype) {
        if (config.btn.length) {
          if (accountingLabel[config.type]?.is_associate == 1) {
            config.btn[0].selected = true;
            config.btn[1].selected = false;
          } else {
            config.btn[1].selected = true;
            config.btn[0].selected = false;
          }
        }
      }
      return config;
    });
    setFinancialConfig(updatedConfig);
    setUnitName(!unitName);
  };

  const handleFormSubmit = (values) => {
    setSpinner({setCode: true});
    const payload = {
      data: values,
      id: entityId,
    };
    if (JSON.stringify(values) === JSON.stringify(initialValues)) {
      navigate(`/setup/${entityId}/update-general-setting`);
      return;
    }
    updateFinancialCode(
      payload,
      () => setSpinner({setCode: false}),
      () => navigate(`/setup/${entityId}/update-general-setting`)
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => handleFormSubmit(values)}
      validationSchema={financialCodes}
    >
      {({values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue}) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row className='accounting-units'>
                <Col>
                  <div className='page-title'>{t('entitySetup.financialCode.title')}</div>
                  <p className='italic-para '>{t('entitySetup.financialCode.description')}</p>
                </Col>
              </Row>
            </Container>

            <Container fluid>
              <Row className='accounting-content'>
                <Col lg={1}></Col>

                <Col className='tabled-data' lg={10}>
                  <Row className='bordered-row'>
                    <Col lg={7}></Col>

                    <Col lg={2}>
                      <p className='header-para'>
                        {t('entitySetup.financialCode.config.tableHeader.associateTxt')}
                      </p>
                    </Col>

                    <Col lg={3}>
                      <p className='header-para'>
                        {t('entitySetup.financialCode.config.tableHeader.costCenterTxt')}
                      </p>
                    </Col>
                  </Row>

                  {financialConfig.map((config, index) => {
                    return (
                      <Row key={index} className='bordered-row'>
                        <Col lg={1} className='middle-aligned'>
                          <i className={`financial-icons ${config.icon}`}></i>
                          <h5 className='desc-title'>{config.title}</h5>
                        </Col>

                        <Col lg={6} className='middle-aligned'>
                          <p className='description-para'>{config.description}</p>
                        </Col>

                        <Col lg={2} className='middle-aligned justify-content-center'>
                          {config.btn.map((btn, j) => {
                            return (
                              <Button
                                key={j}
                                className='yes-no-buttons'
                                title={btn.title}
                                variant={
                                  !btn.selected ? BUTTON_TYPES.outlineDark : BUTTON_TYPES.dark
                                }
                                onButtonClick={() => selectCode(btn.title, index, setFieldValue)}
                              />
                            );
                          })}
                        </Col>

                        {!_.isEmpty(values) && values[config.type]?.is_associate ? (
                          <Col lg={3} className='middle-aligned justify-content-center'>
                            <div className='w-75'>
                              <Input
                                className={`my-0 ${
                                  touched[config.type]?.value && errors[config.type]?.value
                                    ? 'errored'
                                    : ''
                                }`}
                                inputType={INPUT_TYPES.text}
                                name={`${config.type}.value`}
                                error={touched[config.type]?.value && errors[config.type]?.value}
                                inputClass={
                                  touched[config.type]?.value && errors[config.type]?.value
                                    ? 'is-invalid'
                                    : ''
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values[config.type]?.value}
                              />
                            </div>
                          </Col>
                        ) : (
                          ''
                        )}
                      </Row>
                    );
                  })}
                </Col>
              </Row>
            </Container>

            <div className='text-center mt-2 footer'>
              <Button
                className='next-btn'
                title='Next'
                variant={BUTTON_TYPES.outlineDark}
                type='submit'
                isLoading={spinner.setCode}
              />
            </div>
            <div className='back-link' onClick={() => navigate(`/setup/${entityId}/tags`)}>
              &lt; Back
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

FinancialCode.propTypes = {
  updateFinancialCode: PropTypes.func,
  entity: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    entity: state.Entity.currentEntity,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateFinancialCode: bindActionCreators(updateFinancialCode, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinancialCode);
