import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthError } from '../../redux/auth/authSelectors';
import { changeError } from '../../redux/auth/authSlice';
import LoginForm from 'components/LoginForm/LoginForm';
import RegisterForm from 'components/RegisterForm/RegisterForm';
import { useTranslation } from 'react-i18next';
import s from './AuthForm.module.scss';

const AuthForm = ({ title }) => {
  const { t } = useTranslation();
  const error = useSelector(getAuthError);
  const dispatch = useDispatch();

  console.log(title);

  const onLinkClick = e => {
    if (error) {
      dispatch(changeError());
    }
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>{title}</h2>
      {(title === 'Login' || title === 'Увійти') && <LoginForm />}
      {(title === 'Registration' || title === 'Реєстрація') && <RegisterForm />}
      <p className={s.question}>
        {title === 'Registration' || title === 'Реєстрація'
          ? t('registration.linkDescr')
          : t('login.linkDescr')}
        &nbsp;
      </p>
      <Link
        to={
          title === 'Registration' || title === 'Реєстрація'
            ? '/login'
            : '/register'
        }
        className={s.link}
        onClick={onLinkClick}
      >
        {title === 'Registration' || title === 'Реєстрація'
          ? t('registration.link')
          : t('login.link')}
      </Link>
    </div>
  );
};

export default AuthForm;
