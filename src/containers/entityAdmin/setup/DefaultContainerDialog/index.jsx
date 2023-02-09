import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import Button from '../../../../components/Button';
import CheckBox from '../../../../components/Checkbox';
import {BUTTON_TYPES} from '../../../../components/constants';
import Input from '../../../../components/Input';
import {defaultContainerValidation} from '../../../../utils/validations';
import './DefaultContainerDialog.scss';

const DefaultContainerDialog = ({onSubmit, containerList, onCancel, imageLink}) => {
  const {t} = useTranslation();
  const [error, setError] = useState('');
  const [spinner, setSpinner] = useState({saving: false});
  const {entityId} = useParams();
  const defaultBrand = containerList?.brands?.filter((brand) => brand.is_default);
  const [containerFormValues] = useState({
    name: containerList.name,
    brandId: defaultBrand && defaultBrand.length ? defaultBrand[0]?.id : '',
  });
  const submitHandler = (values) => {
    if (!values.brandId) {
      setError('Please select a default brand');
      return;
    }
    setSpinner({saving: true});
    const containerData = {
      container_id: containerList?.id,
      brand_id: values.brandId,
      display_name: values.name,
    };
    onSubmit({containerData, entityId}, () => setSpinner({saving: false}));
  };

  const handleCheckboxChange = (e, setFieldValue) => {
    setFieldValue('brandId', containerList?.brands[0]?.id);
  };

  return (
    <Formik
      initialValues={containerFormValues}
      onSubmit={(values) => submitHandler(values)}
      validationSchema={defaultContainerValidation}
    >
      {({values, touched, errors, handleSubmit, handleBlur, handleChange, setFieldValue}) => {
        return (
          <Form onSubmit={handleSubmit}>
            <div>
              <div className='page-title'>{t('entitySetup.defaultContainer.pageTitle')}</div>
              <div className='description'>{t('entitySetup.defaultContainer.description')}</div>
              <div className='container-name-img'>
                {containerList && containerList?.images?.length ? (
                  <div className='container-img'>
                    <img
                      className='image'
                      alt={t('containerLibrary.imgAlt') + containerList?.containers?.id}
                      src={
                        containerList?.images[0]
                          ? `${imageLink}/${containerList?.images[0]?.name}`
                          : ''
                      }
                    />
                  </div>
                ) : (
                  ''
                )}
                <div className='container-name'>
                  <Input
                    label='Conatiner name'
                    handleBlur={handleBlur}
                    name='name'
                    value={values.name}
                    error={touched.name && errors.name}
                    onChange={handleChange}
                  />
                  <div className='rename-container'>
                    {t('entitySetup.defaultContainer.renameContainer')}
                  </div>
                </div>
              </div>
              <Row>
                <Col sm={12} className='container-details-headers'>
                  <Col sm={2} className='container-checkbox-header'>
                    <div className='default-select-header'>
                      {t('entitySetup.defaultContainer.containerDetails.defaultSelect')}
                    </div>
                  </Col>
                  <Col sm={5} className='container-brand-name-header'>
                    <div className='brand-header'>
                      {t('entitySetup.defaultContainer.containerDetails.brand')}
                    </div>
                  </Col>
                  <Col sm={1} className='container-brand-volumne-header'>
                    <div className='volume-header'>
                      {t('entitySetup.defaultContainer.containerDetails.volume')}
                    </div>
                  </Col>
                  <Col sm={1} className='container-brand-volumne-header'>
                    <div className='volume-header'></div>
                  </Col>
                </Col>
              </Row>
              {containerList?.brands?.map((brand, index) => {
                return (
                  <Row key={index}>
                    <Col sm={12} className='container-details'>
                      <Col sm={2} className='container-checkbox'>
                        <CheckBox
                          label=''
                          className='checkbox'
                          id={index.toString()}
                          onChange={(e) => handleCheckboxChange(e, setFieldValue)}
                          selected={values.brandId === brand.id}
                          name={'selectedCheckbox'}
                          error={touched.selectedCheckbox && errors.selectedCheckbox}
                        />
                      </Col>
                      <Col sm={5} className='container-brand-name'>
                        <div className='brand-name'>{brand.name}</div>
                      </Col>
                      <Col sm={1} className='container-brand-volumne'>
                        <div className='brand-volume'>{brand.measurement[0].volume}</div>
                      </Col>
                      <Col sm={1} className='container-brand-volumne-name'>
                        <div className='brand-volume-name'>{brand.measurement[0].abbreviation}</div>
                      </Col>
                    </Col>
                  </Row>
                );
              })}

              <div className='btns'>
                {error && <div className='text-center error-message'>{error}</div>}
                <Button
                  variant={BUTTON_TYPES.outlineDark}
                  title={'Cancel'}
                  onButtonClick={onCancel}
                />
                <Button
                  isLoading={spinner.saving}
                  variant={BUTTON_TYPES.outlineDark}
                  title={'Done'}
                  type={'submit'}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

DefaultContainerDialog.propTypes = {
  containerList: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  imageLink: PropTypes.any,
};

export default DefaultContainerDialog;
