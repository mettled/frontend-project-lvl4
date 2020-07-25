import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { renameChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import ModalTemplate from './ModalTemplate';
import validateChannelName from './validateChannelName';
import ControlChannelForm from './ControlChannelForm';


const getNameChannel = ({ channels, currentChannelId }) => (
  channels.find(({ id }) => currentChannelId === id)
);

const getChannelsName = ({ channels }) => channels.map(({ name }) => name);

const RenameChannel = () => {
  const { t } = useTranslation();
  const { id, name } = useSelector(getNameChannel);
  const channelsName = useSelector(getChannelsName);
  const dispatch = useDispatch();

  const onSubmit = (idChannel) => async ({ channelName }, { setSubmitting, resetForm }) => {
    await dispatch(renameChannelAsync({ id: idChannel, name: channelName }));
    resetForm();
    setSubmitting(false);
    dispatch(hideModal());
  };

  return (
    <>
      <ModalTemplate title={t('buttons.rename')}>
        <ControlChannelForm effectAction="select" initialValue={name} onSubmit={onSubmit(id)} validate={validateChannelName(channelsName)} />
      </ModalTemplate>
    </>
  );
};

export default RenameChannel;
