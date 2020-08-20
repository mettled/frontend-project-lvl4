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
import { actions } from '../slices';
import UserContext from '../context';

const getCurrentChannel = (state) => state.currentChannelId;

const useSubmit = (userName, currentChannelId) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    async ({ message }, { setSubmitting, resetForm, setFieldError }) => {
      try {
        await dispatch(actions.postMessage({
          currentChannelId,
          message: { text: message, name: userName, date: Date.now() },
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

const InputMessageForm = () => {
  const { t } = useTranslation();
  const userName = useContext(UserContext);
  const currentChannelId = useSelector(getCurrentChannel);
  const inputRef = useRef(null);
  const [show, setShowError] = useState(false);

  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema: Yup.object({
      message: Yup.string()
        .matches(/^\S/, t('errors.nospace'))
        .required(t('errors.required')),
    }),
    onSubmit: useSubmit(userName, currentChannelId),
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [formik.values.message]);

  useEffect(() => {
    if (formik.errors.message) {
      setShowError(true);
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
        {
          formik.errors.message
          && (
            <Overlay placement="top" target={inputRef.current} show={show}>
              <Tooltip>{formik.errors.message}</Tooltip>
            </Overlay>
          )
        }
        <Button className="col-auto" variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
          {t('buttons.send')}
        </Button>
      </Col>
    </Form>
  );
};

export default InputMessageForm;
