import i18n from 'i18next';
import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import Button from '../../../components/Button';
import {BUTTON_TYPES, INPUT_TYPES, LOADER_TYPES} from '../../../components/constants';
import Dropdown from '../../../components/Dropdown';
import Input from '../../../components/Input';
import LoaderComponent from '../../../components/Loader';
import Multiselect from '../../../components/Multiselect';
import Toaster from '../../../components/Toaster';
import '../../../translation';
import {allLanguages} from '../../../translation/constants';

const UiElements = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const save = () => {};
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <>
      <Container fluid>
        <div>
          <h1>BUTTONS</h1>
          <Button
            variant={BUTTON_TYPES.primary}
            title={'Save'}
            disabled={true}
            onButtonClick={() => save()}
          />
          <Button variant={BUTTON_TYPES.secondary} title={'Save'} onButtonClick={() => save()} />
          <Button
            variant={BUTTON_TYPES.success}
            title={'Save'}
            isLoading={true}
            onButtonClick={() => save()}
          />
          <Button variant={BUTTON_TYPES.danger} title={'Save'} onButtonClick={() => save()} />
          <Button
            variant={BUTTON_TYPES.dark}
            title={'Next'}
            onButtonClick={() => navigate('/language-setting')}
          />
        </div>
        <div>
          <h1>LOADING INDICATORS</h1>
          <LoaderComponent variant={LOADER_TYPES.dark} show={true} />
          <LoaderComponent variant={LOADER_TYPES.primary} show={true} />
          <LoaderComponent variant={LOADER_TYPES.danger} show={true} />
          <LoaderComponent variant={LOADER_TYPES.success} show={true} />
        </div>

        <div className='border-bottom'>
          <Row>
            <Col sm={3}>
              <Input label='Select Date' inputType={INPUT_TYPES.date} />
            </Col>
            <Col sm={3}>
              <Dropdown
                label='Change Language'
                options={allLanguages}
                onChange={(e) => changeLanguage(e.target.value)}
              />
            </Col>
            <Col sm={3}>
              <Multiselect
                variant={BUTTON_TYPES.outlineDark}
                placeholder='Select multiple languages'
                label='Select multiple Language'
                options={allLanguages}
                onChange={(e) => changeLanguage(e.target.value)}
              />
            </Col>
          </Row>

          <h1>INTERNATIONALIZATION</h1>
          <p>{t('welcome')}</p>
        </div>
        <div>ICONS</div>
        <i className='icon-tag'></i>
        <Toaster message='Hello, world! This is a toast message.' />
      </Container>
    </>
  );
};

export default UiElements;
