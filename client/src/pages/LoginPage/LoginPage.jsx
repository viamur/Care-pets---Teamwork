import AuthForm from 'components/AuthForm/AuthForm';
import s from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <div className={s.container}>
      <AuthForm title="Login" />
    </div>
  );
};

export default LoginPage;
