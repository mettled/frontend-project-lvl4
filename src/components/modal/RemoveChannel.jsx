import React, { useState, useRef } from 'react';
import {
  Modal,
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
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handlerRemove = () => async () => {
    const { payload: { error } } = await dispatch(actions.deleteChannel({ id: currentChannelId }));
    if (error) {
      setErrors(t('errors.connectionError'));
      return;
    }
    setErrors(null);
    dispatch(actions.hideModal());
  };

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
        {errors && <div className="ml-5 px-3 pb-3 font-weight-bolder text-danger">{errors}</div>}
      </Modal>
    </>
  );
};

export default RemoveChannel;
