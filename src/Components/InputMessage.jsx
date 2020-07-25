import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { useFormik } from 'formik';
import {
  Overlay,
  Tooltip,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { addMessagesAsync } from '../slices/messages';
import UserContext from './context';

const getCurrentChannel = (state) => state.currentChannelId;

const onSubmit = (userName, currentChannelId) => {
  const dispatch = useDispatch();
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

  const formik = useFormik({
    initialValues: { message: '' },
    validate: ({ message }) => {
      const faults = {};
      if (!/\S/gi.test(message)) {
        faults.message = t('errors.nospace');
      }
      return faults;
    },
    onSubmit: onSubmit(userName, currentChannelId),
  });

  useEffect(() => {
    if (formik.errors.message) {
      setShow(true);
    }
  }, [formik.errors]);

  const resetOverlay = () => {
    setShow(false);
    formik.setErrors({ message: '' });
  };

  return (
    <Form inline onSubmit={formik.handleSubmit}>
      <Col>
        <Form.Group>
          <Form.Control
            ref={inputRef}
            type="text"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            disabled={formik.isSubmitting}
            className="w-100"
          />
        </Form.Group>
      </Col>
      <Col sm={2}>
        <Overlay placement="top" target={inputRef.current} show={show} onEntered={() => setTimeout(resetOverlay, 2000)}>
          <Tooltip>
            {formik.errors.message}
          </Tooltip>
        </Overlay>
        <Button className="col-auto" variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
          {t('buttons.send')}
        </Button>
      </Col>
    </Form>
  );
};

export default InputMessage;
