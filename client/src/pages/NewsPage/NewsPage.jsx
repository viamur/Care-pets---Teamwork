import { useEffect, useState } from 'react';
import { fetchNews } from '../../utils/api';
import { showInfoMessage, showAlertMessage } from '../../utils/showMessages';
import NewsList from '../../components/NewsList/NewsList';
import NewsSearch from '../../components/NewsSearch/NewsSearch';
import Container from '../../components/Container/Container';
import s from './NewsPage.module.scss';
import { showLoadingHourglass, removeLoading } from '../../utils/showLoading';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    showLoadingHourglass('Loading ...');

    fetchNews()
      .then(news => {
        setNews(news);
        if (news === []) {
          showInfoMessage('Sorry, there are no news.');
        }
      })
      .catch(err => console.log(err))
      .finally(() => removeLoading());
  }, []);

  const onSubmitSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const filterNews = () => {
    if (searchQuery === '') return;

    const normalizeSearchQuery = searchQuery.toLowerCase();

    const queriedNews = news.filter(el =>
      el.title.toLowerCase().includes(normalizeSearchQuery)
    );

    if (queriedNews.length === 0) {
      showAlertMessage(
        'Sorry, there are no news matching your search query. Please try again.'
      );
    }

    return queriedNews;
  };

  return (
    <Container>
      <h1 className={s.title}>News</h1>

      <NewsSearch onSubmit={onSubmitSearch} />

      <NewsList news={searchQuery !== '' ? filterNews() : news} />
    </Container>
  );
};

export default NewsPage;
