import {FieldArray, Form, Formik} from 'formik';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '../../../../components/Button';
import {BUTTON_TYPES, INPUT_TYPES} from '../../../../components/constants';
import Input from '../../../../components/Input';
import Loader from '../../../../components/Loader';
import {
  createOrganizationEntity,
  createOrganizationEntityUsers,
  organizationEntityList,
} from '../../../../store/Organization/OrganizationAction';
import '../../../../translation';
import {newEntity, userValidateSchema} from '../../../../utils/validations';
import ListAndInviteUsers from '../../../shared/ListAndInviteUser';
import {User} from '../../../shared/Models/user';
import './entity-list.scss';

const EntityList = ({
  currentOrganization,
  organizationEntityList,
  createOrganizationEntity,
  createOrganizationEntityUsers,
}) => {
  const [showEntityForm, setShowEntityForm] = useState(false, null);
  const [spinner, setSpinner] = useState({
    listLoading: false,
    entityInvite: false,
    entityAdminInvite: {},
  });

  useEffect(() => {
    setSpinner((prev) => {
      return {...prev, listLoading: true};
    });
    setShowEntityForm(false);
    organizationEntityList({id: currentOrganization?.id}, () =>
      setSpinner((prev) => {
        return {...prev, listLoading: false};
      })
    );
  }, [currentOrganization.id]);

  const {t} = useTranslation();

  const initialValues = {
    name: '',
    users: [new User()],
  };

  const cancel = () => {
    setShowEntityForm(false);
  };

  const addEntity = () => {
    setShowEntityForm(true);
  };

  const inviteEntityUser = (values, entityId) => {
    setSpinner((prev) => {
      return {
        ...prev,
        entityAdminInvite: {
          [entityId]: true,
        },
      };
    });
    const userToBeCreated = values.users.filter((user) => user.editable || user.error);
    const payload = {
      organization_id: currentOrganization?.id,
      invite_id: entityId,
      users_info: [],
    };
    userToBeCreated.map((user) => {
      payload.users_info.push({
        email: user.email,
      });
    });
    createOrganizationEntityUsers(
      payload,
      () => {
        setSpinner((prev) => {
          return {
            ...prev,
            entityAdminInvite: {
              [entityId]: false,
            },
          };
        });
      },
      () => {}
    );
  };

  const createEntity = (values) => {
    setSpinner((prev) => {
      return {...prev, entityInvite: true};
    });
    const payload = {
      organization_id: currentOrganization?.id,
      name: values.name,
      users_info: [],
    };
    values.users.map((user) => {
      payload.users_info.push({
        email: user.email,
      });
    });

    createOrganizationEntity(
      payload,
      () => {
        setSpinner((prev) => {
          return {...prev, entityInvite: false};
        });
      },
      handleCreateEntitySuccess
    );
  };

  const handleCreateEntitySuccess = () => {
    setShowEntityForm(false);
  };

  return !spinner.listLoading ? (
    <>
      <div className='entity-list'>
        <Row className='manage-org-data'>
          <Col sm={3} className='header entity-name-header'>
            {currentOrganization?.name} {t('entityList.tableHeader.entity')}
          </Col>
          <Col sm={7} className='header entity-email-header'>
            {t('entityList.tableHeader.entityAdmin')}
          </Col>
          <Col sm={2} className='header entity-analytics-header'>
            {t('entityList.tableHeader.viewAnalyticsDashboard')}
          </Col>
          {currentOrganization?.entities?.map((entity, index) => {
            return (
              <Row className='entity-data' key={index}>
                <Col sm={3}>
                  <div className='entity-name'>{entity.name}</div>
                  <div className='ext-txt'>
                    {t('entityList.establishedDate')} {moment(entity?.created_at).format('YYYY')}
                  </div>
                </Col>
                <Col sm={7} className='px-0'>
                  <Formik
                    enableReinitialize
                    initialValues={{users: entity.users}}
                    validationSchema={userValidateSchema}
                    onSubmit={(values) => inviteEntityUser(values, entity.id)}
                  >
                    {({handleSubmit}) => {
                      return (
                        <FieldArray name='users'>
                          {(fieldArrayProps) => {
                            return (
                              <Form onSubmit={handleSubmit}>
                                <ListAndInviteUsers
                                  formArray={'users'}
                                  fieldArrayProps={fieldArrayProps}
                                  inviteType={'Entity'}
                                  users={entity.users}
                                  spinner={spinner.entityAdminInvite[entity.id]}
                                />
                              </Form>
                            );
                          }}
                        </FieldArray>
                      );
                    }}
                  </Formik>
                </Col>
                <Col sm={2} className='analytics'>
                  <i className='icon-chart-line analytics-icon' />
                </Col>
              </Row>
            );
          })}

          {showEntityForm ? (
            <Formik
              initialValues={initialValues}
              validationSchema={newEntity}
              onSubmit={(values) => createEntity(values)}
              validateOnMount={true}
            >
              {() => {
                return (
                  <FieldArray name='users'>
                    {(fieldArrayProps) => {
                      const {form} = fieldArrayProps;
                      const {touched, values, errors, handleBlur, handleChange, handleSubmit} =
                        form;
                      return (
                        <div className='entity-data pl-10'>
                          <Form onSubmit={handleSubmit}>
                            <Row>
                              <Col sm={3} className='add-entity-form'>
                                <Input
                                  label={'Entity Name'}
                                  placeholder={'Entity Name'}
                                  className='entity-name'
                                  error={touched.name && errors.name}
                                  inputClass={touched.name && errors.name ? 'is-invalid' : ''}
                                  id={'entity-name'}
                                  name='name'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  inputType={INPUT_TYPES.text}
                                  value={values.name}
                                />
                              </Col>
                              <Col sm={6} className='px-0'>
                                <div className='manage-organization-label'>ENTITY ADMINS</div>
                                <ListAndInviteUsers
                                  formArray={'users'}
                                  fieldArrayProps={fieldArrayProps}
                                  inviteType={'Entity'}
                                  hideFirstCross={true}
                                  hideSendBtn={true}
                                  noList={true}
                                />
                              </Col>
                              <Col sm={3}>
                                <Button
                                  className='entity-admins-btn btn-1'
                                  title='CREATE & SEND INVITE(S)'
                                  type='submit'
                                  variant={BUTTON_TYPES.outlineDark}
                                  isLoading={spinner.entityInvite}
                                />
                                {!spinner.entityInvite ? (
                                  <Button
                                    className='entity-admins-btn'
                                    onButtonClick={() => cancel()}
                                    title='Cancel'
                                    variant={BUTTON_TYPES.outlineDark}
                                  />
                                ) : null}
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      );
                    }}
                  </FieldArray>
                );
              }}
            </Formik>
          ) : (
            <Col sm={12} className='entity-data add-new-entity'>
              <div className='add-entity-btn' onClick={() => addEntity()}>
                <div className='icon-plus'></div>
                <div className='add-text'>{t('entityList.addNewEntity')}</div>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </>
  ) : (
    <Loader />
  );
};

EntityList.propTypes = {
  currentOrganization: PropTypes.object,
  organizationEntityList: PropTypes.func,
  createOrganizationEntity: PropTypes.func,
  createOrganizationEntityUsers: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currentOrganization: state.Organization.currentOrganization,
  };
};

const mapDispatchToProps = (dispatch) => ({
  organizationEntityList: bindActionCreators(organizationEntityList, dispatch),
  createOrganizationEntity: bindActionCreators(createOrganizationEntity, dispatch),
  createOrganizationEntityUsers: bindActionCreators(createOrganizationEntityUsers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityList);
