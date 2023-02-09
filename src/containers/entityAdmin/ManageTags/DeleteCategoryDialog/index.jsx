import PropTypes from 'prop-types';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from '../../../../components/Button';
import {BUTTON_TYPES} from '../../../../components/constants';
import '../../../../translation';
import './DeleteCategoryDialog.scss';

const DeleteCategoryDialog = ({onSubmit, onCancel}) => {
  const {t} = useTranslation();
  return (
    <div className='delete-category-dialog'>
      <div className='page-title'>{t('deleteCategory.title')}</div>
      <div className='description'>{t('deleteCategory.description')}</div>
      <div>
        <Button
          className='cancel-category-delete-btn'
          variant={BUTTON_TYPES.outlineDark}
          title={t('deleteCategory.cancelBtnTxt')}
          onButtonClick={() => onCancel(true)}
        />
        <Button
          className='delete-category-btn'
          variant={BUTTON_TYPES.outlineDark}
          title={t('deleteCategory.deleteBtnTxt')}
          onButtonClick={() => onSubmit(true)}
        />
      </div>
    </div>
  );
};

DeleteCategoryDialog.propTypes = {
  setModalShow: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default DeleteCategoryDialog;
