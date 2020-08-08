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
import * as Yup from 'yup';
import { sendMessageFetch } from '../slices/messages';
import UserContext from '../context';

const getCurrentChannel = (state) => state.currentChannelId;

const onSubmit = (userName, currentChannelId) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    async ({ message }, { setSubmitting, resetForm, setFieldError }) => {
      try {
        await dispatch(sendMessageFetch({
          currentChannelId,
          message: { text: message, name: userName, data: Date.now() },
        }));
        resetForm();
        setSubmitting(false);
      } catch (e) {
        setFieldError('message', t('errors.connectionError'));
        throw e;
      }
    }
  );
};

const InputMessageFrom = () => {
  const { t } = useTranslation();
  const userName = useContext(UserContext);
  const currentChannelId = useSelector(getCurrentChannel);
  const inputRef = useRef(null);
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema: Yup.object({
      message: Yup.string()
        .matches(/^\S/, t('errors.nospace'))
        .required(t('errors.required')),
    }),
    onSubmit: onSubmit(userName, currentChannelId),
  });

  useEffect(() => {
    if (formik.errors.message) {
      setShow(true);
    }
  }, [formik.errors]);

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
        { formik.errors.message
          ? (
            <Overlay placement="top" target={inputRef.current} show={show}>
              <Tooltip>{formik.errors.message}</Tooltip>
            </Overlay>
          ) : null }
        <Button className="col-auto" variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
          {t('buttons.send')}
        </Button>
      </Col>
    </Form>
  );
};

export default InputMessageFrom;
