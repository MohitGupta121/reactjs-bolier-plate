import {FieldArray, Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {bindActionCreators} from 'redux';
import Button from '../../../../components/Button';
import {BUTTON_TYPES} from '../../../../components/constants';
import {inviteUsers} from '../../../../store/Entity/AddUnit/AddUnitAction';
import {userValidateSchema} from '../../../../utils/validations';
import ListAndInviteUsers from '../../../shared/ListAndInviteUser';
import {User} from '../../../shared/Models/user';
import './invite-users.scss';

const InviteUsers = ({entity, currentUnit, inviteUsers}) => {
  const [formFields, setFormFields] = useState([]);
  const [spinner, setSpinner] = useState({inviteUser: false});
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {entityId, unitId} = useParams();

  useEffect(() => {
    if (currentUnit.users.length) {
      setFormFields([...currentUnit.users]);
    } else {
      setFormFields([new User()]);
    }
  }, [currentUnit.users?.length]);

  const description = t('inviteUsers.description')
    .replaceAll('[Unit]', entity.locationLabel?.singular)
    .replaceAll('[Units]', entity.locationLabel?.plural);

  const sendInvite = (values) => {
    setSpinner((prev) => {
      return {...prev, inviteUser: true};
    });

    const userToBeCreated = values.users.filter((user) => user.editable || user.error);
    const payload = {
      requestData: {
        users_info: [],
        invite_id: parseInt(currentUnit.id),
      },
      unitId,
    };

    for (const key in userToBeCreated) {
      payload.requestData.users_info.push({
        email: userToBeCreated[key].email,
      });
    }

    inviteUsers(payload, () => {
      setSpinner((prev) => {
        return {...prev, inviteUser: false};
      });
    });
  };

  return (
    <Container className='invite-users'>
      <div className='entity-name'>{entity.name}</div>
      <div className='page-title'>{`${currentUnit.name} ${
        currentUnit.id_number ? '(' + currentUnit.id_number + ')' : ''
      }: ${t('inviteUsers.title')}`}</div>
      <div className='description'>{description}</div>
      <div className='user-data margin-auto'>
        <Formik
          enableReinitialize
          initialValues={{users: formFields}}
          validationSchema={userValidateSchema}
          onSubmit={(values) => sendInvite(values)}
        >
          {({handleSubmit}) => {
            return (
              <FieldArray name='users'>
                {(fieldArrayProps) => {
                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className='invite-input'>
                        <ListAndInviteUsers
                          formArray={'users'}
                          fieldArrayProps={fieldArrayProps}
                          inviteType={entity.locationLabel?.singular}
                          inviteRole={'User'}
                          hideFirstCross={true}
                          spinner={spinner.inviteUser}
                        />
                      </div>
                      <div className='action-btns'>
                        <Button
                          variant={BUTTON_TYPES.outlineDark}
                          title={t('assignTags.saveAndExit')}
                        />
                        <Button
                          variant={BUTTON_TYPES.outlineDark}
                          title={t('assignTags.nextBtn')}
                          onButtonClick={() =>
                            navigate(`/setup/${entityId}/unit/${unitId}/review-details`)
                          }
                        />
                      </div>
                    </Form>
                  );
                }}
              </FieldArray>
            );
          }}
        </Formik>
      </div>
      <div
        className='back-link'
        onClick={() => navigate(`/setup/${entityId}/unit/${unitId}/assign-tags`)}
      >
        &lt; Back
      </div>
    </Container>
  );
};

InviteUsers.propTypes = {
  entity: PropTypes.any,
  currentUnit: PropTypes.object,
  inviteUsers: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    entity: state.Entity.currentEntity,
    currentUnit: state.AddUnit.currentUnit,
  };
};

const mapDispatchToProps = (dispatch) => ({
  inviteUsers: bindActionCreators(inviteUsers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteUsers);
