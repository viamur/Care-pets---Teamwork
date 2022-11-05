import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showAlertMessage } from '../../utils/showMessages';
import { loginUser } from '../../redux/auth/authOperations';
import { getAuthError } from '../../redux/auth/authSelectors';
import s from './LoginForm.module.scss';

const LoginForm = () => {
  const error = useSelector(getAuthError);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .max(25, 'Email must be less tnan 25 characters')
        .required('This is a required field'),
      password: Yup.string()
        .min(7, 'Password must include more tnan 7 characters')
        .max(32, 'Password must be less tnan 32 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9])/,
          'Password must contain at least 1 lowercase letter, 1 uppercase letter and 1 number'
        )
        .required('This is a required field'),
    }),
  });

  useEffect(() => {
    if (!error) return;
    showAlertMessage(error);
  }, [error]);

  const { email, password } = formik.values;
  const { email: emailError, password: passwordError } = formik.errors;

  const onFormSubmit = e => {
    e.preventDefault();

    if (email === '' || password === '') {
      showAlertMessage('Input all required fields');
      return;
    }
    if (passwordError || emailError) {
      showAlertMessage('Input all fields in the necessary format');
      return;
    }
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  return (
    <form onSubmit={onFormSubmit}>
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
      <p className={s['error--last']}>
        {formik.touched.password && passwordError && passwordError}
      </p>
      <button className={s.button} type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
