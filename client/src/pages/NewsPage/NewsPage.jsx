import { useEffect, useState } from 'react';
import { fetchNews } from '../../utils/api';
import NewsList from '../../components/NewsList/NewsList';
import NewsSearch from '../../components/NewsSearch/NewsSearch';
import s from './NewsPage.module.scss';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNews()
      .then(news => setNews(news))
      .catch(err => console.log(err));
  }, []);

  const onSubmitSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const filterNews = () => {
    if (searchQuery === '') return news;

    const normalizeSearchQuery = searchQuery.toLowerCase();

    return news.filter(el =>
      el.title.toLowerCase().includes(normalizeSearchQuery)
    );
  };

  return (
    <>
      <h1 className={s.title}>News</h1>

      <NewsSearch onSubmit={onSubmitSearch} />

      {filterNews().length > 0 ? (
        <NewsList news={filterNews()} />
      ) : (
        <h2 className={s.subtitle}>No Results</h2>
      )}
    </>
  );
};

export default NewsPage;
