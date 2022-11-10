import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthError } from '../../redux/auth/authSelectors';
import { changeError } from '../../redux/auth/authSlice';
import LoginForm from 'components/LoginForm/LoginForm';
import RegisterForm from 'components/RegisterForm/RegisterForm';
import { useTranslation } from 'react-i18next';
import s from './AuthForm.module.scss';

const AuthForm = ({ title }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const error = useSelector(getAuthError);
  const dispatch = useDispatch();

  const onLinkClick = e => {
    if (error) {
      dispatch(changeError());
    }
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>{title}</h2>
      {pathname === '/login' && <LoginForm />}
      {pathname === '/register' && <RegisterForm />}
      <p className={s.question}>
        {pathname === '/register'
          ? t('registration.linkDescr')
          : t('login.linkDescr')}
        &nbsp;
      </p>
      <Link
        to={pathname === '/register' ? '/login' : '/register'}
        className={s.link}
        onClick={onLinkClick}
      >
        {pathname === '/register' ? t('registration.link') : t('login.link')}
      </Link>
    </div>
  );
};

export default AuthForm;
