import { useEffect, useState } from 'react';
import { fetchNews } from '../../utils/api';
import { showInfoMessage } from '../../utils/showMessages';
import NewsList from '../../components/NewsList/NewsList';
import NewsSearch from '../../components/NewsSearch/NewsSearch';
import Container from '../../components/Container/Container';
import s from './NewsPage.module.scss';
// import { showLoadingHourglass, removeLoading } from '../../utils/showLoading';
import filteArrByTitle from '../../utils/filteArrByTitle';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // showLoadingHourglass('Loading ...');

    fetchNews()
      .then(news => {
        setNews(news);
        if (news === []) {
          showInfoMessage('Sorry, there are no news.');
        }
      })
      .catch(err => console.log(err));
    // .finally(() => removeLoading());
  }, []);

  const onSubmitSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const onInputChange = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <Container>
      <h1 className={s.title}>News</h1>

      <NewsSearch
        onSubmit={onSubmitSearch}
        news={news}
        onChange={onInputChange}
      />

      <NewsList
        news={searchQuery !== '' ? filteArrByTitle(news, searchQuery) : news}
      />
    </Container>
  );
};

export default NewsPage;
