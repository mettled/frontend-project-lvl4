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

const getChannelsNames = ({ channels }) => channels.map(({ name }) => name);

const AddChannel = () => {
  const { t } = useTranslation();
  const [showTip, setShowTip] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const channelsName = useSelector(getChannelsNames);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: Yup.object({
      channelName: Yup.string()
        .matches(/^\S/, t('errors.nospace'))
        .required(t('errors.required'))
        .notOneOf(channelsName, t('errors.noUniqChannelName'))
        .max(20, t('errors.maxSymbol', { length: 20 })),
    }),
    onSubmit: async ({ channelName }, { setSubmitting, resetForm, setFieldError }) => {
      const { payload: { error } } = await dispatch(actions.postChannel({ channelName }));
      if (error) {
        setFieldError('noValidationErrors', t('errors.connectionError'));
        return;
      }
      resetForm();
      setSubmitting(false);
      dispatch(actions.hideModal());
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (formik.errors.channelName) {
      setShowTip(true);
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
                <Overlay placement="top" target={inputRef.current} show={showTip}>
                  <Tooltip>{formik.errors.channelName}</Tooltip>
                </Overlay>
              )
            }
            <Button variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
              {t('buttons.apply')}
            </Button>
            {formik.errors.noValidationErrors && <span className="ml-5 px-3 font-weight-bolder text-danger">{formik.errors.noValidationErrors}</span>}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannel;
