import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { renameChannelFetch } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import ControlChannelForm from './ControlChannelForm';


const getCurrentChannel = ({ channels, currentChannelId }) => (
  channels.find(({ id }) => currentChannelId === id)
);

const getChannelsName = ({ channels }) => channels.map(({ name }) => name);

const onSubmit = (idChannel) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return async ({ newChannelName }, { setSubmitting, resetForm, setFieldError }) => {
    try {
      await dispatch(renameChannelFetch({ id: idChannel, name: newChannelName }));
      resetForm();
      setSubmitting(false);
      dispatch(hideModal());
    } catch (e) {
      setFieldError('newChannelName', t('errors.connectionError'));
      throw e;
    }
  };
};

const RenameChannel = () => {
  const { t } = useTranslation();
  const { id, name } = useSelector(getCurrentChannel);
  const channelsName = useSelector(getChannelsName);
  const dispatch = useDispatch();

  const validation = Yup.object({
    newChannelName: Yup.string()
      .matches(/^\S/, t('errors.nospace'))
      .required(t('errors.required'))
      .notOneOf(channelsName, t('errors.noUniqChannelName'))
      .max(20, t('errors.maxSymbol', { length: 20 })),
  });

  return (
    <>
      <Modal show onHide={() => dispatch(hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{t('buttons.rename')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ControlChannelForm
            nameField="newChannelName"
            initialValue={name}
            validation={validation}
            onSubmit={onSubmit(id)}
            effectAction="select"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameChannel;
