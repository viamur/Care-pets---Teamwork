import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NoticesCategoriesNav from 'components/NoticesCategoriesNav/NoticesCategoriesNav';
import NoticesSearch from 'components/NoticesSearch/NoticesSearch';
import NoticesCategoriesList from 'components/NoticesCategoriesList/NoticesCategoriesList';

const NoticesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { categoryName } = useParams();

  return (
    <>
      <NoticesSearch setSearchQuery={setSearchQuery} />
      <NoticesCategoriesNav />
      <NoticesCategoriesList
        category={categoryName}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default NoticesPage;
