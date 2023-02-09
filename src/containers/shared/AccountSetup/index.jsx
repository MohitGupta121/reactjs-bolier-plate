import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Button from '../../../components/Button';
import { BUTTON_TYPES, INPUT_TYPES } from '../../../components/constants';
import Dropdown from '../../../components/Dropdown';
import Input from '../../../components/Input';
import Loader from '../../../components/Loader';
import { languageList } from '../../../store/shared/Miscellaneous/MiscellaneousAction';
import { createPassword, validateInvite } from '../../../store/shared/User/UserAction';
import '../../../translation';
import { USER_TYPES } from '../../../utils/Enum';
import { setUpValidation } from '../../../utils/validations';
import './account-setup.scss';

const AccountSetup = ({
  createPassword,
  inviteEmailError,
  validateInvite,
  inviteEmail,
  languageList,
  language,
  inviteRedirect,
}) => {
  const { t } = useTranslation();
  const [spinner, setSpinner] = useState({
    resetPassword: false,
    validateInvite: false,
    languageLoading: false,
  });
  const navigate = useNavigate();
  const { inviteCode, inviteType } = useParams();
  const [accountSetupForm, setAccountSetupForm] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    language: '',
    role: inviteType,
  });

  const validateInviteLink = () => {
    const inviteData = {
      invite_code: inviteCode,
      invite_type: inviteType,
    };
    setSpinner((prev) => {
      return { ...prev, validateInvite: true };
    });
    validateInvite(inviteData, () =>
      setSpinner((prev) => {
        return { ...prev, validateInvite: false };
      })
    );
  };

  useEffect(() => {
    validateInviteLink();
    if (
      inviteType === USER_TYPES.ENTITY ||
      inviteType === USER_TYPES.USER ||
      inviteType === USER_TYPES.PROGRAM
    ) {
      setSpinner((prev) => {
        return { ...prev, languageLoading: true };
      });
      languageList(
        '',
        () =>
          setSpinner((prev) => {
            return { ...prev, languageLoading: false };
          }),
        () => { }
      );
    }
  }, []);

  const createAccount = (values) => {
    setSpinner((prev) => {
      return { ...prev, resetPassword: true };
    });
    const passwordData = {
      first_name: values.firstName,
      last_name: values.lastName,
      new_password: values.password.trim(),
      confirm_password: values.confirmPassword,
      language_id: values.language?.id,
      invite_code: inviteCode,
      invite_type: inviteType,
    };
    createPassword(
      passwordData,
      () =>
        setSpinner((prev) => {
          return { ...prev, resetPassword: false };
        }),
      () => navigate('/dashboard')
    );
  };

  const changeLanguage = (values, language) => {
    values['language'] = language;
    setAccountSetupForm(values);
  };

  return (
    <>
      {spinner.validateInvite || spinner.languageLoading ? (
        <Loader />
      ) : inviteRedirect ? (
        <Navigate to='/login' replace={true} />
      ) : inviteEmailError ? (
        <div className='error'>{inviteEmailError}</div>
      ) : (
        <Container>
          <div className='setup-account'>
            <h2 className='page-title'>{t('accountSetup.title')}</h2>
            <p className='setup-account-title'>
              {t('accountSetup.description')}
              <span className='bold'>{inviteEmail}</span>
            </p>
            <Formik
              enableReinitialize
              initialValues={accountSetupForm}
              onSubmit={createAccount}
              validationSchema={setUpValidation}
            >
              {({ values, touched, errors, handleBlur, handleChange, handleSubmit }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <Row className='setup-account-input'>
                      <Col xs={12} sm={6}>
                        <Input
                          className='setup-input'
                          error={touched.firstName && errors.firstName}
                          id={'firstName'}
                          inputClass={touched.firstName && errors.firstName ? 'is-invalid' : ''}
                          inputType={INPUT_TYPES.text}
                          label='First Name'
                          name='firstName'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstName}
                        />
                      </Col>
                      <Col xs={12} sm={6}>
                        <Input
                          className='setup-input'
                          error={touched.lastName && errors.lastName}
                          id={'lastName'}
                          inputClass={touched.lastName && errors.lastName ? 'is-invalid' : ''}
                          inputType={INPUT_TYPES.text}
                          label='Last Name'
                          name='lastName'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastName}
                        />
                      </Col>
                      <Col xs={12} sm={6}>
                        <Input
                          className='setup-input'
                          error={touched.password && errors.password}
                          id={'password'}
                          inputClass={touched.password && errors.password ? 'is-invalid' : ''}
                          inputType={INPUT_TYPES.password}
                          label='create password'
                          name='password'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                        />
                      </Col>
                      <Col xs={12} sm={6}>
                        <Input
                          className='setup-input'
                          error={touched.confirmPassword && errors.confirmPassword}
                          id={'confirm-password'}
                          inputClass={
                            touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''
                          }
                          inputType={INPUT_TYPES.password}
                          label='Confirm password'
                          name='confirmPassword'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.confirmPassword}
                        />
                      </Col>
                      {inviteType === USER_TYPES.ENTITY ||
                        inviteType === USER_TYPES.USER ||
                        inviteType === USER_TYPES.PROGRAM ? (
                        <Col xs={12} sm={6} className='margin-auto'>
                          <Dropdown
                            label='Language'
                            options={language}
                            onChange={(option) => changeLanguage(values, option)}
                            error={touched.language && errors.language}
                          />
                        </Col>
                      ) : (
                        ''
                      )}
                    </Row>
                    <Row>
                      <div>
                        <Button
                          className='create-account-btn'
                          variant={BUTTON_TYPES.outlineDark}
                          title='Create Account'
                          type='submit'
                          isLoading={spinner.resetPassword}
                        />
                      </div>
                      <p className='login-link-text'>
                        {t('accountSetup.alreadyHaveAnAccount')}
                        <a className='login-link' onClick={() => navigate('/login')}>
                          {' '}
                          {t('accountSetup.loginHere')} &gt;
                        </a>
                      </p>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Container>
      )}
    </>
  );
};

AccountSetup.propTypes = {
  loader: PropTypes.object,
  showLoader: PropTypes.func,
  hideLoader: PropTypes.func,
  createPassword: PropTypes.func,
  validateInvite: PropTypes.func,
  inviteEmail: PropTypes.string,
  inviteEmailError: PropTypes.string,
  language: PropTypes.array,
  languageList: PropTypes.func,
  inviteRedirect: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    loader: state.Loader,
    inviteEmail: state.User.inviteEmail,
    inviteEmailError: state.User.inviteEmailError,
    inviteRedirect: state.User.inviteRedirect,
    language: state.Miscellaneous.languageList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createPassword: bindActionCreators(createPassword, dispatch),
  validateInvite: bindActionCreators(validateInvite, dispatch),
  languageList: bindActionCreators(languageList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetup);
