import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  Overlay,
  Tooltip,
  Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../../slices';

const getCurrentChannel = (state) => state.currentChannelId;

const RemoveChannel = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(getCurrentChannel);
  const [errors, setErrors] = useState(null);
  const [show, setShowError] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handlerRemove = () => async () => {
    try {
      await dispatch(actions.deleteChannel({ id: currentChannelId }));
      dispatch(actions.hideModal());
      setErrors(null);
    } catch (e) {
      setErrors(t('errors.connectionError'));
      throw e;
    }
  };

  useEffect(() => {
    if (errors) {
      setShowError(true);
    }
  }, [errors]);

  return (
    <>
      <Modal show onHide={() => dispatch(actions.hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{t('buttons.remove')}</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={inputRef} className="d-flex justify-content-around">
          <Button onClick={handlerRemove()} variant="success" size="lg">{t('buttons.yes')}</Button>
          <Button onClick={() => dispatch(actions.hideModal())} variant="danger" size="lg">{t('buttons.no')}</Button>
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
