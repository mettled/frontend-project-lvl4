import { Modal } from 'react-bootstrap';
import cn from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../slices/modal';

const ModalTemplate = ({ children, classes, title }) => {
  const dispatch = useDispatch();
  const className = cn({
    [classes]: true,
  });

  return (
    <>
      <Modal show onHide={() => dispatch(hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={className}>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalTemplate;
