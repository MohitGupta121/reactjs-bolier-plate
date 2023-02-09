import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../Button';
import { BUTTON_TYPES } from '../constants';
import './Modal.scss';

const ModalComponent = ({
  modalShow,
  size,
  hideModal,
  className,
  children,
  title,
  value,
  setModalShow,
  dialogClassName,
}) => {
  return (
    <>
      <Modal
        className={className}
        show={modalShow}
        onHide={() => hideModal(false)}
        size={size}
        dialogClassName={dialogClassName}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        {children ? (
          children
        ) : (
          <div className="text-center">
            <div className="page-title">{title}</div>
            <div className="modal-value">{value}</div>
            <Button
              variant={BUTTON_TYPES.outlineDark}
              type="submit"
              title="close"
              onButtonClick={() => setModalShow(false)}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

ModalComponent.propTypes = {
  modalShow: PropTypes.bool,
  size: PropTypes.string,
  hideModal: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.object,
  title: PropTypes.string,
  value: PropTypes.string,
  setModalShow: PropTypes.func,
  dialogClassName: PropTypes.string,
};

ModalComponent.defaultProps = {
  modalShow: true,
  size: 'lg',
  hideModal: (e) => e,
  className: '',
  title: '',
  value: '',
  setModalShow: (e) => e,
  dialogClassName: '',
};

export default ModalComponent;
