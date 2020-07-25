import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  Overlay,
  Tooltip,
  Form,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';


const ControlChannelForm = (props) => {
  const {
    initialValue = '',
    onSubmit,
    validate,
    effectAction = 'focus',
  } = props;
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { channelName: initialValue },
    validate,
    onSubmit,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current[effectAction]();
    }
  }, []);

  useEffect(() => {
    if (formik.errors.channelName) {
      setShow(true);
    }
  }, [formik.errors]);

  const resetOverlay = () => {
    setShow(false);
    formik.setErrors({ message: '' });
  };

  return (
    <>
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
        <Overlay placement="right" target={inputRef.current} show={show} onEntered={() => setTimeout(resetOverlay, 2000)}>
          <Tooltip>
            {formik.errors.channelName}
          </Tooltip>
        </Overlay>
        <Button variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
          {t('buttons.apply')}
        </Button>
      </Form>
    </>
  );
};

export default ControlChannelForm;
