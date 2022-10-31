import { Link } from 'react-router-dom';
import LoginForm from 'components/LoginForm/LoginForm';
import RegisterForm from 'components/RegisterForm/RegisterForm';
import s from './AuthForm.module.scss';

const AuthForm = ({ title }) => {
  return (
    <div className={s.container}>
      <h2 className={s.title}>{title}</h2>
      {title === 'Login' && <LoginForm />}
      {title === 'Registration' && <RegisterForm />}
      <p className={s.question}>
        {title === 'Registration'
          ? 'Already have an account?'
          : "Don't have an account?"}
        &nbsp;
      </p>
      <Link
        to={title === 'Registration' ? '/login' : '/register'}
        className={s.link}
      >
        {title === 'Registration' ? 'Login' : 'Register'}
      </Link>
    </div>
  );
};

export default AuthForm;
