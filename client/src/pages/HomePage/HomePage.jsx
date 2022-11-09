import Container from '../../components/Container/Container';
import { useTranslation } from 'react-i18next';
import s from './HomePage.module.scss';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <section className={s.container}>
      <Container>
        <h1 className={s.title}>{t('titles.homePage')}</h1>
      </Container>
    </section>
  );
};

export default HomePage;
