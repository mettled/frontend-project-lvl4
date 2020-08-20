import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const getCurrentChannel = ({ channels, currentChannelId }) => (
  channels.find(({ id }) => currentChannelId === id)
);

const getChannelsName = ({ channels }) => channels.map(({ name }) => name);

const useSubmit = (idChannel) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return async ({ newChannelName }, { setSubmitting, resetForm, setFieldError }) => {
    try {
      await dispatch(actions.patchChannel({ id: idChannel, name: newChannelName }));
      resetForm();
      setSubmitting(false);
      dispatch(actions.hideModal());
    } catch (e) {
      setFieldError('newChannelName', t('errors.connectionError'));
      throw e;
    }
  };
};

const RenameChannel = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const { id, name } = useSelector(getCurrentChannel);
  const channelsName = useSelector(getChannelsName);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const validation = Yup.object({
    newChannelName: Yup.string()
      .matches(/^\S/, t('errors.nospace'))
      .required(t('errors.required'))
      .notOneOf(channelsName, t('errors.noUniqChannelName'))
      .max(20, t('errors.maxSymbol', { length: 20 })),
  });

  const formik = useFormik({
    initialValues: {
      newChannelName: name,
    },
    validationSchema: validation,
    onSubmit: useSubmit(id),
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  useEffect(() => {
    if (formik.errors.newChannelName) {
      setShow(true);
    }
  }, [formik.errors]);

  return (
    <>
      <Modal show onHide={() => dispatch(actions.hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{t('buttons.rename')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                ref={inputRef}
                type="text"
                name="newChannelName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newChannelName}
                disabled={formik.isSubmitting}
              />
            </Form.Group>
            {
              formik.errors.newChannelName
              && (
                <Overlay placement="top" target={inputRef.current} show={show}>
                  <Tooltip>{formik.errors.newChannelName}</Tooltip>
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

export default RenameChannel;
