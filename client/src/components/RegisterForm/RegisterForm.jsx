import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser, getCheckEmail } from '../../redux/auth/authOperations';
import s from './RegisterForm.module.scss';

const RegisterForm = () => {
  const [page, setPage] = useState(1);
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
        .email('Invalid email address')
        .required('This is a required field'),
      password: Yup.string()
        .min(7, 'Password must include more tnan 7 characters')
        .max(32, 'Password must be less tnan 32 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9])/,
          'Password must contain at least 1 lowercase letter, 1 uppercase letter and 1 number'
        )
        .required('This is a required field'),
      confirm_password: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          "Password and confirm password don't match"
        )
        .required('This is a required field'),
      name: Yup.string()
        .min(2, 'Name must include more tnan 2 characters')
        .max(10, 'Name must be less tnan 10 characters')
        .required('This is a required field'),
      city: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z]).{3,32},(?=.*[a-z])(?=.*[A-Z]).{3,32}$/,
          'Please, enter the city and region separated by virgule'
        )
        .required('This is a required field'),
      phone: Yup.string()
        .matches(
          /[+380]+[0-9].{11}/,
          'Please, enter the phone number in the following way: +380XXXXXXXXX'
        )
        .required('This is a required field'),
    }),
  });

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
      try {
        await getCheckEmail({ email });
        setPage(2);
      } catch (error) {
        alert('You have already registered, just login');
      }
      return;
    }
    setPage(1);
  };

  const onFormSubmit = e => {
    e.preventDefault();
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
              placeholder="*Email"
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
              placeholder="*Password"
              onChange={formik.handleChange}
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
              placeholder="*Confirm Password"
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
              placeholder="*Name"
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
              placeholder="*City, region"
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
              placeholder="*Mobile phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={phone}
            />
            <p className={s['error--last']}>
              {formik.touched.phone && phoneError && phoneError}
            </p>
            <button
              className={s.button}
              type="submit"
              disabled={
                name === '' ||
                city === '' ||
                phone === '' ||
                nameError ||
                cityError ||
                phoneError
                  ? true
                  : false
              }
            >
              Register
            </button>
          </>
        )}
        <button
          className={s['button--last']}
          type="button"
          onClick={onPageChange}
          disabled={
            page === 1 &&
            (email === '' ||
              password === '' ||
              confirm_password === '' ||
              passwordError ||
              confirmError ||
              emailError)
              ? true
              : false
          }
        >
          {page === 1 ? 'Next' : 'Back'}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
