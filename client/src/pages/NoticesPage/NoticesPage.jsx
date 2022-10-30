import NoticesCategoriesList from 'components/NoticesCategoriesList/NoticesCategoriesList';
import NoticesCategoriesNav from 'components/NoticesCategoriesNav/NoticesCategoriesNav';
import NoticesSearch from 'components/NoticesSearch/NoticesSearch';
import { useState } from 'react';

import s from './NoticesPage.module.scss';


const NoticesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onSubmitSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };
  return (
    <>
      <NoticesSearch onSubmit={onSubmitSearch} />
      <NoticesCategoriesNav />
      <NoticesCategoriesList />
    </>
  );
};

export default NoticesPage;
