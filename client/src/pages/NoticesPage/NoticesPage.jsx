import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NoticesCategoriesNav from 'components/NoticesCategoriesNav/NoticesCategoriesNav';
import NoticesSearch from 'components/NoticesSearch/NoticesSearch';
import NoticesCategoriesList from 'components/NoticesCategoriesList/NoticesCategoriesList';
import s from './NoticesPage.module.scss';

const NoticesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { categoryName } = useParams();

  return (
    <div className={s.container}>
      <NoticesSearch
        setSearchQuery={setSearchQuery}
        title="Find your favorite pet"
      />
      <NoticesCategoriesNav />
      <NoticesCategoriesList
        category={categoryName}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export default NoticesPage;
