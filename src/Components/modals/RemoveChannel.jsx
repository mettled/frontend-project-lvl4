import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import ModalTemplate from './helpers/ModalTemplate';

const getCurrentChannel = (state) => state.currentChannelId;

const RemoveChannel = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(getCurrentChannel);
  const dispatch = useDispatch();
  const handlerRemove = () => async () => {
    await dispatch(removeChannelAsync({ id: currentChannelId }));
    dispatch(hideModal());
  };

  return (
    <>
      <ModalTemplate classes="d-flex justify-content-around" title={t('buttons.remove')}>
        <Button onClick={handlerRemove()} variant="success" size="lg">{t('buttons.yes')}</Button>
        <Button onClick={() => dispatch(hideModal())} variant="danger" size="lg">{t('buttons.no')}</Button>
      </ModalTemplate>
    </>
  );
};

export default RemoveChannel;
