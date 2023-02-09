import {FieldArray, Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Button from '../../../../components/Button';
import {BUTTON_TYPES, INPUT_TYPES} from '../../../../components/constants';
import Input from '../../../../components/Input';
import {
  createOrganization,
  selectOrganization,
} from '../../../../store/Organization/OrganizationAction';
import '../../../../translation';
import {newOrganization} from '../../../../utils/validations';
import ListAndInviteUsers from '../../../shared/ListAndInviteUser';
import './add-organization.scss';

const AddOrganization = ({
  createOrganization,
  previousOrganization,
  selectOrganization,
  organizationList,
  currentOrganization,
}) => {
  const [spinner, setSpinner] = useState({createOrganization: false});
  const [orgNameError, setOrgNameError] = useState({
    error: false,
    message: '',
  });
  const navigate = useNavigate();
  const {t} = useTranslation();

  const saveOrganization = (values) => {
    setSpinner({createOrganization: true});
    const payload = {
      name: values.name,
      users_info: [],
    };

    for (const key in values.users) {
      payload.users_info.push({
        email: values.users[key].email,
      });
    }
    createOrganization(
      payload,
      () => setSpinner({createOrganization: false}),
      () => navigate('/manage-program/organization/list-users')
    );
  };

  const moveToPreviousOrg = () => {
    previousOrganization?.id ? selectOrganization(previousOrganization.id) : navigate('/dashboard');
  };

  const checkOrganizationName = (name) => {
    const existingOrg = organizationList.filter((org) => org.name === name);
    setOrgNameError({
      error: !!existingOrg?.length,
      message: existingOrg?.length ? t('addOrganization.nameAlreadyExist') : '',
    });
  };

  const initialValues = {
    name: '',
    users: currentOrganization.users,
  };

  return (
    <div className='add-organization'>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => saveOrganization(values)}
        validationSchema={newOrganization}
        validateOnMount={true}
      >
        {() => {
          return (
            <FieldArray name='users'>
              {(fieldArrayProps) => {
                const {form} = fieldArrayProps;
                const {touched, values, errors, handleBlur, handleChange, handleSubmit} = form;

                return (
                  <div className='add-organization-form'>
                    <Form onSubmit={handleSubmit}>
                      <Input
                        className='w-86'
                        id={'organization-name'}
                        label={t('addOrganization.organizationNameLabel')}
                        inputType={INPUT_TYPES.text}
                        name='name'
                        placeholder='Organization Name'
                        onChange={(e) => {
                          handleChange(e);
                          checkOrganizationName(e.target.value);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          checkOrganizationName(e.target.value);
                        }}
                        error={
                          (touched.name && errors.name) ||
                          (orgNameError.error ? orgNameError.message : null)
                        }
                        inputClass={
                          (touched.name && errors.name) || orgNameError.error ? 'is-invalid' : ''
                        }
                        value={values.name}
                      />
                      <label className='form-label'>
                        {t('addOrganization.organizationAdminLabel')}
                      </label>
                      <ListAndInviteUsers
                        formArray={'users'}
                        fieldArrayProps={fieldArrayProps}
                        inviteType={'Org'}
                        hideFirstCross={true}
                        hideSendBtn={true}
                        noList={true}
                      />
                      <div className='footer-btn'>
                        <Button
                          className='cancel-btn'
                          variant={BUTTON_TYPES.outlineDark}
                          onButtonClick={() => moveToPreviousOrg()}
                          title={t('addOrganization.cancelBtnText')}
                        />
                        <Button
                          className='entity-btn'
                          disabled={orgNameError.error}
                          variant={BUTTON_TYPES.outlineDark}
                          isLoading={spinner.createOrganization}
                          title={t('addOrganization.createBtnText')}
                          type='submit'
                        />
                      </div>
                    </Form>
                  </div>
                );
              }}
            </FieldArray>
          );
        }}
      </Formik>
    </div>
  );
};

AddOrganization.propTypes = {
  createOrganization: PropTypes.func,
  previousOrganization: PropTypes.object,
  selectOrganization: PropTypes.func,
  organizationList: PropTypes.array,
  currentOrganization: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    organizationList: state.Organization.organization,
    previousOrganization: state.Organization.previousOrganization,
    currentOrganization: state.Organization.currentOrganization,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createOrganization: bindActionCreators(createOrganization, dispatch),
  selectOrganization: bindActionCreators(selectOrganization, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOrganization);
