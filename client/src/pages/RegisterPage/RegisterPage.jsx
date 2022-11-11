import AuthForm from 'components/AuthForm/AuthForm';
import { useTranslation } from 'react-i18next';
import s from './RegisterPage.module.scss';

const RegisterPage = () => {
  const { t } = useTranslation();
  return (
    <div className={s.container}>
      <AuthForm title={t('registration.title')} />
    </div>
  );
};

export default RegisterPage;
