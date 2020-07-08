import React, { useEffect, useRef } from 'react';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addChannelAsync } from '../../slices/channels';
import { hideModal } from '../../slices/modal';
import { useTranslation } from "react-i18next";

const AddChannel = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { channelName: '' },
    onSubmit: async ({ channelName }, { setSubmitting, resetForm }) => {
      await dispatch(addChannelAsync({ channelName }));
      resetForm();
      dispatch(hideModal());
    }, 
  });

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <Modal show={true}  onHide={()=> dispatch(hideModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{t('buttons.add')}</Modal.Title>
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

export default AddChannel;