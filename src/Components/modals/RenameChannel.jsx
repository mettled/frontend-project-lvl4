import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { renameChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';

const getNameChannel = ({ channels, currentChannelId }) => (
  channels.find(({ id }) => currentChannelId === id)
);

const RenameChannel = () => {
  const { t } = useTranslation();
  const { id, name } = useSelector(getNameChannel);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { channelName: name },
    onSubmit: async ({ channelName }, { setSubmitting, resetForm }) => {
      await dispatch(renameChannelAsync({ id, name: channelName }));
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
    inputRef.current.select();
  }, [null]);

  return (
    <>
      <Modal show onHide={() => dispatch(hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{t('buttons.rename')}</Modal.Title>
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

export default RenameChannel;
