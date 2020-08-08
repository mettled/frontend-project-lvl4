import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { addChannelFetch } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import ControlChannelForm from './ControlChannelForm';

const getChannelsName = ({ channels }) => channels.map(({ name }) => name);

const onSubmit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return async ({ channelName }, { setSubmitting, resetForm, setFieldError }) => {
    try {
      await dispatch(addChannelFetch({ channelName }));
      resetForm();
      setSubmitting(false);
      dispatch(hideModal());
    } catch (e) {
      setFieldError('channelName', t('errors.connectionError'));
      throw e;
    }
  };
};

const AddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelsName = useSelector(getChannelsName);
  const validation = Yup.object({
    channelName: Yup.string()
      .matches(/^\S/, t('errors.nospace'))
      .required(t('errors.required'))
      .notOneOf(channelsName, t('errors.noUniqChannelName'))
      .max(20, t('errors.maxSymbol', { length: 20 })),
  });

  return (
    <>
      <Modal show onHide={() => dispatch(hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{t('buttons.add')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ControlChannelForm
            nameField="channelName"
            validation={validation}
            onSubmit={onSubmit()}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannel;
