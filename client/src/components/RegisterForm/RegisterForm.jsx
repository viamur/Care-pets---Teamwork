import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showAlertMessage } from '../../utils/showMessages';
import { registerUser } from '../../redux/auth/authOperations';
import { getCheckEmail } from '../../utils/api';
import { getAuthError } from '../../redux/auth/authSelectors';
import { useTranslation } from 'react-i18next';
import s from './RegisterForm.module.scss';

const RegisterForm = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const error = useSelector(getAuthError);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
      name: '',
      city: '',
      phone: '',
    },

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('validation.email'))
        .max(25, t('validation.emailMax'))
        .required(t('validation.required')),
      password: Yup.string()
        .min(7, t('validation.passwordMin'))
        .max(32, t('validation.passwordMax'))
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, t('validation.password'))
        .required(t('validation.required')),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], t('validation.notMatchPasswords'))
        .required('This is a required field'),
      name: Yup.string()
        .min(2, t('validation.nameMin'))
        .max(10, t('validation.nameMax'))
        .required(t('validation.required')),
      city: Yup.string()
        .matches(
          /^(?=.*[a-zа-я])(?=.*[A-ZА-Я]).{3,32},(?=.*[a-zа-я])(?=.*[A-ZА-Я]).{3,32}$/,
          t('validation.cityRegion')
        )
        .required(t('validation.required')),
      phone: Yup.string()
        .matches(/[+380]+[0-9].{11}/, t('validation.phone'))
        .required(t('validation.required')),
    }),
  });

  useEffect(() => {
    if (!error) return;
    showAlertMessage(error);
  }, [error]);

  let { email, password, confirm_password, name, city, phone } = formik.values;
  const {
    email: emailError,
    password: passwordError,
    confirm_password: confirmError,
    name: nameError,
    city: cityError,
    phone: phoneError,
  } = formik.errors;

  const onPageChange = async () => {
    if (page === 1) {
      if (email === '' || password === '' || confirm_password === '') {
        showAlertMessage(t('errors.allFields'));
        return;
      }
      if (passwordError || confirmError || emailError) {
        showAlertMessage(t('errors.allFieldsFormat'));
        return;
      }

      try {
        await getCheckEmail({ email });
        setPage(2);
      } catch (error) {
        showAlertMessage(t('errors.isRegistration'));
      }
      return;
    }
    setPage(1);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    if (name === '' || city === '' || phone === '') {
      showAlertMessage(t('errors.allFields'));
      return;
    }
    if (nameError || cityError || phoneError) {
      showAlertMessage(t('errors.isRegistration'));
      return;
    }

    dispatch(
      registerUser({
        email,
        password,
        confirm_password,
        name,
        city,
        phone,
      })
    );
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        {page === 1 && (
          <>
            <input
              className={s.input}
              type="email"
              name="email"
              placeholder={`*${t('registration.placeholders.email')}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={email}
            />
            <p className={s.error}>
              {formik.touched.email && emailError && emailError}
            </p>
            <input
              className={s.input}
              type="password"
              name="password"
              placeholder={`*${t('registration.placeholders.password')}`}
              onChange={event => {
                formik.setFieldValue('password', event.target.value.trim());
              }}
              onBlur={formik.handleBlur}
              value={password}
            />
            <p className={s.error}>
              {formik.touched.password && passwordError && passwordError}
            </p>
            <input
              className={s.input}
              type="password"
              name="confirm_password"
              placeholder={`*${t('registration.placeholders.confirmPassword')}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={confirm_password}
            />
            <p className={s['error--last']}>
              {formik.touched.confirm_password && confirmError && confirmError}
            </p>
          </>
        )}
        {page === 2 && (
          <>
            <input
              className={s.input}
              type="text"
              name="name"
              placeholder={`*${t('registration.placeholders.name')}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={name}
            />
            <p className={s.error}>
              {formik.touched.name && nameError && nameError}
            </p>
            <input
              className={s.input}
              type="text"
              name="city"
              placeholder={`*${t('registration.placeholders.city')}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={city}
            />
            <p className={s.error}>
              {formik.touched.city && cityError && cityError}
            </p>
            <input
              className={s.input}
              type="tel"
              name="phone"
              placeholder={`*${t('registration.placeholders.phone')}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={phone}
            />
            <p className={s['error--last']}>
              {formik.touched.phone && phoneError && phoneError}
            </p>
            <button className={s.button} type="submit">
              {t('registration.buttons.register')}
            </button>
          </>
        )}
        <button
          className={s['button--last']}
          type="button"
          onClick={onPageChange}
        >
          {page === 1
            ? t('registration.buttons.next')
            : t('registration.buttons.back')}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
