import React, { useState, useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { Overlay, Tooltip, Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { addMessagesAsync } from '../slices/messages';
import UserContext from './context';

const getCurrentChannel = (state) => state.currentChannelId;

const onSubmit2 = (userName, currentChannelId) => {
  const dispatch = useDispatch();
  console.log('START - input Message');
  return (
    async ({ message }, { setSubmitting, resetForm }) => {
      await dispatch(addMessagesAsync({
        currentChannelId,
        message: { text: message, name: userName, data: Date.now() },
      }));
      resetForm();
      setSubmitting(false);
    }
  );
};

const InputMessage = () => {
  const { t } = useTranslation();
  const userName = useContext(UserContext);
  const currentChannelId = useSelector(getCurrentChannel);
  const inputRef = useRef(null);
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
    initialValues: { message: '' },
    validate: ({ message }) => {
      const faults = {};
      if (!/\S/gi.test(message)) {
        faults.message = t('errors.nospace');
      }
      return faults;
    },
    onSubmit: onSubmit2(userName, currentChannelId),
  });

  useEffect(() => {
    if (errors.message) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setErrors({ message: '' });
      }, 5000);
    } else {
      setShow(false);
    }
  }, [errors]);

  return (
    <Form inline onSubmit={handleSubmit}>
      <Col>
        <Form.Group>
          <Form.Control
            ref={inputRef}
            type="text"
            name="message"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
            disabled={isSubmitting}
            className="w-100"
          />
        </Form.Group>
      </Col>
      <Col sm={2}>
        <Overlay target={inputRef.current} show={show}>
          <Tooltip>
            {errors.message}
          </Tooltip>
        </Overlay>
        <Button className="col-auto" variant="primary" type="submit" disabled={isSubmitting}>
          {t('buttons.send')}
        </Button>
      </Col>
    </Form>
  );
};

export default InputMessage;
