import Container from '../../components/Container/Container';
import { useTranslation } from 'react-i18next';
import s from './HomePage.module.scss';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <section className={s.hero}>
      <Container>
        <h1 className={s.title}>{t('titles.homePage')}</h1>
      </Container>
      <div className={s.thumb}></div>
    </section>
  );
};

export default HomePage;
