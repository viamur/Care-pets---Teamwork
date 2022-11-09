import { useEffect, useState } from 'react';
import { fetchNews } from '../../utils/api';
import { useTranslation } from 'react-i18next';
import { showInfoMessage, showAlertMessage } from '../../utils/showMessages';
import NewsList from '../../components/NewsList/NewsList';
import NewsSearch from '../../components/NewsSearch/NewsSearch';
import Container from '../../components/Container/Container';
import s from './NewsPage.module.scss';
import { showLoadingHourglass, removeLoading } from '../../utils/showLoading';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    showLoadingHourglass('Loading ...');

    fetchNews()
      .then(news => {
        setNews(news);
        if (news === []) {
          showInfoMessage(t('errors.noNews'));
        }
      })
      .catch(err => console.log(err))
      .finally(() => removeLoading());
  }, []);

  const onSubmitSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const onInputChange = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const filterNews = () => {
    if (searchQuery === '') return;

    const normalizeSearchQuery = searchQuery.toLowerCase();

    const queriedNews = news.filter(el =>
      el.title.toLowerCase().includes(normalizeSearchQuery)
    );

    if (queriedNews.length === 0) {
      showAlertMessage(t('errors.news'));
    }

    return queriedNews;
  };

  return (
    <Container>
      <h1 className={s.title}>{t('titles.newsPage')}</h1>

      <NewsSearch
        onSubmit={onSubmitSearch}
        news={news}
        onChange={onInputChange}
      />

      <NewsList news={searchQuery !== '' ? filterNews() : news} />
    </Container>
  );
};

export default NewsPage;
