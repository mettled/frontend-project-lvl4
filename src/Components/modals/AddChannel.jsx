import React, { useState, useEffect, useRef } from 'react';
import { Overlay, Tooltip, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import ModalTemplate from '../helpers/ModalTemplate';
import validateChannelName from '../helpers/validate';

const getChannelsName = ({ channels }) => channels.map(({ name }) => name);

const onSubmit = () => {
  const dispatch = useDispatch();
  return (
    async ({ channelName }, { setSubmitting, resetForm }) => {
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
    initialValues: { channelName: '' },
    validate: validateChannelName(channelsName),
    onSubmit: onSubmit(),
  });


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });


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
      <ModalTemplate title={t('buttons.add')}>
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

export default AddChannel;
