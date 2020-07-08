import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import { useTranslation } from "react-i18next";

const getCurrentChannel = (state) => state.currentChannelId;

const RemoveChannel = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(getCurrentChannel);
  const dispatch = useDispatch();
  const handlerRemove = () => async () => {
    await dispatch(removeChannelAsync({ id: currentChannelId }));
    dispatch(hideModal());
  }

  return (
    <>
      <Modal show={true}  onHide={() => dispatch(hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{t('buttons.remove')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-around'>
          <Button onClick={handlerRemove()} variant="success" size='lg'>{t('buttons.yes')}</Button>
          <Button onClick={() => onHide()} variant="danger" size='lg'>{t('buttons.no')}</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default RemoveChannel;