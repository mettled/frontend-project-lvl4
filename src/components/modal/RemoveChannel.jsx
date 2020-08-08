import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  Overlay,
  Tooltip,
  Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeChannelFetch } from '../../slices/channels';
import { hideModal } from '../../slices/modal';

const getCurrentChannel = (state) => state.currentChannelId;

const RemoveChannel = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(getCurrentChannel);
  const [errors, setErrors] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handlerRemove = () => async () => {
    try {
      await dispatch(removeChannelFetch({ id: currentChannelId }));
      dispatch(hideModal());
      setErrors(null);
    } catch (e) {
      setErrors(t('errors.connectionError'));
      throw e;
    }
  };

  useEffect(() => {
    if (errors) {
      setShow(true);
    }
  }, [errors]);

  return (
    <>
      <Modal show onHide={() => dispatch(hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{t('buttons.remove')}</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={inputRef} className="d-flex justify-content-around">
          <Button onClick={handlerRemove()} variant="success" size="lg">{t('buttons.yes')}</Button>
          <Button onClick={() => dispatch(hideModal())} variant="danger" size="lg">{t('buttons.no')}</Button>
        </Modal.Body>
      </Modal>
      { errors
        ? (
          <Overlay placement="top" target={inputRef.current} show={show}>
            <Tooltip>{errors}</Tooltip>
          </Overlay>
        ) : null }
    </>
  );
};

export default RemoveChannel;
