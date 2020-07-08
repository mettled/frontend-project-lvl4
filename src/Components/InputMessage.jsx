import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { addMessagesAsync } from '../slices/messages';
import UserContext from './context';

const getCurrentChannel = (state) => state.currentChannelId;

const InputMessage = () => {
  const { t } = useTranslation();
  const userName = useContext(UserContext);
  const dispatch = useDispatch();
  const currentChannelId = useSelector(getCurrentChannel);
  const formikRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async ({ message }, { setSubmitting, resetForm }) => {
      await dispatch(addMessagesAsync({
        currentChannelId,
        message: { text: message, name: userName, data: Date.now() },
      }));
      resetForm();
      setSubmitting(false);
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
    if (formikRef.current) {
      formikRef.current.focus();
    }
  }, [null]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row align-items-center">
        <div className="col-10">
          <input
            required
            ref={formikRef}
            name="message"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
            className="form-control"
            placeholder={t('placeholder.enterMessage')}
          />
        </div>

        <div className="col-auto">
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {t('buttons.send')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputMessage;
