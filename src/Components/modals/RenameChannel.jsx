import React, { useState, useEffect, useRef } from 'react';
import { Overlay, Tooltip, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { renameChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import ModalTemplate from '../helpers/ModalTemplate';
import validateChannelName from '../helpers/validate';

const getNameChannel = ({ channels, currentChannelId }) => (
  channels.find(({ id }) => currentChannelId === id)
);

const onSubmit = (id) => {
  const dispatch = useDispatch();
  return (
    async ({ channelName }, { setSubmitting, resetForm }) => {
      await dispatch(renameChannelAsync({ id, name: channelName }));
      resetForm();
      setSubmitting(false);
      dispatch(hideModal());
    }
  );
};

const getChannelsName = ({ channels }) => channels.map(({ name }) => name);

const RenameChannel = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { id, name } = useSelector(getNameChannel);
  const channelsName = useSelector(getChannelsName);
  const [show, setShow] = useState(false);

  const {
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    setErrors,
  } = useFormik({
    initialValues: { channelName: name },
    validate: validateChannelName(channelsName),
    onSubmit: onSubmit(id),
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  useEffect(() => {
    if (errors.channelName) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setErrors({ channelName: '' });
      }, 5000);
    } else {
      setShow(false);
    }
  }, [errors]);

  return (
    <>
      <ModalTemplate title={t('buttons.rename')}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              type="text"
              name="channelName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.channelName}
              disabled={isSubmitting}
            />
          </Form.Group>
          <Overlay target={inputRef.current} show={show}>
            <Tooltip>
              {errors.channelName}
            </Tooltip>
          </Overlay>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {t('buttons.apply')}
          </Button>
        </Form>
      </ModalTemplate>
    </>
  );
};

export default RenameChannel;
