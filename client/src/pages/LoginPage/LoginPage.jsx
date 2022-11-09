import AuthForm from 'components/AuthForm/AuthForm';
import { useTranslation } from 'react-i18next';
import s from './LoginPage.module.scss';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <div className={s.container}>
      <AuthForm title={t('login.title')} />
    </div>
  );
};

export default LoginPage;
