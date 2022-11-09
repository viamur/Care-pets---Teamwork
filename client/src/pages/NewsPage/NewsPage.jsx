import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchNews } from '../../utils/api';
import { showInfoMessage } from '../../utils/showMessages';
import filteArrByTitle from '../../utils/filteArrByTitle';
import NewsList from '../../components/NewsList/NewsList';
import NewsSearch from '../../components/NewsSearch/NewsSearch';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import s from './NewsPage.module.scss';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    fetchNews()
      .then(news => {
        setNews(news);
        if (news === []) {
          showInfoMessage(t('errors.noNews'));
        }
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const onSubmitSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const onInputChange = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <Container>
      <h2 className={s.title}>{t('titles.newsPage')}</h2>

      <NewsSearch
        onSubmit={onSubmitSearch}
        news={news}
        onChange={onInputChange}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <NewsList
          news={searchQuery !== '' ? filteArrByTitle(news, searchQuery) : news}
        />
      )}
    </Container>
  );
};

export default NewsPage;
