import {FieldArray, Form, Formik} from 'formik';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router';
import {bindActionCreators} from 'redux';
import Button from '../../../../components/Button';
import {BUTTON_TYPES} from '../../../../components/constants';
import Loader from '../../../../components/Loader';
import {
  createOrganizationUsers,
  organizationUsersList,
} from '../../../../store/Organization/OrganizationAction';
import {userValidateSchema} from '../../../../utils/validations';
import ListAndInviteUsers from '../../../shared/ListAndInviteUser';
import './add-users.scss';

const AddUsers = ({inviteUsers, currentOrganization, organizationUsersList}) => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState({listLoading: false, invite: false});
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    setSpinner((prev) => {
      return {...prev, listLoading: true};
    });
    organizationUsersList({id: currentOrganization?.id}, () => {
      setSpinner((prev) => {
        return {...prev, listLoading: false};
      });
      setFormFields(currentOrganization.users);
    });
  }, [currentOrganization.id]);

  const onFormSubmit = (values) => {
    setSpinner((prev) => {
      return {...prev, invite: true};
    });
    const userToBeCreated = values.users.filter((user) => user.editable || user.error);
    const payload = {
      requestData: {
        users_info: [],
        invite_id: parseInt(currentOrganization.id),
      },
      role: 'organization-admin',
    };

    for (const key in userToBeCreated) {
      payload.requestData.users_info.push({
        email: userToBeCreated[key].email,
      });
    }

    inviteUsers(
      payload,
      () => {
        setSpinner((prev) => {
          return {...prev, invite: false};
        });
      },
      () => manageSent(values)
    );
  };

  const manageSent = (values) => {
    values.users = currentOrganization?.users;
    organizationUsersList({id: currentOrganization?.id}, () => {});
  };

  return (
    <div className='add-users'>
      {!spinner.listLoading ? (
        <>
          <div className='page-title users'>{currentOrganization?.name}</div>
          <div className='estimated-date'>
            EST: {moment(currentOrganization?.created_at).format('YYYY')}
          </div>
          <div className='admin-users-title'>ORGANIZATION ADMINS</div>
          <div className='user-data margin-auto'>
            <Formik
              enableReinitialize
              initialValues={{users: formFields}}
              validationSchema={userValidateSchema}
              onSubmit={(values) => onFormSubmit(values)}
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
                            inviteType={'Org'}
                            spinner={spinner.invite}
                            users={currentOrganization.users}
                          />
                        </Form>
                      );
                    }}
                  </FieldArray>
                );
              }}
            </Formik>
          </div>
          <div className='footer-btn'>
            <Button
              className='entity-btn'
              variant={BUTTON_TYPES.dark}
              title={`${currentOrganization?.name}  Entities`}
              icon='icon-right-arrow'
              disableSpinner={true}
              onButtonClick={() => navigate('/manage-program/entity-list')}
            />
          </div>
        </>
      ) : (
        <div className='text-center'>
          <Loader />
        </div>
      )}
    </div>
  );
};

AddUsers.propTypes = {
  currentOrganization: PropTypes.object,
  organizationUsersList: PropTypes.any,
  inviteUsers: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currentOrganization: state.Organization.currentOrganization,
  };
};

const mapDispatchToProps = (dispatch) => ({
  organizationUsersList: bindActionCreators(organizationUsersList, dispatch),
  inviteUsers: bindActionCreators(createOrganizationUsers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);
