import AuthForm from 'components/AuthForm/AuthForm';
import s from './RegisterPage.module.scss';

const RegisterPage = () => {
  return (
    <div className={s.container}>
      <AuthForm title="Registration" />
    </div>
  );
};

export default RegisterPage;
