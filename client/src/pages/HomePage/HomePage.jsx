import Container from '../../components/Container/Container';
import { useTranslation } from 'react-i18next';
import s from './HomePage.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';

const translate = {
  ua: 'Дбайте про своїх маленьких улюбленців',
  en: 'Take good care of your small pets',
};

const HomePage = () => {
  const [title, setTitle] = useState('');

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setTitle(t('titles.homePage'));
  }, [i18n.language]);

  return (
    <section className={s.hero}>
      <Container>
        {i18n.language === 'ua' ? (
          <h1 className={s.title}>{translate.ua}</h1>
        ) : (
          <h2 className={s.title}>{translate.en}</h2>
        )}
      </Container>
      <div className={s.thumb}></div>
    </section>
  );
};

export default HomePage;
