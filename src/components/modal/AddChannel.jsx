import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {
  Overlay,
  Tooltip,
  Form,
  Button,
  Modal,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { actions } from '../../slices';

const getChannelsName = ({ channels }) => channels.map(({ name }) => name);

const useSubmit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return async ({ channelName }, { setSubmitting, resetForm, setFieldError }) => {
    try {
      await dispatch(actions.postChannel({ channelName }));
      resetForm();
      setSubmitting(false);
      dispatch(actions.hideModal());
    } catch (e) {
      setFieldError('channelName', t('errors.connectionError'));
      throw e;
    }
  };
};

const AddChannel = () => {
  const { t } = useTranslation();
  const [show, setShowError] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const channelsName = useSelector(getChannelsName);

  const validation = Yup.object({
    channelName: Yup.string()
      .matches(/^\S/, t('errors.nospace'))
      .required(t('errors.required'))
      .notOneOf(channelsName, t('errors.noUniqChannelName'))
      .max(20, t('errors.maxSymbol', { length: 20 })),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: validation,
    onSubmit: useSubmit(),
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (formik.errors.channelName) {
      setShowError(true);
    }
  }, [formik.errors]);

  return (
    <>
      <Modal show onHide={() => dispatch(actions.hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{t('buttons.add')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                ref={inputRef}
                type="text"
                name="channelName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.channelName}
                disabled={formik.isSubmitting}
              />
            </Form.Group>
            {
              formik.errors.channelName
              && (
                <Overlay placement="top" target={inputRef.current} show={show}>
                  <Tooltip>{formik.errors.channelName}</Tooltip>
                </Overlay>
              )
            }
            <Button variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
              {t('buttons.apply')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannel;
