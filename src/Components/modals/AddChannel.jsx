import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import ModalTemplate from './ModalTemplate';
import validateChannelName from './validateChannelName';
import ControlChannelForm from './ControlChannelForm';

const getChannelsName = ({ channels }) => channels.map(({ name }) => name);

const AddChannel = () => {
  const { t } = useTranslation();
  const channelsName = useSelector(getChannelsName);
  const dispatch = useDispatch();

  const onSubmit = async ({ channelName }, { setSubmitting, resetForm }) => {
    await dispatch(addChannelAsync({ channelName }));
    resetForm();
    setSubmitting(false);
    dispatch(hideModal());
  };

  return (
    <>
      <ModalTemplate title={t('buttons.add')}>
        <ControlChannelForm onSubmit={onSubmit} validate={validateChannelName(channelsName)} />
      </ModalTemplate>
    </>
  );
};

export default AddChannel;
