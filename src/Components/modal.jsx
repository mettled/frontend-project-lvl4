import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalDialog = (props) => {
  const { title, text, footer, show, onHide } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
    >
    <Modal.Header closeButton>

  <Modal.Title>{ title }</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      { text }
    </Modal.Body>
    <Modal.Footer>
      { footer }
    </Modal.Footer>
  </Modal>
  );
}

export default ModalDialog;