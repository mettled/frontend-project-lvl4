import React from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';

const FormComponent = (props) => {
  const {
    initialValue = '',
    children,
    validate = null,
    submit,
    refProp = null,
  } = props;

  const formik = useFormik({
    initialValues: { value: initialValue },
    validate,
    onSubmit: submit,
  });

  const {
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
  } = formik;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            ref={refProp}
            required
            type="text"
            name="value"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.value}
            disabled={isSubmitting}
          />
        </Form.Group>
        {errors && <p className="text-danger font-italic">{errors.value}</p>}
        {children}
      </Form>
    </>
  );
};

export default FormComponent;
