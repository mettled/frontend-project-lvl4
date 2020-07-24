import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import FormComponent from '../helpers/FormComponent';
import ModalTemplate from '../helpers/ModalTemplate';
import useValidateChannelName from '../helpers/useValidateChannelName';

const getChannelsName = ({ channels }) => channels.map(({ name }) => name);

const submit = () => {
  const dispatch = useDispatch();
  return (
    async ({ value: channelName }, { setSubmitting, resetForm }) => {
      await dispatch(addChannelAsync({ channelName }));
      resetForm();
      setSubmitting(false);
      dispatch(hideModal());
    }
  );
};

const AddChannel = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const channelsName = useSelector(getChannelsName);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <>
      <ModalTemplate title={t('buttons.add')}>
        <FormComponent
          submit={submit()}
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

export default AddChannel;
