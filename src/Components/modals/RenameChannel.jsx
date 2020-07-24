import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { renameChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import ModalTemplate from './helpers/ModalTemplate';
import FormComponent from './helpers/FormComponent';
import useValidateChannelName from './helpers/useValidateChannelName';

const getNameChannel = ({ channels, currentChannelId }) => (
  channels.find(({ id }) => currentChannelId === id)
);

const submit = (id) => {
  const dispatch = useDispatch();
  return (
    async ({ value: channelName }, { setSubmitting, resetForm }) => {
      await dispatch(renameChannelAsync({ id, name: channelName }));
      resetForm();
      setSubmitting(false);
      dispatch(hideModal());
    }
  );
};

const getChannelsName = ({ channels }) => channels.map(({ name }) => name);

const RenameChannel = () => {
  const { t } = useTranslation();
  const { id, name } = useSelector(getNameChannel);
  const channelsName = useSelector(getChannelsName);
  const inputRef = useRef(null);


  useEffect(() => {
    inputRef.current.select();
  }, [null]);

  return (
    <>
      <ModalTemplate title={t('buttons.rename')}>
        <FormComponent
          initialValue={name}
          submit={submit(id)}
          validate={useValidateChannelName(channelsName)}
          refProp={inputRef}
        >
          <Button variant="primary" type="submit">
            {t('buttons.apply')}
          </Button>
        </FormComponent>
      </ModalTemplate>
    </>
  );
};

export default RenameChannel;
