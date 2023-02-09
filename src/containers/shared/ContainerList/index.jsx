import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { bindActionCreators } from 'redux';
import Button from '../../../components/Button';
import { BUTTON_TYPES, ICONS, INPUT_TYPES } from '../../../components/constants';
import Input from '../../../components/Input';
import Loader from '../../../components/Loader';
import ModalComponent from '../../../components/Modal';
import RadioButton from '../../../components/RadioButton';
import {
  addContainer,
  containersList,
  entityContainersList,
} from '../../../store/shared/Container/ContainerAction';
import Auth from '../../../utils/Auth';
import { USER_TYPES } from '../../../utils/Enum';
import DefaultContainerDialog from '../../entityAdmin/setup/DefaultContainerDialog';
import './container-list.scss';

const WasteContainer = ({
  containersList,
  containers,
  entityContainersList,
  entity,
  addContainer,
}) => {
  const stringVariables = {
    metricUnit: 'metric_name',
    imperialUnit: 'imperial_name',
    globalAdmin: 'global-admin',
    entityAdmin: 'entity-admin',
  };
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userType = Auth.getRoles();
  const { entityId } = useParams();

  const [adminRole, setAdminRole] = useState('');
  const [hoverButton, setHoverButton] = useState();
  const [unit, setUnit] = useState('imperial_name');
  const [spinner, setSpinner] = useState({ containerLoading: false });
  const [buttonTitle, setButtonTitle] = useState(t('containerLibrary.entity.hoverBtnTitle1'));
  const [defaultContainerDialog, setDefaultContainerDialog] = useState({
    container: {},
  });
  const imageLink = containers?.image_base_url;
  const entityAdmin = adminRole == stringVariables.entityAdmin;
  const [measurementUnit, setMeasurementUnit] = useState(1);
  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      {t('containerLibrary.buttonTooltip')}
    </Tooltip>
  );

  useEffect(() => {
    getContainerList();
  }, [measurementUnit]);

  const getContainerList = () => {
    setSpinner({ containerLoading: true });
    if (userType.includes(USER_TYPES.SUPER_ADMIN) || userType.includes(USER_TYPES.GLOBAL_ADMIN)) {
      setAdminRole('global-admin');
      setButtonTitle(t('containerLibrary.global.hoverBtnTitle'));
      containersList({ unit: measurementUnit }, () => setSpinner({ containerLoading: false }));
    } else if (userType.includes(USER_TYPES.ENTITY)) {
      setAdminRole('entity-admin');
      setUnit('name');
      entityContainersList({ id: entityId }, () => setSpinner({ containerLoading: false }));
    }
  };

  const changeDefault = (payload) => {
    addContainer(
      payload,
      () => setSpinner({ containerLoading: false }),
      () => {
        setDefaultContainerDialog({ container: {} });
        getContainerList();
      }
    );
  };
  return (
    <>
      <div className={`waste-containers-list ${adminRole}`}>
        {entityAdmin && <div className='entity-name'>{entity.name}</div>}
        <div className='page-title waste-title'>
          {entityAdmin ? (
            <>
              {t('containerLibrary.entity.title')}
              <OverlayTrigger
                placement='right'
                delay={{ show: 250, hide: 10 }}
                overlay={renderTooltip}
              >
                <i className='info-icon icon-info-icon'></i>
              </OverlayTrigger>
            </>
          ) : (
            t('containerLibrary.global.title')
          )}
        </div>
        {entityAdmin && (
          <>
            <div className='entity-container-details'>{t('containerLibrary.entity.details')}</div>
          </>
        )}
        <div className='search-input'>
          <Input
            placeholder={t('containerLibrary.searchBoxPlaceholder')}
            icon={ICONS.search}
            inputType={INPUT_TYPES.text}
          />
        </div>
        {(userType.includes(USER_TYPES.SUPER_ADMIN) ||
          userType.includes(USER_TYPES.GLOBAL_ADMIN)) && (
            <div className='select-unit'>
              <RadioButton
                label={t('containerLibrary.global.imperial')}
                id='imperial'
                onChange={() => {
                  setMeasurementUnit(1);
                  setUnit('imperial_name');
                }}
                selected={unit == stringVariables.imperialUnit}
              />
              <RadioButton
                label={t('containerLibrary.global.metric')}
                id='metric'
                onChange={() => {
                  setMeasurementUnit(2);
                  setUnit('metric_name');
                }}
                selected={unit == stringVariables.metricUnit}
              />
            </div>
          )}
        <div className='container-lists'>
          {spinner.containerLoading ? (
            <Loader />
          ) : (
            <>
              {containers?.containers?.map((container) => {
                return (
                  <div
                    className='container-list'
                    key={container.id}
                    id={container.id}
                    onMouseEnter={() => setHoverButton(container.id)}
                    onMouseLeave={() => setHoverButton()}
                  >
                    <div className='brand-name'>{container.brands[0].name}</div>
                    <img
                      className='container-img'
                      alt={t('containerLibrary.imgAlt') + container.id}
                      src={container.images[0] ? `${imageLink}/${container.images[0]?.name}` : ''}
                    />
                    <div
                      className='hover-button'
                      style={{
                        display: hoverButton == container.id ? 'block' : 'none',
                      }}
                    >
                      <Button
                        className='container-hover-btn'
                        id={container.id}
                        title={buttonTitle}
                        variant={BUTTON_TYPES.outlineDark}
                        onButtonClick={() => {
                          setDefaultContainerDialog({ container });
                        }}
                      />
                      <ModalComponent
                        modalShow={
                          container.id === defaultContainerDialog?.container?.id &&
                            defaultContainerDialog?.container?.id
                            ? true
                            : false
                        }
                        hideModal={() => setDefaultContainerDialog({ container: {} })}
                        dialogClassName={'modal-650w'}
                        aria-labelledby='contained-modal-title-vcenter'
                        centered
                      >
                        <DefaultContainerDialog
                          containerList={defaultContainerDialog.container}
                          onCancel={() => {
                            setDefaultContainerDialog({ container: {} });
                          }}
                          onSubmit={changeDefault}
                          imageLink={imageLink}
                        />
                      </ModalComponent>
                    </div>
                    <div className='name-vol'>
                      <div>{`${container[`${unit}`]}-${container.brands[0].measurement[unit == stringVariables.metricUnit ? 1 : 0]
                          ?.volume
                        } ${container.brands[0].measurement[unit == stringVariables.metricUnit ? 1 : 0]
                          ?.abbreviation
                        }`}</div>
                    </div>
                  </div>
                );
              })}
              <div className='add-container'>
                <i className='icon-add-category' />
                <div className='add-text'>
                  {entityAdmin
                    ? t('containerLibrary.entity.addNew')
                    : t('containerLibrary.global.addNew')}
                </div>
              </div>
            </>
          )}
        </div>
        {entityAdmin && (
          <div>
            <Button
              className='add-container-btn'
              variant={BUTTON_TYPES.outlineDark}
              title={t('containerLibrary.entity.addBtn')}
            />
            <Button
              className='add-container-btn'
              variant={BUTTON_TYPES.outlineDark}
              title={t('containerLibrary.entity.nextBtn')}
              onButtonClick={() => navigate(`/setup/${entityId}/manage-tags`)}
            />
          </div>
        )}
        {adminRole == stringVariables.globalAdmin && (
          <Button
            className='add-container-btn'
            variant={BUTTON_TYPES.outlineDark}
            title={t('containerLibrary.global.addBtn')}
          />
        )}
      </div>
      <div
        className={
          'container-exit-link ' + (adminRole == stringVariables.globalAdmin ? 'flex-end' : '')
        }
      >
        {entityAdmin && (
          <a className='waste-not-link container-back-link' >
            &lt; {t('containerLibrary.backLink')}
          </a>
        )}
        <a className='waste-not-link container-save-exit' onClick={() => navigate('/dashboard')}>
          {t('manageProgram.saveAndExit')}
        </a>
      </div>
    </>
  );
};

WasteContainer.propTypes = {
  containersList: PropTypes.func,
  containers: PropTypes.any,
  entityContainersList: PropTypes.func,
  entity: PropTypes.any,
  addContainer: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    containers: state.Container.containers,
    entity: state.Entity.currentEntity,
  };
};

const mapDispatchToProps = (dispatch) => ({
  containersList: bindActionCreators(containersList, dispatch),
  entityContainersList: bindActionCreators(entityContainersList, dispatch),
  addContainer: bindActionCreators(addContainer, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WasteContainer);
