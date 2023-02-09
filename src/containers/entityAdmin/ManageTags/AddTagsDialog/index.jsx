import PropTypes from 'prop-types';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from '../../../../components/Button';
import {BUTTON_TYPES} from '../../../../components/constants';
import '../../../../translation';
import './AddTagsDialog.scss';

const AddTagsDialog = ({ onSubmit, entity }) => {
  const { t } = useTranslation();
  const para1 = t('addTagsDialog.description.para1')
    .replaceAll('[Unit]', entity.locationLabel?.singular)
    .replaceAll('[Units]', entity.locationLabel?.plural);
  const para2 = t('addTagsDialog.description.para2')
    .replaceAll('[Unit]', entity.locationLabel?.singular)
    .replaceAll('[Units]', entity.locationLabel?.plural);
    
  return (
    <div className='add-tags-dialog'>
      <div className='page-title'>{t('addTagsDialog.title')}</div>
      <div className='description'>{para1}</div>
      <div className='description'>{para2}</div>
      <div>
        <Button
          className='add-tags-btn'
          variant={BUTTON_TYPES.outlineDark}
          type='submit'
          title={t('addTagsDialog.btnText')}
          onButtonClick={() => onSubmit(true)}
        />
      </div>
    </div>
  );
};

AddTagsDialog.propTypes = {
  setModalShow: PropTypes.func,
  onSubmit: PropTypes.func,
  entity: PropTypes.object,
};

export default AddTagsDialog;
