import React, { useEffect, useRef } from 'react';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { renameChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import { useTranslation } from "react-i18next";

const getNameChannel = ({ channels, currentChannelId }) => channels.find(({ id }) => currentChannelId === id);

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
      dispatch(hideModal());
    }, 
  });

  useEffect(() => {
    inputRef.current.select();
  }, [null]);

  return (
    <>
      <Modal show={true}  onHide={() => dispatch(hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{t('buttons.rename')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <FormControl
                required
                ref={inputRef}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.channelName}
                name="channelName"
              />
            </FormGroup>
            <input type="submit" className="btn btn-primary" value={t('buttons.apply')} />
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default RenameChannel;