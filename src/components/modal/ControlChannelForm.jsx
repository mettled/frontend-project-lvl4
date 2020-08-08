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
    nameField = 'defaultField',
    initialValue = '',
    onSubmit,
    validation,
    effectAction = 'focus',
  } = props;

  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { [nameField]: initialValue },
    validationSchema: validation,
    onSubmit,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current[effectAction]();
    }
  }, []);

  useEffect(() => {
    if (formik.errors[nameField]) {
      setShow(true);
    }
  }, [formik.errors]);

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Control
            ref={inputRef}
            type="text"
            name={nameField}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[nameField]}
            disabled={formik.isSubmitting}
          />
        </Form.Group>
        { formik.errors[nameField]
          ? (
            <Overlay placement="top" target={inputRef.current} show={show}>
              <Tooltip>{formik.errors[nameField]}</Tooltip>
            </Overlay>
          ) : null }
        <Button variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
          {t('buttons.apply')}
        </Button>
      </Form>
    </>
  );
};

export default ControlChannelForm;
