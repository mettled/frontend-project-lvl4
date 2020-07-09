import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';

const AddChannel = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { channelName: '' },
    onSubmit: async ({ channelName }, { setSubmitting, resetForm }) => {
      await dispatch(addChannelAsync({ channelName }));
      resetForm();
      setSubmitting(false);
      dispatch(hideModal());
    },
  });

  const {
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
  } = formik;

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <Modal show onHide={() => dispatch(hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{t('buttons.add')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                required
                type="text"
                name="channelName"
                ref={inputRef}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.channelName}
                disabled={isSubmitting}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {t('buttons.apply')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannel;
